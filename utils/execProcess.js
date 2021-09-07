const exec = require('child_process').exec;

const result = function(fileName, cb){
    const child = exec(fileName, function(err, stdout, stderr){
        if(err != null){
            return cb(new Error(err), null);
        }else if(typeof(stderr) != "string"){
            return cb(new Error(stderr), null);
        }else{
            return cb(null, stdout);
        }
    });
}

exports.result = result;