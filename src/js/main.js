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
			})
		}
	});

	function hideSlides() {
		tabs.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
			itemsTab.forEach(item => {
				item.classList.remove('tabheader__item_active');
			})
		})
	}

	function showContent(i = 0) {
		tabs[i].classList.add('show', 'fade');
		tabs[i].classList.remove('hide');
		itemsTab[i].classList.add('tabheader__item_active');
	}


	//Timer
	const stampEnd = new Date(2022, 6, 25);

	getRemain();

	function getRemain() {
		const stampNow = new Date();
		const diff = stampEnd.getTime() - stampNow.getTime();
		const seconds = Math.floor((diff / 1000) % 60);
		const minutes = Math.floor((diff / 1000 / 60) % 60);
		const days = Math.floor((diff / 1000 / 60 / 60 / 24));
		const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
		diff <= 0 ? drawTime(0, 0, 0, 0) :
			drawTime(days, hours, minutes, seconds);
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
			str = `0${str}`
		}
		return str;
	}

	// Modal

	const contactBtns = document.querySelectorAll('[data-modal]');
	const closeModalBtn = document.querySelector('[data-close]');
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
		item.addEventListener('click', (e) => {
			if (e.target) {
				e.preventDefault();
				openModal(modal);
			}
		})
	});

	closeModalBtn.addEventListener('click', (e) => {
		if (e.target) {
			e.preventDefault();
			closeModal(modal);
		}
	});

	modal.addEventListener('click', (e) => {
		if (e.target) {
			closeModal(modal);
		}
	});

	document.addEventListener('keyup', (e) => {
		if (modal.classList.contains('show') && e.code === 'Escape') {
			closeModal(modal);
		}
	});

	const modalTimerId = setTimeout(openModal, 30000, modal);

	window.addEventListener('scroll', () => {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight-1 && !isShowed) {
			openModal(modal);
		}
	});

});


