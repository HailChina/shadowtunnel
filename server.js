let net = require('net');
let utils = require('./log');
let methods = require('./methods');


module.exports = function (opts, mod) {
    let server = net.createServer();
    let method = methods[opts.method];

    server.on('connection', (sock) => {
        let record = `<${sock.remoteAddress}:${sock.remotePort}>`;

        let client = net.createConnection(opts.remote.port, opts.remote.host, () => {
            utils.info(`${record} New connection`);
        });

        let wheels = [0, 0];

        /*
         * Data
         */
        sock.on('data', (data) => {
            if(mod==='client'){
                wheels[0] = method.encrypt(data, opts.key, wheels[0]);
                client.write(data);
            }else{
                wheels[1] = method.decrypt(data, opts.key, wheels[1]);
                client.write(data);
            }
        });

        client.on('data', (data) => {
            if(mod==='server'){
                wheels[0] = method.encrypt(data, opts.key, wheels[0]);
                sock.write(data);
            }else{
                wheels[1] = method.decrypt(data, opts.key, wheels[1]);
                sock.write(data);
            }
        });

        /*
         * Close
         */
        sock.on('close', () => {
            utils.info(`${record} Connection closed`);
            client.end();
        });

        /*
         * Error
         */
        client.on('error', (e) => {
            utils.error(`${record} Connection error, ${e.message}`);
            client.end();
            sock.end();
        });

        sock.on('error', (e) => {
            utils.error(`${record} Server error, ${e.message}`);
            sock.end();
            client.end();
        });
    });

    return server;
};

