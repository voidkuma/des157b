(function(){
    'use strict';
    console.log('reading js');

            const myVideo = document.querySelector('#myVideo');
            const line1 = document.querySelector('#line1');
            const line2 = document.querySelector('#line2');
            const line3 = document.querySelector('#line3');

            const poem = {
                start: [0, 5, 8],
                stop: [4, 7, 10],
                line: [line1, line2, line3]
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
            }
})();