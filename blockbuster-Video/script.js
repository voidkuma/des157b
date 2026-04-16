(function(){
    'use strict';
    console.log('reading js');

            const myVideo = document.querySelector('#myVideo');
            const line1 = document.querySelector('#line1');
            const line2 = document.querySelector('#line2');
            const line3 = document.querySelector('#line3');
            const line4 = document.querySelector('#line4');

            // keeps track of the lines of poem and when they start to appear
            const poem = {
                start: [0, 1, 2, 4],
                stop: [3, 3, 3, 11],
                line: [line1, line2, line3, line4]
            }

            // the loading element, later used to load when video isn't playing
            const loading = document.querySelector('.fa-cloud-rain');

            myVideo.addEventListener('playing', function() {
                    loading.style.display = 'none';
            });

            const intervalID = setInterval(checkTime, 1000);

            // checks the time of the video to accurately reflect the poem lines
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

            // variables for the expand btn and duck btn to be used in following functions
            const fullScreen = document.querySelector('.fa-expand');
            const duckBtn = document.querySelector('#duck');

            // everytime the FS btn pressed the document goes fullscreen
            fullScreen.addEventListener('click', function() {
                // The fullscreenElement attribute returns null if the element is in windowed mode
                if (!document.fullscreenElement) {
                    myVideo.classList.add('FS');
                    // document.documentElement returns the Element that is a direct child of the document, the <html> element
                    document.documentElement.requestFullscreen();
                } else {
                    document.exitFullscreen();
                    myVideo.classList.remove('FS');

                }
            });

            // duckDisplay is the overlay image of the duck
            const duckDisplay = document.querySelector('#duckIMG');
            let playing = true;

            // when duck break btn is pressed the overlay shows up with a b&w filter
            duckBtn.addEventListener('click', function(){
                if (!playing){
                    myVideo.play();
                    playing = true;
                    duckBtn.innerHTML = '(click for a duck break)';
                    // duckDisplay.className = 'hidden';
                    duckDisplay.classList.add('hidden');
                    duckDisplay.classList.remove('showing');

                    myVideo.classList.remove('paused');
                    // fullScreen.removeAttribute('class');
                } else {
                    myVideo.pause();
                    playing = false;
                    duckDisplay.classList.add('showing');
                    duckDisplay.classList.remove('hidden');
                    myVideo.classList.add('paused');
                    duckBtn.innerHTML = '(click for no more duck)';
                    // fullScreen.className = 'hidden';

                }
            });
})();