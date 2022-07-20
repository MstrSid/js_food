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
  } // Modal


  const contactBtns = document.querySelectorAll('[data-modal]');
  const modal = document.querySelector('.modal');
  let isShowed = false;

  function closeModal(element) {
    element.classList.add('hide');
    element.classList.remove('show');
    element.classList.remove('fade');
    document.body.style.overflow = '';
  }

  function openModal(element) {
    element.classList.add('show');
    element.classList.add('fade');
    element.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
    isShowed = true;
  }

  contactBtns.forEach(item => {
    item.addEventListener('click', e => {
      if (e.target) {
        e.preventDefault();
        openModal(modal);
      }
    });
  });
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') === '') {
      closeModal(modal);
    }
  });
  document.addEventListener('keyup', e => {
    if (modal.classList.contains('show') && e.code === 'Escape') {
      closeModal(modal);
    }
  });
  const modalTimerId = setTimeout(openModal, 30000, modal);
  window.addEventListener('scroll', () => {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1 && !isShowed) {
      openModal(modal);
    }
  }); // menu cards

  class CardItem {
    constructor(parentSelector, containerSelector, classItemSelector, img, alt, subtitle, descr, moneyTotal) {
      this.parentSelector = parentSelector;
      this.containerSelector = containerSelector;
      this.classItemSelector = classItemSelector;
      this.img = img;
      this.alt = alt;
      this.subtitle = subtitle;
      this.descr = descr;
      this.moneyTotal = moneyTotal;
    }

    render() {
      const parent = document.querySelector(this.parentSelector);
      const container = parent.querySelector(this.containerSelector);
      const div = document.createElement('div');
      div.classList.add(this.classItemSelector);
      div.innerHTML = `
			 		<img src="img/tabs/${this.img}" alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.moneyTotal}</span> грн/день</div>
                    </div>`;
      container.append(div);
    }

  }

  new CardItem('.menu__field', '.container', 'menu__item', 'vegy.jpg', 'vegy', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 229).render();
  new CardItem('.menu__field', '.container', 'menu__item', 'elite.jpg', 'elite', 'Меню "Премиум"', 'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 550).render();
  new CardItem('.menu__field', '.container', 'menu__item', 'post.jpg', 'post', 'Меню "Постное"', 'Меню "Постное" - это тщательный подбор ингредиентов: полное' + ' отсутствие продуктов животного происхождения, молоко из миндаля,' + ' овса, кокоса или гречки, правильное количество белков за счет тофу' + ' и импортных вегетарианских стейков.', 430).render(); // Forms

  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'icons/spinner.svg',
    success: 'Thank you! We connect with you soon!',
    failure: 'Something went wrong...'
  };
  forms.forEach(item => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const statusMessage = document.createElement('img');
      statusMessage.setAttribute('src', message.loading);
      statusMessage.style.cssText = `
			display: block;
			margin: 0 auto;`;
      form.insertAdjacentElement("afterend", statusMessage);
      const obj = {};
      const formData = new FormData(form);
      formData.forEach((v, k) => {
        obj[k] = v;
      });
      fetch('server.php', {
        method: "POST",
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(obj)
      }).then(response => response.text()).then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
        statusMessage.remove();
      }).finally(() => {
        form.reset();
      });
    });
  }

  function showThanksModal(msg) {
    const prevModal = document.querySelector('.modal__dialog');
    prevModal.classList.add('hide');
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
		<div class="modal__content">
		<div data-close class="modal__close">&times;</div>
		<div class="modal__title">${msg}</div>		
		</div>`;
    document.querySelector('.modal').append(thanksModal);
    openModal(document.querySelector('.modal'));
    openModal(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      closeModal(document.querySelector('.modal'));
      prevModal.classList.remove('hide');
    }, 4000);
  }
});
/******/ })()
;
//# sourceMappingURL=script.js.map