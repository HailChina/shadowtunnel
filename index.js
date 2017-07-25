let ShadowTunnel = require('./ShadowTunnel');
let argv = require('./argv');
let fs = require('fs');

/**
 * @param mod string  client or server
 */
module.exports = function (mod) {
    let args = argv
        .option({
            required_argument: true,
            name: 'config',
            short: 'c',
            type: 'path',
            description: 'Path to config file',
        })
        .option({
            name: 'daemon',
            short: 'd',
            type: 'boolean',
            description: 'Daemon mode',
        })
        .version("ShadowTunnel version 1.0.0")
        .run();

    let options = {
        config: undefined,
        daemon: false
    };

    for(let field in options){
        if(args.options[field]!==undefined) options[field] = args.options[field];
    }

    if(options.config===undefined) {
        console.log("Config file not defined");
        argv.help();
    }

    fs.readFile(options.config, (err, data) => {
        if(err) {
            console.log(`Read config file failed\n${err.message}`);
            return;
        }

        let rules = undefined;

        try {
            rules = JSON.parse(data.toString());
        }catch(e){
            console.log(`Parse config file failed\n${e.message}`);
            return;
        }

        if(rules instanceof Array){
            for(let i=0; i<rules.length; i++){
                let st = new ShadowTunnel(rules[i], mod);
                st.start();
            }
        }else if(rules instanceof Object){
            let st = new ShadowTunnel(rules, mod);
            st.start();
        }else{
            console.log('Invalid config');
        }

    });
};




