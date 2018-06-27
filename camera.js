// 这段代 主要是获取摄像头的视频流并显示在Video 签中

let Camera = {};

try {
    // 动态创建一个canvas元 ，并获取他2Dcontext。如果出现异常则表示不支持
    document.createElement('canvas').getContext('2d');
} catch (e) {
    alert('浏览器不支持HTML5 CANVAS！');
}

Camera.getMedia = function () {
    this.canvans = document.getElementById('canvas');
    this.video = document.getElementById('video-s');
    this.context = canvas.getContext('2d');

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    let errorFunc = function (error) {
        alert('摄像头调用失败！');
        console.log('Video capture error: ' + error.message, error.code);
    };

    let successFunc = function (stream) {
        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
        if (Camera.video.mozSrcObject !== undefined) {
            Camera.video.mozSrcObject = stream;
        } else {
            Camera.video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
        }
    };

    if (navigator.getUserMedia) {
        navigator.getUserMedia({
            'video': {
                'optional': [{
                    'sourceId': 1 // 0为前置摄像头，1为后置
                }]
            }
        }, successFunc, errorFunc); // success是获取成功的回调函数
    } else {
        alert('Native device media streaming (getUserMedia) not supported in this browser.');
    }
};

Camera.getPhoto = function () {
    canvas.width = Camera.video.videoWidth;
    canvas.height = Camera.video.videoHeight;
    this.context.drawImage(this.video, 0, 0);
    return Camera.canvans.toDataURL('image/jpg');
};

export default Camera;
