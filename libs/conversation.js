import fs from 'fs';

const Conversation = function (id) {
    this.init(id);
}

Conversation.prototype.init = function (id) {

    this.setLimitAnswer();
    this.setNumRelatedMessage();

    if (!id) {
        this.makeId();
        this.emptyData();
        return;
    }

    this._id = id;
    this.readData();
}

Conversation.prototype.makeId = function () {
    this._id = Math.random().toString(32).slice(2, 16);
}

Conversation.prototype.emptyData = function () {
    this._data = {
        id: this._id,
        lastIndex: 0,
        items: []
    }
}

/**
 * Set the message sending limit most relevant to the conversationi
 * @param {number} limit maximum messages send to gpt
 * */
Conversation.prototype.setNumRelatedMessage = function (limit = 5) {
    this.numRelatedMessage = limit;
}

/**
 * Set limit tokens and optimizer quotas.
 * @param {number} limit maximum gpt response characters 
 */
Conversation.prototype.setLimitAnswer = function (limit = 120) {
    this.answerLimit = limit;
}

Conversation.prototype.writeData = function () {
    try {
        fs.writeFileSync(`./data/${this._id}`, JSON.stringify(this._data));
    } catch (error) {
        console.log(`Error: has error when write conversation_id ${this._id} :`, error.message);
    }
}

Conversation.prototype.readData = function () {
    try {
        const data = fs.readFileSync(`./data/${this._id}`, { encoding: 'utf-8' });
        this._data = JSON.parse(data);
    } catch (error) {
        console.log(`Error: has error when read conversation_id ${this._id} :`, error.message);
        this.emptyData();
    }
}

/**
 * Set message
 * @param {string} type question (Q), answer (A)
 * @param {string} message Message from client and gpt api
 */
Conversation.prototype.setMessage = function (type, message) {
    this.lastMessage = this._data.items[this._data.lastIndex];

    // This is question
    if (!this.lastMessage) {
        this.lastMessage = { question: '', answer: '', timeAt: Date.now() };
        this._data.items.push(this.lastMessage);
        this._data.lastIndex = this._data.items.length - 1;
    }

    // Next message
    if (type === 'answer') {
        this._data.lastIndex = this._data.items.length;
    }

    this.lastMessage[type] = message;

    // Commit to file
    this.writeData();
}

Conversation.prototype.getRelatedMessage = function() {
    if(this._data.items.length > this.numRelatedMessage) {
       return this._data.items.slice(0 - this.numRelatedMessage);
    } else {
       return this._data.items;
    }
}

Conversation.prototype.makePromt = function () {
    let promt = ``;
    this.getRelatedMessage().forEach(item => {
        promt += `Q:${item.question}, limit ${this.answerLimit} chars\nA:${item.answer}\n\n`;
    });
    return promt;
}

export default Conversation;
