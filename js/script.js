window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //Timer

    const countTimer =  (deadline) => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        const addZeroes = function(item) {
            if (item > 9) {
                return item
            } else {
                return `0${item}`
            }
        };

        const getTimeRemaining = function() {
            const dateNow = new Date().getTime();
            let dateStop;
            
            if (deadline) {
                dateStop = new Date(deadline).getTime();
            } else {
                dateStop = new Date(`${new Date(dateNow).getMonth() + 1} ${new Date(dateNow).getDate() + 1} ${new Date(dateNow).getFullYear()}`);
            }

            const timeRemaining = (dateStop - dateNow) / 1000,
                seconds = addZeroes(Math.floor(timeRemaining % 60)),
                minutes = addZeroes(Math.floor((timeRemaining / 60) % 60)),
                hours = addZeroes(Math.floor(timeRemaining / 3600));

            return {timeRemaining, hours, minutes, seconds};
        }

        const updateClock = function() {
            let timer = getTimeRemaining();
            if (timer.timeRemaining > 0) {
                timerHours.textContent = timer.hours;
                timerMinutes.textContent = timer.minutes;
                timerSeconds.textContent = timer.seconds;
                setTimeout(updateClock, 1000);
            } else {
                clearTimeout(updateClock);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }

        updateClock();
        
    };

    countTimer();

    //Menu

    const toogleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        const scrollMenu = function (e) {
            e.preventDefault();
            let scrollItem = document.querySelector(e.target.getAttribute('href'));
            scrollItem.scrollIntoView({
                behavior: "smooth"
            });
        };

        let isMenuActive = false;

        menu.addEventListener('click', (event) => {
            let target = event.target;
            if (target === closeBtn) {
                handlerMenu();
            } else if (target.tagName === 'A') {
                handlerMenu();
                scrollMenu(event);
            }
        });

        btnMenu.addEventListener('click', handlerMenu);

        const mainLink = document.querySelector('.main-link'),
            mainLinkBlock = document.querySelector(mainLink.getAttribute('href'));

        mainLink.addEventListener('click', (e) => {
            e.preventDefault();
            mainLinkBlock.scrollIntoView({
                behavior: "smooth"
            })
        });


    };

    toogleMenu();

});