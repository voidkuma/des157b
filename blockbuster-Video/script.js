(function(){
    'use strict';
    console.log('reading js');

            const myVideo = document.querySelector('#myVideo');
            const line1 = document.querySelector('#line1');
            const line2 = document.querySelector('#line2');
            const line3 = document.querySelector('#line3');
            const line4 = document.querySelector('#line4');

            const poem = {
                start: [0, 1, 2, 5],
                stop: [4, 4, 4, 11],
                line: [line1, line2, line3, line4]
            }

            const intervalID = setInterval(checkTime, 1000);

            function checkTime() {
                console.log(parseInt(myVideo.currentTime));

                if (poem.start[0] < myVideo.currentTime && myVideo.currentTime < poem.stop[0]) {
                    poem.line[0].className = "showing";
                } else {
                    poem.line[0].className = "hidden";
                }
                if (poem.start[1] < myVideo.currentTime && myVideo.currentTime < poem.stop[1]) {
                    poem.line[1].className = "showing";
                } else {
                    poem.line[1].className = "hidden";
                }
                if (poem.start[2] < myVideo.currentTime && myVideo.currentTime < poem.stop[2]) {
                    poem.line[2].className = "showing";
                } else {
                    poem.line[2].className = "hidden";
                }
                if (poem.start[3] < myVideo.currentTime && myVideo.currentTime < poem.stop[3]) {
                    poem.line[3].className = "showing";
                } else {
                    poem.line[3].className = "hidden";
                }
            }

            const fullScreen = document.querySelector('.fa-expand');

            fullScreen.addEventListener('click', function() {
                // The fullscreenElement attribute returns null if the element is in windowed mode
                if (!document.fullscreenElement) {
                    myVideo.className = 'FS';
                    duckBtn.className = 'hidden';
                    // document.documentElement returns the Element that is a direct child of the document, the <html> element
                    document.documentElement.requestFullscreen();
                } else {
                    document.exitFullscreen();
                    duckBtn.removeAttribute('class');
                    myVideo.removeAttribute('class');

                }
            });

            const duckBtn = document.querySelector('#duck');
            const duckDisplay = document.querySelector('#duckIMG');
            let playing = true;

            duckBtn.addEventListener('click', function(){
                if (!playing){
                    myVideo.play();
                    playing = true;
                    myVideo.removeAttribute('class');
                    duckBtn.innerHTML = '(click for a duck break)';
                    duckDisplay.className = 'hidden';
                    // fullScreen.removeAttribute('class');
                } else {
                    myVideo.pause();
                    playing = false;
                    duckDisplay.className = 'showing';
                    myVideo.className = 'paused';
                    duckBtn.innerHTML = '(click for no more duck)';
                    // fullScreen.className = 'hidden';

                }
            });
})();