/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
window.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabcontent');
  const itemsClickContainer = document.querySelector('.tabheader__items');
  const itemsTab = itemsClickContainer.querySelectorAll('.tabheader__item');
  hideSlides();
  showContent(0);
  itemsClickContainer.addEventListener('click', e => {
    if (e.target && e.target.matches('div.tabheader__item')) {
      itemsTab.forEach((item, i) => {
        if (item === e.target) {
          hideSlides();
          showContent(i);
        }
      });
    }
  });

  function hideSlides() {
    tabs.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
      itemsTab.forEach(item => {
        item.classList.remove('tabheader__item_active');
      });
    });
  }

  function showContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabs[i].classList.add('show', 'fade');
    tabs[i].classList.remove('hide');
    itemsTab[i].classList.add('tabheader__item_active');
  } //Timer


  const stampEnd = new Date(2022, 6, 25);
  getRemain();

  function getRemain() {
    const stampNow = new Date();
    const diff = stampEnd.getTime() - stampNow.getTime();
    const seconds = Math.floor(diff / 1000 % 60);
    const minutes = Math.floor(diff / 1000 / 60 % 60);
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60 % 24);
    diff <= 0 ? drawTime(0, 0, 0, 0) : drawTime(days, hours, minutes, seconds);
    const timeout = setTimeout(() => {
      if (diff > 0) {
        setTimeout(getRemain, 4);
      } else {
        clearTimeout(timeout);
        drawTime(0, 0, 0, 0);
      }
    }, 1000);
  }

  function drawTime(days, hours, minutes, seconds) {
    const daysBlock = document.querySelector('#days');
    const hoursBlock = document.querySelector('#hours');
    const minutesBlock = document.querySelector('#minutes');
    const secondsBlock = document.querySelector('#seconds');
    daysBlock.textContent = stringifyNumber(days);
    hoursBlock.textContent = stringifyNumber(hours);
    minutesBlock.textContent = stringifyNumber(minutes);
    secondsBlock.textContent = stringifyNumber(seconds);
  }

  function stringifyNumber(number) {
    let str = number.toString();

    if (str.length < 2) {
      str = `0${str}`;
    }

    return str;
  }
});
/******/ })()
;
//# sourceMappingURL=script.js.map