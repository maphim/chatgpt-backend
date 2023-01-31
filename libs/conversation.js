const fs = require('fs');

const Conversation = function (id) {
    this.init(id);
}

Conversation.prototype.init = function (id) {

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
 * Submit chat item
 * @param {string} type question (Q), answer (A)
 * @param {string} message Promt message
 */
Conversation.prototype.setMessage = function (type, message) {
    this.lastMessage = this._data.items[this._data.lastIndex];

    // This is question
    if (!this.lastMessage) {
        this.lastMessage = { question: '', answer: '' };
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

Conversation.prototype.makePromt = function () {
    let promt = ``;
    this._data.items.forEach(item => {
        promt += `Q:${item.question}\nA:${item.answer}\n\n`;
    });
    return promt;
}

module.exports = Conversation;