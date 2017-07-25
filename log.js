module.exports.info = function() {
	console.log.apply(null, [ `[${new Date().Format("yyyy-MM-dd HH:mm:ss")}]` ].concat([].slice.apply(arguments)));
};

module.exports.error = function() {
	console.error.apply(null, [ `[${new Date().Format("yyyy-MM-dd HH:mm:ss")}]` ].concat([].slice.apply(arguments)));
};

Date.prototype.Format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};