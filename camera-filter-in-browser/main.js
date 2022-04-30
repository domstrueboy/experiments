const app = {
    timerCallback() {

        if (app.video.paused || app.video.ended) {
            return;
        }

        app.computeFrame();

        setTimeout(() => {
            app.timerCallback();
        }, 16); // roughly 60 frames per second
    },

    handleVideo(stream) {
        app.video.srcObject = stream;
        app.width = 300;
        app.height = 150;
    },

    videoError(e) {

    },

    doLoad() {
        app.video = document.getElementById('my-video');
        app.c1 = document.getElementById('my-canvas');
        app.ctx1 = app.c1.getContext('2d');

        app.video.addEventListener('play', () => {
            app.timerCallback();
        }, false);

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

        if (navigator.getUserMedia) {
            navigator.getUserMedia({ video: true }, app.handleVideo, app.videoError);
        }
    },

    computeFrame() {
        app.ctx1.drawImage(app.video, 0, 0, app.width, app.height);
        const frame = app.ctx1.getImageData(0, 0, app.width, app.height);
        const len = frame.data.length / 4;

        for (let i = 0; i < len; i++) {
            frame.data[i * 4 + 0] = frame.data[i * 4 + 0] > 50 ? frame.data[i * 4 + 0] : 50;
            frame.data[i * 4 + 1] = frame.data[i * 4 + 1];
            frame.data[i * 4 + 2] = frame.data[i * 4 + 2];
        }

        app.ctx1.putImageData(frame, 0, 0);

        return;
    }
};

app.doLoad();