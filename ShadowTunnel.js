let net = require('net');
let util = require('util');
let log = require('./log');

function ShadowTunnel(opts, mod) {
    let server = require('./server')(opts, mod);

    let host = opts.local.host;
    let port = opts.local.port;

    this.start = () => {
        server.listen(port, host, function(err) {
            if(err) throw err;
            log.info(`Listening ${host}:${port}`);
        });
    };
}

module.exports = ShadowTunnel;