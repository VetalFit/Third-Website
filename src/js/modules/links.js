export default class Links {
	constructor() {
		this.btns = document.querySelectorAll('.btn');
		this.return = document.querySelector('.sidecontrol >a');
	}

	init() {
		this.btns.forEach(btn => {
			btn.addEventListener('click', () => {
				window.location.href = 'modules.html#';
			});
		})

		this.return.addEventListener('click', () => {
			window.location.href = 'index.html#';
		});

		document.addEventListener('keydown', (e) => {
			if (e.code === "Escape") {
				window.location.href = 'index.html#';
			};
		});
	}
}