(function(){
    'use strict';
    console.log('reading js');

    Parse.initialize("g4cVIgY1yEjsQlradMy6nlrSIFAsMHMoY6QK4uNp", "FON8uE3vIM7FUUcahqjMtW4VytTNhjSq8FT6F0JR");
    Parse.serverURL = "https://parseapi.back4app.com/";

    // Save a response and return the % who picked the same answer
    async function saveAndGetPercentage(questionId, answer) {
        const QuizResponse = Parse.Object.extend("QuizResponse");

        const response = new QuizResponse();
        response.set("questionId", questionId);
        response.set("answer", answer);
        await response.save();

        const sameQuery = new Parse.Query(QuizResponse);
        sameQuery.equalTo("questionId", questionId);
        sameQuery.equalTo("answer", answer);
        const sameCount = await sameQuery.count();

        const totalQuery = new Parse.Query(QuizResponse);
        totalQuery.equalTo("questionId", questionId);
        const totalCount = await totalQuery.count();

        return {
            percentage: Math.round((sameCount / totalCount) * 100),
            total: totalCount
        };
    }

    // -------------------------------------------------------
    // Scene references
    // -------------------------------------------------------

    const openingScene        = document.querySelector('#openingScene');
    const firstQuestion       = document.querySelector('#question1');
    const firstReflection     = document.querySelector('#reflectScene1');
    const secondQuestion      = document.querySelector('#question2');
    const secondReflection    = document.querySelector('#reflectScene2');
    const thirdQuestion       = document.querySelector('#question3');
    const thirdReflection     = document.querySelector('#reflectScene3');
    const smellRosesScene     = document.querySelector('#smellRosesScene');
    const neverLateScene      = document.querySelector('#neverLateScene');
    const cardCreationScene   = document.querySelector('#makeCardScene');
    const postCardScene       = document.querySelector('#postCardScene');
    const communityGardenScene = document.querySelector('#communityGarden');
    const globalNav           = document.querySelector('#globalNav');

    // -------------------------------------------------------
    // Nav color helper — white text on dark scenes
    // -------------------------------------------------------

    const darkScenes = ['question1', 'question2', 'question3', 'smellRosesScene'];

    function updateNavColor(sceneId) {
        if (darkScenes.includes(sceneId)) {
            globalNav.classList.add('light-text');
        } else {
            globalNav.classList.remove('light-text');
        }
    }

    // -------------------------------------------------------
    // Global nav buttons
    // -------------------------------------------------------

    document.querySelector('#navHomeBtn').addEventListener('click', function(){
        document.querySelectorAll('main > div').forEach(function(scene){
            scene.className = 'hidden';
        });
        openingScene.className = 'showing';
        document.body.style.overflow = 'hidden';
        updateNavColor('openingScene');
    });

    document.querySelector('#navGardenBtn').addEventListener('click', function(){
        document.querySelectorAll('main > div').forEach(function(scene){
            scene.className = 'hidden';
        });
        communityGardenScene.className = 'showing';
        document.body.style.overflow = 'auto';
        updateNavColor('communityGarden');
        loadCommunityGarden();
    });

    // -------------------------------------------------------
    // TypeIt on start button
    // -------------------------------------------------------

    new TypeIt("#startBtn", {
        speed: 50,
        waitUntilVisible: true,
    }).go();

    // -------------------------------------------------------
    // Opening scene -> Question #1
    // -------------------------------------------------------

    document.querySelector('#startBtn').addEventListener('click', function(){
        openingScene.className = 'hidden';
        firstQuestion.className = 'showing';
        updateNavColor('question1');
    });

    // -------------------------------------------------------
    // Question #1 -> Reflection #1
    // -------------------------------------------------------

    const reflectStat1  = document.querySelector('#reflectScene1 h1');
    const reflectTotal1 = document.querySelector('#reflectTotal1');

    document.querySelectorAll('#MCQ1 button').forEach(function(btn){
        btn.addEventListener('click', async function() {
            firstQuestion.className = 'hidden';
            firstReflection.className = 'showing';
            updateNavColor('reflectScene1');

            const data = await saveAndGetPercentage('q1', btn.id);
            reflectTotal1.textContent = `${data.total} responses`;
            reflectStat1.textContent  = `${data.percentage}% of others feel that way`;
        });
    });

    // Reflection #1 -> Question #2

    document.querySelector('#continueReflect1').addEventListener('click', function(){
        firstReflection.className = 'hidden';
        secondQuestion.className = 'showing';
        updateNavColor('question2');
    });

    // -------------------------------------------------------
    // Question #2 -> Reflection #2
    // -------------------------------------------------------

    const reflectStat2  = document.querySelector('#reflectScene2 h1');
    const reflectTotal2 = document.querySelector('#reflectTotal2');

    document.querySelectorAll('#MCQ2 button').forEach(function(btn){
        btn.addEventListener('click', async function() {
            secondQuestion.className = 'hidden';
            secondReflection.className = 'showing';
            updateNavColor('reflectScene2');

            const data = await saveAndGetPercentage('q2', btn.id);
            reflectTotal2.textContent = `${data.total} responses`;
            reflectStat2.textContent  = `${data.percentage}% of others feel that way`;
        });
    });

    // Reflection #2 -> Question #3

    document.querySelector('#continueReflect2').addEventListener('click', function(){
        secondReflection.className = 'hidden';
        thirdQuestion.className = 'showing';
        updateNavColor('question3');
    });

    // -------------------------------------------------------
    // Question #3 -> Reflection #3
    // -------------------------------------------------------

    const reflectStat3  = document.querySelector('#reflectScene3 h1');
    const reflectTotal3 = document.querySelector('#reflectTotal3');

    document.querySelectorAll('#MCQ3 button').forEach(function(btn){
        btn.addEventListener('click', async function() {
            thirdQuestion.className = 'hidden';
            thirdReflection.className = 'showing';
            updateNavColor('reflectScene3');

            const data = await saveAndGetPercentage('q3', btn.id);
            reflectTotal3.textContent = `${data.total} responses`;
            reflectStat3.textContent  = `${data.percentage}% of others feel that way`;
        });
    });

    // Reflection #3 -> Smell Roses Scene

    document.querySelector('#continueReflect3').addEventListener('click', function(){
        thirdReflection.className = 'hidden';
        smellRosesScene.className = 'showing';
        updateNavColor('smellRosesScene');
    });

    // -------------------------------------------------------
    // Smell Roses Scene -> neverLateScene
    // -------------------------------------------------------

    document.querySelector('#smellRosesScene button').addEventListener('click', function(){
        smellRosesScene.className = 'hidden';
        neverLateScene.className = 'showing';
        updateNavColor('neverLateScene');
    });

    // -------------------------------------------------------
    // neverLateScene -> makeCardScene
    // -------------------------------------------------------

    document.querySelector('#getStartedBtn').addEventListener('click', function(){
        neverLateScene.className = 'hidden';
        cardCreationScene.className = 'showing';
        updateNavColor('makeCardScene');
    });

    // -------------------------------------------------------
    // Card creation: track color & stamp
    // -------------------------------------------------------

    let selectedColor = null;
    let selectedStamp = null;

    const colors = document.querySelectorAll('#colors div');
    const stamps = document.querySelectorAll('#stamps div');

    colors.forEach(function(color){
        color.addEventListener('click', function() {
            colors.forEach(c => c.classList.remove('selected'));
            color.classList.add('selected');
            selectedColor = color.id;
        });
    });

    stamps.forEach(function(stamp){
        stamp.addEventListener('click', function(){
            stamps.forEach(s => s.classList.remove('selected'));
            stamp.classList.add('selected');
            selectedStamp = stamp.id;
        });
    });

    function getColorHex(colorId) {
        const map = { black: '#000000', red: '#E75B5D', purple: '#7D72AE', green: '#9FC490' };
        return map[colorId] || 'white';
    }

    const stampImages = {
        sunStamp:      'images/sunStamp.svg',
        mushroomStamp: 'images/mushroomStamp.svg',
        flowerStamp:   'images/purpleFlower.svg',
        heartStamp:    'images/heartStamp.svg'
    };

    const cardInputs  = document.querySelectorAll('#makeCardScene input');
    const toInput     = cardInputs[0];
    const fromInput   = cardInputs[1];
    const messageInput = cardInputs[2];

    // -------------------------------------------------------
    // Skip makeCardScene -> communityGarden
    // -------------------------------------------------------

    document.querySelector('#makeCardScene .Skip').addEventListener('click', function(){
        cardCreationScene.className = 'hidden';
        communityGardenScene.className = 'showing';
        document.body.style.overflow = 'auto';
        updateNavColor('communityGarden');
        loadCommunityGarden();
    });

    // -------------------------------------------------------
    // Save card -> postCardScene
    // -------------------------------------------------------

    document.querySelector('#saveCard').addEventListener('click', function(){
        document.querySelector('#toFromInfo').innerHTML = `
            <p>To: ${toInput.value || '—'}</p>
            <p>From: ${fromInput.value || '—'}</p>
        `;
        document.querySelector('#cardMessage').textContent = messageInput.value || '';
        document.querySelector('.chosenStamp').src = stampImages[selectedStamp] || 'images/sun.svg';

        if (selectedColor) {
            const darkColors = ['black', 'purple'];
            document.querySelector('#card').style.backgroundColor = getColorHex(selectedColor);
            document.querySelector('#card').style.color = darkColors.includes(selectedColor) ? 'white' : '#343434';
        }

        cardCreationScene.className = 'hidden';
        postCardScene.className = 'showing';
        updateNavColor('postCardScene');
    });

    // -------------------------------------------------------
    // Post card -> communityGarden
    // -------------------------------------------------------

    document.querySelector('#postCard').addEventListener('click', async function(){
        const Card = Parse.Object.extend("Card");
        const card = new Card();

        card.set("color",    selectedColor);
        card.set("stamp",    selectedStamp);
        card.set("toName",   toInput.value || '');
        card.set("fromName", fromInput.value || '');
        card.set("message",  messageInput.value || '');

        await card.save();

        postCardScene.className = 'hidden';
        communityGardenScene.className = 'showing';
        document.body.style.overflow = 'auto';
        updateNavColor('communityGarden');
        loadCommunityGarden();
    });

    // Skip postCardScene -> communityGarden

    document.querySelector('#postCardScene .Skip').addEventListener('click', function(){
        postCardScene.className = 'hidden';
        communityGardenScene.className = 'showing';
        document.body.style.overflow = 'auto';
        updateNavColor('communityGarden');
        loadCommunityGarden();
    });

    // -------------------------------------------------------
    // Community Garden: fetch and render all cards
    // -------------------------------------------------------

    async function loadCommunityGarden() {
        const Card = Parse.Object.extend("Card");
        const query = new Parse.Query(Card);
        query.descending("createdAt");
        const cards = await query.find();

        communityGardenScene.innerHTML = '<h2>See What Others Said</h2>';

        if (cards.length === 0) {
            communityGardenScene.innerHTML += '<p class="noCards">No cards yet — be the first!</p>';
            return;
        }

        cards.forEach(function(card) {
            const bgColor   = getColorHex(card.get("color"));
            const stampSrc  = stampImages[card.get("stamp")] || 'images/sun.svg';
            const darkColors = ['black', 'purple'];
            const textColor = darkColors.includes(card.get("color")) ? 'white' : '#343434';

            const cardEl = document.createElement('div');
            cardEl.classList.add('gardenCard');
            cardEl.style.backgroundColor = bgColor;
            cardEl.style.color = textColor;
            cardEl.innerHTML = `
                <div class="gardenCardLeft">
                    <p>To: ${card.get("toName") || '—'}</p>
                    <p>From: ${card.get("fromName") || '—'}</p>
                    <img src="${stampSrc}" alt="stamp">
                </div>
                <div class="gardenCardRight">
                    <p>${card.get("message") || ''}</p>
                </div>
            `;
            communityGardenScene.appendChild(cardEl);
        });
    }

})();