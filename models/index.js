const mongoose = require('mongoose')
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING || ''
const connection = mongoose.createConnection(MONGODB_CONNECTION_STRING)
connection.on('connected', () => console.log('Database Connected'));
connection.on('disconnected', () => console.log('Database Disconnected'));
connection.on('reconnected', () => console.log('Database reconnected'));
connection.on('disconnecting', () => console.log('Database disconnecting'));
connection.on('close', () => console.log('close'));

exports.customers = require('./model-customers')(mongoose, connection)