export default class Forms {
	constructor(forms) {
		this.forms = document.querySelectorAll(forms);
		this.inputs = document.querySelectorAll('input');
		this.message = {
			loading: 'Загрузка...',
			succsess: 'Спасибо! Скоро мы с вами свяжемся!',
			failure: 'Что-то пошло не так...'
		};
		this.path = 'assets/question.php';
	}

	clearInputs() {
		this.inputs.forEach(item => {
			item.value = '';
		});
	}

	toggleBtn(boolean) {
		this.forms.forEach((form) => {
			let btn = form.querySelector('.btn');
			btn.disabled = boolean;
		});
	}

	checkInputsEmptyWarning() {
		this.inputs.forEach((input) => {
			input.addEventListener('blur', () => {
				if (input.value.trim() === '') {
					input.style.border = '1px solid red';
					input.placeholder = 'please add text';
					this.toggleBtn(true);
				} else {
					input.placeholder = '';
					input.style.border = '';
					this.toggleBtn(false);
				}
			});
		});
	}

	checkMailInputs() {
		const mailInputs = document.querySelectorAll('[type="email"]');

		mailInputs.forEach(input => {
			input.addEventListener('keypress', function (e) {
				if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
					e.preventDefault();
				}
			});
		});
	};

	initMask() {

		let setCursorPosition = (pos, elem) => {
			elem.focus();

			if (elem.setSelectionRange) {
				elem.setSelectionRange(pos, pos);
			} else if (elem.createTextRange) {
				let range = elem.createTextRange();

				range.collapse(true);
				range.moveEnd('character', pos);
				range.moveStart('character', pos);
				range.select();
			}
		};

		function createMask(event) {
			let matrix = '+1 (___) ___-___',
				i = 0,
				def = matrix.replace(/\D/g, ''),
				val = this.value.replace(/\D/g, '')

			if (def.length >= val.length) {
				val = def;
			}

			this.value = matrix.replace(/./g, function (a) {
				return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
			});

			if (event.type === 'blur') {
				if (this.value.length == 2) {
					this.value = '';
				}
			} else {
				setCursorPosition(this.value.length, this);
			}
		}

		let inputs = document.querySelectorAll('[name="phone"]');

		inputs.forEach(input => {
			input.addEventListener('input', createMask);
			input.addEventListener('focus', createMask);
			input.addEventListener('blure', createMask);
		});
	};

	async postData(url, data) {
		let res = await fetch(url, {
			method: 'POST',
			body: data
		});

		return await res.text();
	};

	init() {
		this.checkMailInputs();
		this.checkInputsEmptyWarning();
		this.initMask();

		this.forms.forEach(item => {
			item.addEventListener('submit', (e) => {
				e.preventDefault();

				let statusMesssage = document.createElement('div');
				statusMesssage.style.cssText = `
				margin-top: 15px;
				font-size: 18px;
				color: black;
				`;
				item.parentNode.appendChild(statusMesssage);

				statusMesssage.textContent = this.message.loading;

				const formData = new FormData(item);

				this.postData(this.path, formData)
					.then(res => {
						console.log(res);
						statusMesssage.textContent = this.message.succsess;
					})
					.catch(() => {
						statusMesssage.textContent = this.message.failure;
					})
					.finally(() => {
						this.clearInputs();
						setTimeout(() => {
							statusMesssage.remove();
						}, 5000);
					});
			})
		})
	}
}