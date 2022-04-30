class ViewMVC {
	constructor(ctrl, model) {
		this.ctrl = ctrl;
		this.model = model;
		this.target = document.querySelector('mvc');
		this.rootElement = document.createElement('div');
		this.rootElement.classList.add('mvc');
		this.rootElement.innerHTML = this.template;
		this.ul = this.rootElement.querySelector('ul');
		this.input = this.rootElement.querySelector('#input-search');
	}

	update() {
		this.ul.innerHTML = this.films;
	}

	render() {
		this.target.replaceWith(this.rootElement);
	}

	mount() {
		this.render();
		this.input.addEventListener('input', (e) => this.ctrl.onInput(e.target.value));
	}

	get films() {
		return this.model.filteredFilms.map(item => `<li>${item}</li>`).join('');
	}

	get template() {
		return `
			<label for="input-search">Поиск по названию:</label>
			<input type="text" id="input-search"/>

			<ul>
				${this.films}
			</ul>
		`;
	}
}

class ModelMVC {
	constructor() {
		this.film = '';
		this.films = [
			'John Wick',
			'Terminator',
			'Star Wars',
			'Back to Future',
			'Matrix',
			'Jurassic World',
			'Batman',
			'Ivan Vasilevich Menyaet Profession'
		];
	}

	setFilm(name) {
		this.film = name.toLowerCase();
	}

	get filteredFilms() {
		return this.films.filter(film => film.toLowerCase().includes(this.film))
	}
}

class ControllerMVC {
	constructor() {
		this.model = new ModelMVC(this);
		this.view = new ViewMVC(this, this.model);
	}

	onInput(str) {
		this.model.setFilm(str);
		this.view.update();
	}

	mount() {
		this.view.mount();
	}
}

const mvc = new ControllerMVC();

mvc.mount();
