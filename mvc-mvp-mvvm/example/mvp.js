class ViewMVP {
    constructor() {
        this.presenter = new PresenterMVP(this);
        this.target = document.querySelector('mvp');
        this.rootElement = document.createElement('div');
        this.rootElement.classList.add('mvp');
        this.rootElement.innerHTML = this.template;
        this.ul = this.rootElement.querySelector('ul');
        this.input = this.rootElement.querySelector('#input-search-mvp');
    }

    update() {
        this.ul.innerHTML = this.films;
    }

    render() {
        this.target.replaceWith(this.rootElement);
    }

    mount() {
        this.render();
        this.input.addEventListener('input', (e) => this.presenter.onInput(e.target.value));
    }

    get films() {
        return this.presenter.filteredFilms.map(item => `<li>${item}</li>`).join('');
    }

    get template() {
        return `
			<label for="input-search-vmp">Поиск по названию:</label>
			<input type="text" id="input-search-mvp"/>

			<ul>
				${this.films}
			</ul>
		`;
    }
}

class ModelMVP {
    constructor() {
        this.film = '';
        this.films = [
            'John Wick',
            'Terminator',
            'Star Wars',
            'Back to Future',
            'Matrix',
            'Jurassic World',
        ];
    }

    setFilm(name) {
        this.film = name.toLowerCase();
    }
}

class PresenterMVP {
    constructor(view) {
        this.view = view;
        this.model = new ModelMVP();
    }

    onInput(str) {
        this.model.setFilm(str);
        this.view.update();
    }

    get filteredFilms() {
        return this.model.films.filter(film => film.toLowerCase().includes(this.model.film))
    }
}

const mvp = new ViewMVP();

mvp.mount();
