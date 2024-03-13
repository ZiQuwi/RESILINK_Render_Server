const winston = require('winston')
const {combine, timestamp, json, prettyPrint, errors} = winston.format

winston.loggers.add('GetDataLogger', {
    format: combine(
        json(),
        timestamp(),
        prettyPrint()
    ),
    transports: [
        //new winston.transports.Console(),
        new winston.transports.File({filename: 'src/v1/loggers/getDataODEP.log'})
    ],
    defaultMeta: {service: 'getDataODEPService'}
})

winston.loggers.add('UpdateDataODEPLogger', {
    format: combine(
        json(),
        timestamp(),
        prettyPrint()
    ),    
    transports: [
        //new winston.transports.Console(),
        new winston.transports.File({filename: 'src/v1/loggers/UpdateDataODEP.log'})
    ],
    defaultMeta: {service: 'UpdateDataODEPService'}
})

winston.loggers.add('UpdateDataResilinkLogger', {
    format: combine(
        json(),
        timestamp(),
        prettyPrint()
    ),
    transports: [
        //new winston.transports.Console(),
        new winston.transports.File({filename: 'src/v1/loggers/UpdateDataResilink.log'})
    ],
    defaultMeta: {service: 'UpdateDataResilinkService'}
})

winston.loggers.add('DeleteDataODEPLogger', {
    format: combine(
        json(),
        timestamp(),
        prettyPrint()
    ),
    transports: [
        //new winston.transports.Console(),
        new winston.transports.File({filename: 'src/v1/loggers/DeleteDataODEP.log'})
    ],
    defaultMeta: {service: 'DeleteDataODEPService'}
})

winston.loggers.add('DeleteDataResilinkLogger', {
    format: combine(
        json(),
        timestamp(),
        prettyPrint()
    ),
    transports: [
        //new winston.transports.Console(),
        new winston.transports.File({filename: 'src/v1/loggers/DeleteDataResilink.log'})
    ],
    defaultMeta: {service: 'DeleteDataResilinkService'}
})

winston.loggers.add('ConnectDBResilinkLogger', {
    format: combine(
        json(),
        timestamp(),
        prettyPrint()
    ),
    transports: [
        //new winston.transports.Console(),
        new winston.transports.File({filename: 'src/v1/loggers/ConnectDBResilink.log'})
    ],
    defaultMeta: {service: 'ConnectDBResilinkService'}
})

winston.loggers.add('PatchDataODEPLogger', {
    format: combine(
        json(),
        timestamp(),
        prettyPrint()
    ),
    transports: [
        //new winston.transports.Console(),
        new winston.transports.File({filename: 'src/v1/loggers/PatchDataODEP.log'})
    ],
    defaultMeta: {service: 'PatchDataODEPService'}
})
