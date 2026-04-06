(function() {
    'use strict';

    const classInfo = document.querySelector('#classInfo');
    const bannerItem = document.querySelector('#movingItem');
    const button = document.querySelector('button');
    const myName = document.querySelector('#myName');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section')
    let mode = 'dark';

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            bannerItem.setAttribute('src', 'images/horse.png');
            classInfo.className = 'switch';
            myName.className = 'switch';
            body.className = 'switch';
            banner.className = 'switch';
            button.className = 'switch';
            for (const section of sections) {
                section.className = 'switch';
            }
            mode = 'light';
        } else {
            
            bannerItem.setAttribute('src', 'images/pirateShip.png');
            classInfo.removeAttribute('class');
            myName.removeAttribute('class');
            body.removeAttribute('class');
            banner.removeAttribute('class');
            button.removeAttribute('class');
            for (const section of sections) {
                section.removeAttribute('class');
            }
            mode = 'dark'
        }
    })
})()