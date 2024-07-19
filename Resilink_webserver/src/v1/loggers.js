const winston = require('winston');
require('winston-mongodb');

const { combine, timestamp, json, prettyPrint } = winston.format;


//account and key to mongodb 
const _username = "axelcazaux1";
const _password = "ysf72odys0D340w6";

// MongoDB Atlas cluster connection URL
const url = 'mongodb+srv://' + _username + ':' + _password + '@clusterinit.pvcejia.mongodb.net/Logs?retryWrites=true&w=majority&appName=AtlasApp';

const mongoOptions = (collectionName) => ({
    db: url,
    collection: collectionName,
    level: 'info',
    options: { useNewUrlParser: true, useUnifiedTopology: true },
});

winston.loggers.add('GetDataLogger', {
    format: combine(
        json(),
        timestamp(),
        prettyPrint()
    ),
    transports: [
        new winston.transports.MongoDB(mongoOptions('GetLogs'))
    ],
    defaultMeta: { service: 'getDataODEPService' }
});

winston.loggers.add('UpdateDataODEPLogger', {
    format: combine(
        json(),
        timestamp(),
        prettyPrint()
    ),
    transports: [
        new winston.transports.MongoDB(mongoOptions('PutLogs'))
    ],
    defaultMeta: { service: 'UpdateDataODEPService' }
});

winston.loggers.add('UpdateDataResilinkLogger', {
    format: combine(
        json(),
        timestamp(),
        prettyPrint()
    ),
    transports: [
        new winston.transports.MongoDB(mongoOptions('PutLogs'))
    ],
    defaultMeta: { service: 'UpdateDataResilinkService' }
});

winston.loggers.add('DeleteDataODEPLogger', {
    format: combine(
        json(),
        timestamp(),
        prettyPrint()
    ),
    transports: [
        new winston.transports.MongoDB(mongoOptions('DeleteLogs'))
    ],
    defaultMeta: { service: 'DeleteDataODEPService' }
});

winston.loggers.add('DeleteDataResilinkLogger', {
    format: combine(
        json(),
        timestamp(),
        prettyPrint()
    ),
    transports: [
        new winston.transports.MongoDB(mongoOptions('DeleteLogs'))
    ],
    defaultMeta: { service: 'DeleteDataResilinkService' }
});

winston.loggers.add('ConnectDBResilinkLogger', {
    format: combine(
        json(),
        timestamp(),
        prettyPrint()
    ),
    transports: [
        new winston.transports.MongoDB(mongoOptions('ConnectionLogs'))
    ],
    defaultMeta: { service: 'ConnectDBResilinkService' }
});

winston.loggers.add('PatchDataODEPLogger', {
    format: combine(
        json(),
        timestamp(),
        prettyPrint()
    ),
    transports: [
        new winston.transports.MongoDB(mongoOptions('PatchLogs'))
    ],
    defaultMeta: { service: 'PatchDataODEPService' }
});
