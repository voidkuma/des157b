(function(){
    'use strict';
    console.log('reading js');

    Parse.initialize("g4cVIgY1yEjsQlradMy6nlrSIFAsMHMoY6QK4uNp", "FON8uE3vIM7FUUcahqjMtW4VytTNhjSq8FT6F0JR");
    Parse.serverURL = "https://parseapi.back4app.com/";


    // Save a response and return the % who picked the same answer
    async function saveAndGetPercentage(questionId, answer) {
        const QuizResponse = Parse.Object.extend("QuizResponse");
        
        // Save this user's answer
        const response = new QuizResponse();
        response.set("questionId", questionId);
        response.set("answer", answer);
        await response.save();

        // Count how many picked the same answer
        const sameQuery = new Parse.Query(QuizResponse);
        sameQuery.equalTo("questionId", questionId);
        sameQuery.equalTo("answer", answer);
        const sameCount = await sameQuery.count();

        // Count total for this question
        const totalQuery = new Parse.Query(QuizResponse);
        totalQuery.equalTo("questionId", questionId);
        const totalCount = await totalQuery.count();

        return {
            percentage: Math.round((sameCount / totalCount) * 100),
            total: totalCount
        };
    }

    // Opening scene -> Question #1
    const openingScene = document.querySelector('#openingScene');
    const startBtn = document.querySelector('#startBtn');
    const firstQuestion = document.querySelector('#question1');

    startBtn.addEventListener('click', function(){
        openingScene.className = 'hidden';
        firstQuestion.className = 'showing';
    })

    // Question #1 -> Reflection #1

    const mcqSet1 = document.querySelectorAll('#MCQ1 button');
    const firstReflection = document.querySelector('#reflectScene1');
    const reflectStat1 = document.querySelector('#reflectionScene1 h1');
    const reflectTotal1 = document.querySelector('#reflectTotal1');

    mcqSet1.forEach(function(btn){
        btn.addEventListener('click', async function() {
            const answer = btn.id; // "option1", "option2", etc.
            
            firstQuestion.className = 'hidden';
            firstReflection.className = 'showing';

            const data = await saveAndGetPercentage('q1', answer);

            reflectTotal1.textContent = `${data.total} reponses`;
            reflectStat1.textContent = `${data.percentage}% of others feel that way`;
        });
    })

    // Reflection #1 -> Question #2

    const firstEndReflection = document.querySelector('#continueReflect1');
    const secondQuestion = document.querySelector('#question2');

    firstEndReflection.addEventListener('click', function(){
        firstReflection.className = 'hidden';
        secondQuestion.className = 'showing';

    })

    // Question #2 -> Reflection #2

    const mcqSet2 = document.querySelectorAll('#MCQ2 button');
    const secondReflection = document.querySelector('#reflectScene2');
    const reflectStat2 = document.querySelector('#reflectionScene2 h1');
    const reflectTotal2 = document.querySelector('#reflectTotal2');

    mcqSet2.forEach(function(btn){
        btn.addEventListener('click', async function() {
            const answer = btn.id; // "option1", "option2", etc.
            
            secondQuestion.className = 'hidden';
            secondReflection.className = 'showing';

            const data = await saveAndGetPercentage('q2', answer);

            reflectTotal2.textContent = `${data.total} reponses`;
            reflectStat2.textContent = `${data.percentage}% of others feel that way`;
        });
    })

    // Reflection #2 -> Question #3

    const secondEndReflection = document.querySelector('#continueReflect2');
    const thirdQuestion = document.querySelector('#question3');

    secondEndReflection.addEventListener('click', function(){
        secondReflection.className = 'hidden';
        thirdQuestion.className = 'showing';
    })

    // Question #3 -> Reflection #3

    const mcqSet3 = document.querySelectorAll('#MCQ3 button');
    const thirdReflection = document.querySelector('#reflectScene3');
    const reflectStat3 = document.querySelector('#reflectionScene3 h1');
    const reflectTotal3 = document.querySelector('#reflectTotal3');

    mcqSet3.forEach(function(btn){
        btn.addEventListener('click', async function() {
            const answer = btn.id; // "option1", "option2", etc.
            
            thirdQuestion.className = 'hidden';
            thirdReflection.className = 'showing';

            const data = await saveAndGetPercentage('q3', answer);

            reflectTotal3.textContent = `${data.total} reponses`;
            reflectStat3.textContent = `${data.percentage}% of others feel that way`;
        });
    })

    const smellRosesScene = document.querySelector('#smellRosesScene');
    const thirdEndReflection = document.querySelector('#continueReflect3');

    thirdEndReflection.addEventListener('click', function(){
        thirdReflection.className = 'hidden';
        smellRosesScene.className = 'showing';

    })




})();