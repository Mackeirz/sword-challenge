const { amqpConn } = require('../config/broker');

class MessageBroker {
  _amqp = null;
  _channels = [];
  static _instance = null;

  constructor(amqp) {
    this._amqp = amqp;
  }

  static async getInstance() {
    if (!this._conn) {
      const amqp = await amqpConn();
      this._instance = new this(amqp);
    }
    return this._instance;
  }

  async createChannel(name = 'ch1') {
    const channel = await this._amqp.createChannel();
    this._channels.push({
      name,
      channel: channel
    })
  }

  async getChannel(channelName) {
    const filteredChannels = this._channels.filter(({ name }) => channelName === name);
    if (filteredChannels.length === 1) {
      return Promise.resolve(filteredChannels[0].channel);
    }
    return null;
  }

  async attachChannelToQueue(queueName, channelName = 'ch1') {
    const channel = await this.getChannel(channelName);
    if (channel) {
      return channel.assertQueue(queueName);
    }

    return Promise.reject(new Error("Channel not found"));
  }

  async attachChannelToExchange(exchangeName, exchangeType = 'fanout', channelName = 'ch1', options = { durable: false }) {
    const channel = await this.getChannel(channelName);
    if (channel) {
      return channel.assertExchange(exchangeName, exchangeType, options);
    }

    return Promise.reject(new Error("Channel not found"));
  }

  async bindQueueToExchange(queueName, exchangeName, channelName = 'ch1') {
    const channel = await this.getChannel(channelName);
    if (channel) {
      return channel.bindQueue(queueName, exchangeName, '');
    }

    return Promise.reject(new Error("Channel not found"));
  }

  async publishToExchange(exchangeName, data = {}, channelName = 'ch1') {
    const channel = await this.getChannel(channelName);
    if (channel) {
      return channel.publish(exchangeName, '', Buffer.from(JSON.stringify(data)));
    }

    return Promise.reject(new Error("Channel not found"));
  }
}

module.exports = { MessageBroker }