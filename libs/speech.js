// Private func bypass Google Trans
function shiftLeftOrRightThenSumOrXor(num, opArray) {
    return opArray.reduce((acc, opString) => {
        let op1 = opString[1]; // '+' | '-' ~ SUM | XOR
        let op2 = opString[0]; // '+' | '^' ~ SLL | SRL
        let xd = opString[2]; // [0-9a-f]

        let shiftAmount = hexCharAsNumber(xd);
        let mask = (op1 == '+') ? acc >>> shiftAmount : acc << shiftAmount;
        return (op2 == '+') ? (acc + mask & 0xffffffff) : (acc ^ mask);
    }, num);
}

function hexCharAsNumber(xd) {
    return (xd >= 'a') ? xd.charCodeAt(0) - 87 : Number(xd);
}

function transformQuery(query) {
    for (var e = [], f = 0, g = 0; g < query.length; g++) {
        let l = query.charCodeAt(g);
        if (l < 128) {
            e[f++] = l;     // 0{l[6-0]}
        } else if (l < 2048) {
            e[f++] = l >> 6 | 0xC0;  // 110{l[10-6]}
            e[f++] = l & 0x3F | 0x80; // 10{l[5-0]}
        } else if (0xD800 == (l & 0xFC00) && g + 1 < query.length && 0xDC00 == (query.charCodeAt(g + 1) & 0xFC00)) {
            // that's pretty rare... (avoid ovf?)
            l = (1 << 16) + ((l & 0x03FF) << 10) + (query.charCodeAt(++g) & 0x03FF);
            e[f++] = l >> 18 | 0xF0;  // 111100{l[9-8*]}
            e[f++] = l >> 12 & 0x3F | 0x80; // 10{l[7*-2]}
            e[f++] = l & 0x3F | 0x80;  // 10{(l+1)[5-0]}
        } else {
            e[f++] = l >> 12 | 0xE0;  // 1110{l[15-12]}
            e[f++] = l >> 6 & 0x3F | 0x80; // 10{l[11-6]}
            e[f++] = l & 0x3F | 0x80;  // 10{l[5-0]}
        }
    }
    return e;
}

function normalizeHash(encondindRound2) {
    if (encondindRound2 < 0) {
        encondindRound2 = (encondindRound2 & 0x7fffffff) + 0x80000000;
    }
    return encondindRound2 % 1E6;
}

function calcHash(query, windowTkk) {
    // STEP 1: spread the the query char codes on a byte-array, 1-3 bytes per char
    let bytesArray = transformQuery(query);

    // STEP 2: starting with TKK index, add the array from last step one-by-one, and do 2 rounds of shift+add/xor
    let d = windowTkk.split('.');
    let tkkIndex = Number(d[0]) || 0;
    let tkkKey = Number(d[1]) || 0;

    let encondingRound1 = bytesArray.reduce((acc, current) => {
        acc += current;
        return shiftLeftOrRightThenSumOrXor(acc, ['+-a', '^+6'])
    }, tkkIndex);

    // STEP 3: apply 3 rounds of shift+add/xor and XOR with they TKK key
    let encondingRound2 = shiftLeftOrRightThenSumOrXor(encondingRound1, ['+-3', '^+b', '+-f']) ^ tkkKey;

    // STEP 4: Normalize to 2s complement & format
    let normalizedResult = normalizeHash(encondingRound2);

    return normalizedResult.toString() + "." + (normalizedResult ^ tkkIndex)
}

var qs = require('querystring');

class Speech {

    constructor(lang = 'vi') {
        this.voices = [];
        this.lang = lang;
        this.transKey = `410957.${Date.now()}`;
    }

    calcHash(query) {
        return calcHash(query, this.transKey);
    }

    /**
     * Make text to voices
     * @param {string} text 
     * @returns Array list string of voices
     */
    makeVoices(text) {
        this.processLineText(text);
        return this.voices;
    }

    processLineText(text) {
        let index = 0;
        let length = text.length;

        while (index < length) {
            let indexSplit = text.substring(index, index + 200).search(/\,|;|:|\.|\(|\)|\"|\'/);
            let line = '';
            let lastIndex = index;

            if (indexSplit >= 0) {
                line = text.substring(index, index + indexSplit).trim();
                lastIndex = index + indexSplit + 1;
            } else {
                let indexSpace = text.substring(index, index + 200).lastIndexOf(" ");
                if (indexSpace >= 0) {
                    line = text.substring(index, index + indexSpace).trim();
                    lastIndex = index + indexSpace + 1;
                } else {
                    line = text.substring(index).trim();
                    lastIndex = length;
                }
            }

            if (line.length > 0)
                this.voices.push(this.transText2Voice(line));

            index = lastIndex;
        }
    }

    transText2Voice(query, params = {}) {
        params = {
            ...params,
            "ie": "UTF-8",
            "tl": this.lang,
            "client": "t",
            "q": query,
            "tk": this.calcHash(query)
        };
        const googleTransUrl = `https://translate.google.com/translate_tts`;
        let googleTransUrlVoice = `${googleTransUrl}?${qs.stringify(params)}`;
        return googleTransUrlVoice.replace(/\'/gi, "\\\'");
    }

}

module.exports = Speech;
