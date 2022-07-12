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
	})

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
})

