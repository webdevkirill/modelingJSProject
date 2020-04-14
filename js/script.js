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
        }

        btnMenu.addEventListener('click', handlerMenu);

        closeBtn.addEventListener('click', handlerMenu);

        const scrollMenu = function (e) {
            e.preventDefault();
            let scrollItem = document.querySelector(this.querySelector('a').getAttribute('href'));
            scrollItem.scrollIntoView({
                behavior: "smooth"
            });
        }

        menuItems.forEach((item) => {
            item.addEventListener('click', handlerMenu);
            item.addEventListener('click', scrollMenu)
        });

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

    //popup

    const tooglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtns = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = popup.querySelector('.popup-content');

        let showPopup = () => {
            if (!popup.style.display || popup.style.display === 'none'){
                popup.style.display = 'block';
                popupContent.style.top = '10%';
                document.body.style.overflow = 'hidden';
                if (document.documentElement.clientWidth > 768) {
                    popupContent.style.top = '-500px';
                    let animate = () => {
                        let animation = requestAnimationFrame(animate);
                        popupContent.style.top = (parseInt(popupContent.style.top) + 15) + 'px';

                        if (parseInt(popupContent.style.top) > 99) {
                            cancelAnimationFrame(animation);
                        }
                    };
                    animate();
                }
            } else {
                popup.style.display = 'none';
                popupContent.style.top = '10%';
                document.body.style.overflow = '';
            }
            
        }

        popupBtns.forEach((item) => {
            item.addEventListener('click', showPopup);
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;

            if (target === popupClose) {
                showPopup();
            } else {
                target = event.target.closest('.popup-content');
                if (!target) {
                    showPopup();
                }
            }
        });
    };

    tooglePopup();

    //tabs


    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toogleTabConntent = (index) => {
            for (let i = 0; i < tab.length; i++) {
                if (index === i) {
                    tabContent[i].classList.remove('d-none');
                    tab[i].classList.add('active');
                } else {
                    tabContent[i].classList.add('d-none');
                    tab[i].classList.remove('active');
                }
            };
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toogleTabConntent(i);
                    }
                });
            }

        });
    };

    tabs();

    //slider

    const slider = (time = 3000) => {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content'),
            dotsWrapper = document.querySelector('.portfolio-dots');

        const addDots = () => {
            for (let i = 0; i < slide.length; i++) {
                let dot = document.createElement('li');
                dot.classList.add('dot');
                if (i === 0) {
                    dot.classList.add('dot-active');
                }
                dotsWrapper.append(dot);
            }
        }

        addDots();
        const dots = document.querySelectorAll('.dot');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, className) => {
            elem[index].classList.remove(className);
        };

        const nextSlide = (elem, index, className) => {
            elem[index].classList.add(className);
        };

        const isHasSlide = (elem) => {
            if (elem >= slide.length) {
                return 0;
            } else if (elem < 0) {
                return slide.length - 1;
            } else {
                return elem
            }
        }

        const autoPlaySlider = () => { 
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            currentSlide = isHasSlide(++currentSlide);
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        };

        const startSlider = () => {
            interval = setInterval(autoPlaySlider, time);
        };

        startSlider();

        const stopSlider = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.dot, .portfolio-btn')) {
                returnl
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide = isHasSlide(++currentSlide);
            } else if (target.matches('#arrow-left')) {
                currentSlide = isHasSlide(--currentSlide);
            } else if (target.matches('.dot')) {
                dots.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                })
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.dot, .portfolio-btn')) {
                stopSlider();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.dot, .portfolio-btn')) {
                startSlider();
            }
        });

    };

    slider(3000);

    //team

    const team = () => {
        const commandPhoto = document.querySelectorAll('.command__photo');

        const changeSrc = (elem) => {
            const dataSrc = elem.dataset.img;
            elem.dataset.img = elem.getAttribute('src');
            elem.setAttribute('src', dataSrc);
        }

        commandPhoto.forEach((item) => {
            item.addEventListener('mouseover', (event) => {
                changeSrc(item);
            });
            item.addEventListener('mouseout', (event) => {
                changeSrc(item);
            });
        });
    };

    team();

    //calc

    const aminateNumbers = (elem, value, time) => {

        if (+elem.textContent === +value) {
            return
        }

        const diff = ((+value - +elem.textContent) + '').split('');
        let sign;
        
        if (diff[0] === '-') {
            sign = '-';
            diff.splice(0, 1);
        } else {
            sign = '+';
        } 


        let res = elem.textContent.split('');
        diff.forEach(() => {
            if (res.length < diff.length) {
                res.unshift('0');
            } 
            
        });

        console.log(diff, res);

        let count = 0;

        const aminationRec = () => {
            if (sign === '+') {
                diff.forEach((item, i) => {
                    
                        if (item === '0' && count === 0) {
                            res[i + res.length - diff.length] = (+res[i + res.length - diff.length] + 1) + '';
                            diff[i] = '9';
                        } else if (item !== '0') {
                            const repChar = (+res[i + res.length - diff.length] + 1) + '';
                            
                            res[i + res.length - diff.length] = repChar === '10' ? '0' : repChar;
                            diff[i] = (+diff[i] - 1) + '';;
                        }
                    
                    
                });

                elem.textContent = res.join('');
                

                count++;
                if (count === 10) {
                    clearInterval(animationInterval);
                }
            } else if (sign === '-') {
                diff.forEach((item, i) => {
                    if (item === '0' && count === 0) {
                        res[i] = Math.abs((+res[i] - 1) + '');
                        diff[i] = '1';
                    } else if (item !== '0') {
                        const repChar = Math.abs((+res[i] - 1) + '');

                        res[i] = repChar === '10' ? '0' : repChar;
                        diff[i] = (+diff[i] + 1) + '';
                    }
                });

                elem.textContent = res.join('');


                count++;
                if (count === 10) {
                    clearInterval(animationInterval);
                }
            }
        }

        let animationInterval = setInterval(aminationRec, time / 10);




    };

    const calc = (time, price = 1000) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcItems = calcBlock.querySelectorAll('input.calc-item'),
            calcType = calcBlock.querySelector('.calc-type'),
            calcSquare = calcItems[0],
            calcCount = calcItems[1],
            calcDay = calcItems[2],
            totalValue = calcBlock.querySelector('#total');

        calcItems.forEach((item) => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/\D/);
            });
        });

        const countSum = () => {

            let total = 0,
                countVAlue = 1,
                dayValue;
            const typeValue = +calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countVAlue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value < 5) {

            }

            (calcDay.value && calcDay.value < 5) ? dayValue = 2 : (calcDay.value && calcDay.value < 10) ? dayValue = 1.5 : dayValue = 1;
            
            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countVAlue * dayValue;
            }

            aminateNumbers(totalValue, total, time);
        };

        calcBlock.addEventListener('change', (event) => {
            let target = event.target;
            if (target.matches('.calc-type, .calc-square, .calc-day, .calc-count')) {
                countSum();
            }

        });
    };

    calc(1000);

    
});