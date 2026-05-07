

(function(){
    'use strict';

    // logic for the typeit library
    new TypeIt('#text1', {
        strings: "I’m scared of many things...",
        speed: 75,
        loop: false,
    }).go();

    // logic for the scroll animate library
    AOS.init({
        easing: 'ease-out-back',
        duration: 1000,
        offset: 50
    });


})();