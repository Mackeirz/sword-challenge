const { MessageBroker } = require("./lib/message.broker");

module.exports = async (app) => {
  
  app.amqpInstance = await MessageBroker.getInstance();
  await app.amqpInstance.createChannel();
  await app.amqpInstance.attachChannelToQueue('notifications');
  await app.amqpInstance.attachChannelToExchange('managers');

  await app.amqpInstance.bindQueueToExchange('notifications', 'managers');

  return app.amqpInstance;
}