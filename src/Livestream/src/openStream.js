const playVideo = require('./playVideo');


function openStream(cb){
    navigator.mediaDevices.getUserMedia({audio:false, video:true})
            .then(function(stream){
                cb(stream);
            })
            .catch(function(err){
                console.log(err.name + ": " + err.message);
            });
}

module.exports = openStream;