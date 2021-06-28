function playVideo(stream, idvideo){
    const video = document.getElementById(idvideo);
    video.srcObject = stream;
    video.onloadedmetadata = function(err){
    video.play();
    };
}

module.exports = playVideo;