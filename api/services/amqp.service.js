
class AmqpService {
  static async publishExchange(exchangeName, data) {
    const { UserService } = require('./user.service');
    const { amqpInstance } = require('../../app');
    try {
      const user = await UserService.findById(data.userId);
      amqpInstance.publishToExchange(exchangeName, {
        taskName: data.name,
        taskDate: data.date,
        userName: user.name
      });
    } catch (error) {
      console.error(error.message + " for publishing message");
    }
  }
}

module.exports = { AmqpService }