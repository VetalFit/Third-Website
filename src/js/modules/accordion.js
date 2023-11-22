export default class Accrordion {
	constructor(btns) {
		this.btns = document.querySelectorAll(btns);
	}

	init() {
		this.btns.forEach(btn => {
			btn.addEventListener('click', function () {
				const sibling = btn.closest('.module__info-show').nextElementSibling;

				sibling.classList.add('animated', 'fadeIn');
				sibling.classList.toggle('msg');
				sibling.style.marginTop = '20px';
			});
		});
	}
}