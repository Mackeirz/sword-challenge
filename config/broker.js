require('./env');

const amqplib = require('amqplib');

const amqpConn = () => amqplib.connect(`amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`).then(conn => conn);

module.exports = { amqpConn }