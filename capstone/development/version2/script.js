(function(){
    'use strict';
    console.log('reading js');


    // [Logic]: User pressing play -> then leading onto the next scene

    const start = document.querySelector('#startBtn');
    const openingScene = document.querySelector('#openingScene');
    const question1 = document.querySelector('#question1');

    start.addEventListener('click', function(){
        openingScene.className = 'hidden';
        question1.className = 'showing';

    })

        // [Logic]: user answering Question #1 and having that lead to reflection #1

        const btns = document.querySelectorAll('#MCQ button');
        const reflection1 = document.querySelector('#reflectScene1');

        btns.forEach(function(btn){
            btn.addEventListener('click', function(){
                question1.className = 'hidden';
                reflection1.className = 'showing';
            })
        })

    // [Logic]: Reflection #1 to Question #2

    const continueReflect1 = document.querySelector('#continueReflect1');
    const secondQuestion = document.querySelector('#question2');

        continueReflect1.addEventListener('click', function(){
            reflection1.className = 'hidden';
            secondQuestion.className = 'showing'; 
        })

        // [Logic]: Question #2 to Reflection #2

        const secondSubmit = document.querySelector('#submitReflect1');
        const secondReflection = document.querySelector('#reflectScene2')

            secondSubmit.addEventListener('click', function(){
                secondQuestion.className = 'hidden';
                secondReflection.className = 'showing';
            })

    // [Logic]: Reflection #2 -> Question #3

    const thirdQuestion = document.querySelector('#question3');
    const continueReflect2 = document.querySelector('#continueReflect2')

    continueReflect2.addEventListener('click', function(){
        secondReflection.className = 'hidden';
        thirdQuestion.className = 'showing';
    })

        // [Logic] Question #3 -> Reflection #3
        const thirdReflection = document.querySelector('#reflectScene3');
        const thirdSubmit = document.querySelector('#submitReflect2');

        thirdSubmit.addEventListener('click', function(){
            thirdQuestion.className = 'hidden';
            thirdReflection.className = 'showing';
        })
    


})();