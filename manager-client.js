const { amqpConn } = require('./config/broker');

(async () => {
  const conn = await amqpConn();
  const queue = 'notifications';

  const channel = await conn.createChannel();
  await channel.assertQueue(queue);

  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const { userName, taskName, taskDate } = JSON.parse(msg.content.toString());
      console.log(`The tech ${userName} performed the task ${taskName} on date ${(new Date(taskDate)).toUTCString()}`)
      channel.ack(msg);
    } else {
      console.log('Consumer cancelled by server');
    }
  });
})()