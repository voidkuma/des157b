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

    // logic behind user pressing first question answer to lead to next question

    const btns = document.querySelectorAll('#MCQ button');
    const reflection1 = document.querySelector('#reflectScene1');

    btns.forEach(function(btn){
        btn.addEventListener('click', function(){
            question1.className = 'hidden';
            reflection1.className = 'showing';
        })
    })



})();