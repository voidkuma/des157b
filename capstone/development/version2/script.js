(function(){
    'use strict';
    console.log('reading js');


    const start = document.querySelector('#startBtn');
    const openingScene = document.querySelector('#openingScene');
    const question1 = document.querySelector('#question1');

    start.addEventListener('click', function(){
        openingScene.className = 'hidden';
        question1.className = 'showing';

    })

})();