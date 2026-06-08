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
    const reflectStat1 = document.querySelector('#reflectScene1 h1');
    const reflectTotal1 = document.querySelector('#reflectTotal1');

    mcqSet1.forEach(function(btn){
        btn.addEventListener('click', async function() {
            const answer = btn.id;
            
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
    const reflectStat2 = document.querySelector('#reflectScene2 h1');
    const reflectTotal2 = document.querySelector('#reflectTotal2');

    mcqSet2.forEach(function(btn){
        btn.addEventListener('click', async function() {
            const answer = btn.id;
            
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
    const reflectStat3 = document.querySelector('#reflectScene3 h1');
    const reflectTotal3 = document.querySelector('#reflectTotal3');

    mcqSet3.forEach(function(btn){
        btn.addEventListener('click', async function() {
            const answer = btn.id;
            
            thirdQuestion.className = 'hidden';
            thirdReflection.className = 'showing';

            const data = await saveAndGetPercentage('q3', answer);

            reflectTotal3.textContent = `${data.total} reponses`;
            reflectStat3.textContent = `${data.percentage}% of others feel that way`;
        });
    })

    // Reflection 3 -> Smell Roses Scene

    const smellRosesScene = document.querySelector('#smellRosesScene');
    const thirdEndReflection = document.querySelector('#continueReflect3');

    new TypeIt("#startBtn", {
        speed: 50,
        waitUntilVisible: true,
    }).go();

    thirdEndReflection.addEventListener('click', function(){
        thirdReflection.className = 'hidden';
        smellRosesScene.className = 'showing';
    })

    // Smell Roses Scene -> neverLateScene

    const neverLateScene = document.querySelector('#neverLateScene');
    const smellRosesCloseBtn = document.querySelector('#smellRosesScene button');

    smellRosesCloseBtn.addEventListener('click', function(){
        smellRosesScene.className = 'hidden';
        neverLateScene.className = 'showing';
    })

    // neverLateScene -> CardCreationScene

    const endNeverLateSceneBtn = document.querySelector('#getStartedBtn');
    const cardCreationScene = document.querySelector('#makeCardScene');

    endNeverLateSceneBtn.addEventListener('click', function(){
        neverLateScene.className = 'hidden';
        cardCreationScene.className = 'showing';
    })

    // Card Creation: track selected color & stamp

    let selectedColor = null;
    let selectedStamp = null;

    const colors = document.querySelectorAll('#colors div');
    const stamps = document.querySelectorAll('#stamps div');

    colors.forEach(function(color){
        color.addEventListener('click', function() {
            colors.forEach(function(c) {
                c.classList.remove('selected');
            });
            color.classList.add('selected');
            selectedColor = color.id; // "black", "red", "purple", "green"
        });
    })

    stamps.forEach(function(stamp){
        stamp.addEventListener('click', function(){
            stamps.forEach(function(s){
                s.classList.remove('selected');
            });
            stamp.classList.add('selected');
            selectedStamp = stamp.id; // "sunStamp", "mushroomStamp", "flowerStamp", "heartStamp"
        })
    })

    // Map color IDs to hex values
    function getColorHex(colorId) {
        const map = {
            black: '#000000',
            red: '#E75B5D',
            purple: '#7D72AE',
            green: '#9FC490'
        };
        return map[colorId] || 'white';
    }

    // Map stamp IDs to image paths
    const stampImages = {
        sunStamp: 'images/sunStamp.svg',
        mushroomStamp: 'images/mushroomStamp.svg',
        flowerStamp: 'images/purpleFlower.svg',
        heartStamp: 'images/heartStamp.svg'
    };

    // Input references
    const cardInputs = document.querySelectorAll('#makeCardScene input');
    const toInput = cardInputs[0];
    const fromInput = cardInputs[1];
    const messageInput = cardInputs[2];

    // Skip button on makeCardScene goes straight to community garden
    const skipCardBtn = document.querySelector('#makeCardScene .Skip');

    skipCardBtn.addEventListener('click', function(){
        cardCreationScene.className = 'hidden';
        communityGardenScene.className = 'showing';
        document.body.style.overflow = 'auto';
        loadCommunityGarden();
    })

    // cardCreationScene -> postCardScene

    const saveCardBtn = document.querySelector('#saveCard');
    const postCardScene = document.querySelector('#postCardScene');

    saveCardBtn.addEventListener('click', function(){

        // Update the postcard preview with the user's choices
        document.querySelector('#toFromInfo').innerHTML = `
            <p>To: ${toInput.value || '—'}</p>
            <p>From: ${fromInput.value || '—'}</p>
        `;
        document.querySelector('#cardMessage').textContent = messageInput.value || '';
        document.querySelector('.chosenStamp').src = stampImages[selectedStamp] || 'images/sun.svg';

        // Apply the chosen background color to the card
        if (selectedColor) {
            document.querySelector('#card').style.backgroundColor = getColorHex(selectedColor);
            // Make text white on dark backgrounds for readability
            const darkColors = ['black', 'purple'];
            const textColor = darkColors.includes(selectedColor) ? 'white' : '#343434';
            document.querySelector('#card').style.color = textColor;
        }

        cardCreationScene.className = 'hidden';
        postCardScene.className = 'showing';
    })

    // postCardScene -> communityGarden (Post button)

    const postCardBtn = document.querySelector('#postCard');
    const communityGardenScene = document.querySelector('#communityGarden');

    postCardBtn.addEventListener('click', async function(){
        const Card = Parse.Object.extend("Card");
        const card = new Card();

        card.set("color", selectedColor);
        card.set("stamp", selectedStamp);
        card.set("toName", toInput.value || '');
        card.set("fromName", fromInput.value || '');
        card.set("message", messageInput.value || '');

        await card.save();

        postCardScene.className = 'hidden';
        communityGardenScene.className = 'showing';
        document.body.style.overflow = 'auto'; // allow scrolling in garden
        loadCommunityGarden();
    })

    // Skip button on postCardScene also goes to community garden
    const skipPostCardBtn = document.querySelector('#postCardScene .Skip');

    skipPostCardBtn.addEventListener('click', function(){
        postCardScene.className = 'hidden';
        communityGardenScene.className = 'showing';
        document.body.style.overflow = 'auto';
        loadCommunityGarden();
    })

    // Community Garden: fetch and display all posted cards

    async function loadCommunityGarden() {
        const Card = Parse.Object.extend("Card");
        const query = new Parse.Query(Card);
        query.descending("createdAt");

        const cards = await query.find();

        // Clear and re-render
        communityGardenScene.innerHTML = '<h2>See What Others Said</h2>';

        if (cards.length === 0) {
            communityGardenScene.innerHTML += '<p class="noCards">No cards yet — be the first!</p>';
            return;
        }

        cards.forEach(function(card) {
            const bgColor = getColorHex(card.get("color"));
            const stampSrc = stampImages[card.get("stamp")] || 'images/sun.svg';
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