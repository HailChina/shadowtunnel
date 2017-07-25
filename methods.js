module.exports = {

    'no-encrypt': {
        encrypt: function () {
            return 0;
        },
        decrypt: function () {
            return 0;
        }
    },

    'xor': {
        encrypt: function (data, key, wheel) {
            let keyBuffer = Buffer.from(key, 'utf8');
            for(let i=0; i<data.length; ++i){
                wheel = wheel % keyBuffer.length;
                data[i] = data[i] ^ keyBuffer[wheel];
                ++wheel;
            }
            return wheel;
        },
        decrypt: function (data, key, wheel) {
            let keyBuffer = Buffer.from(key, 'utf8');
            for(let i=0; i<data.length; ++i){
                wheel = wheel % keyBuffer.length;
                data[i] = data[i] ^ keyBuffer[wheel];
                ++wheel;
            }
            return wheel;
        }
    },

    'aes-256-cfb': {
        encrypt: function (data, key, wheel) {
            throw "Unsupported method";
        },
        decrypt: function (data, key, wheel) {
            throw "Unsupported method";
        }
    }

};