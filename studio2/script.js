(function(){
    'use strict';

    const header = document.querySelector('header');

    // Activates the switch between light and dark of the header
    header.addEventListener('click', function(){
        if (header.className == 'switch'){
            header.classList.remove('switch');
        } else {
            header.classList.add('switch');
        }
    });

    // Logic for when user toggles with R/L arrows & getting the data from our JSON file
    let globalData;
    let days;
    let currentDay = 0; // represents the index we're starting on (day 0 aka monday typeshit)

    // Gets the data async
    async function getData() {
        const weekPetData = await fetch('data/photoData.json'); // fetches the data from the .json file
        const data = await weekPetData.json(); // turns the fetched data into a javascript object
        globalData = data; // assigns the data into a variable so it's globally accessible
        days= Object.keys(globalData); // gives us our objects as a array ['monday', 'tuesday', ...]
        updatePage(currentDay, globalData); // updates the page based on which day selected
    }

    getData();

    const arrowL = document.querySelector('.arrow.left'); // left arrow
    const arrowR = document.querySelector('.arrow.right'); // right arrow

    // // When the back arrow gets clicked 
    arrowL.addEventListener('click', function(){
        if (currentDay == 0){
            currentDay = 7; // goes to the last index
            updatePage(currentDay, globalData);
        } else {
            currentDay -= 1; // goes to the index before that one
            updatePage(currentDay, globalData);
        }

    });


    // // When the front (right) arrow gets clicked
    arrowR.addEventListener('click', function(){
        if (currentDay == 7){
            currentDay = 0; // goes to the very first index
            updatePage(currentDay, globalData);
        } else {
            currentDay += 1; // goes ahead one index
            updatePage(currentDay, globalData);
        }

    });

    // Variables that change within each day
    const dayHeader = document.querySelector('#dateHeader'); // sticky note header
    const dayNotes = document.querySelector('#dateNotes'); // sticky note [notes]
    const dayPhoto = document.querySelector('#catIMG'); // day photo
    const photoNote = document.querySelector('#IMGnote'); // photo note

    // updates page according which page it's turned to
    function updatePage(index, data){
        const dayKey = days[index]; // e.g. "monday"
        const dayData = data[dayKey]; // gives us the full day object e.g { photos: 3, description: "She loves her carpet!", image: "images/day3.webp", title: "*Aurora being fat n cute*" }

        dayHeader.innerHTML = `${dayKey} <br> ${dayData.photos} Photos Taken,`;
        dayNotes.innerHTML = dayData.description;
        dayPhoto.src = dayData.image;
        photoNote.innerHTML = dayData.title;

        // updates the class of the square nav to indicate progress
        document.querySelectorAll('.square').forEach(function(sq, i) {
            sq.classList.toggle('active', i === index);
        });

    }

    const cursor = document.querySelector('#custom-cursor');
    const clickables = document.querySelectorAll('header, .arrow');

    // fun cursor logic, so that the cursor can follow the user 
    document.addEventListener('mousemove', function(event) {
        cursor.style.left = event.clientX + 'px';
        cursor.style.top = event.clientY + 'px';
    });

    // makes it so when a user hovers over something that can be clicked it changes color
    clickables.forEach(function(event){
        event.addEventListener('mouseenter', function(){
            cursor.style.backgroundColor = '#b55b8d';
        });
        event.addEventListener('mouseleave', function(){
            cursor.style.backgroundColor = 'white';
        });
    });




})();