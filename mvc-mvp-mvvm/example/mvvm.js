class ViewMVVM {
	constructor() {
		this.mvvm = new ViewModel(this);
		this.target = document.querySelector('mvvm');
		this.rootElement = document.createElement('div');
		this.rootElement.classList.add('mvvm');
		this.rootElement.innerHTML = this.template;
		this.ul = this.rootElement.querySelector('ul');
		this.input = this.rootElement.querySelector('#input-search-mvvm');
	}

	update() {
		this.ul.innerHTML = this.films;
	}

	render() {
		this.target.replaceWith(this.rootElement);
	}

	mount() {
		this.render();
		this.input.addEventListener('input', (e) => this.onInput(e.target.value));
	}

	onInput(name) {
		this.model.film = name;
	}

	get filteredFilms() {
		return this.model.films.filter(film => film.toLowerCase().includes(this.model.film.toLowerCase()));
	}


	get films() {
		return this.filteredFilms.map(item => `<li>${item}</li>`).join('');
	}

	get template() {
		return `
			<label for="input-search">Поиск по названию:</label>
			<input type="text" id="input-search-mvvm"/>

			<ul>
				${this.films}
			</ul>
		`;
	}
}

class ModelMVVM {
	constructor() {
		this.state = {
			film: '',
			films: [
				'John Wick',
				'Terminator',
				'Star Wars',
				'Back to Future',
				'Matrix',
				'Jurassic World',
                'Vue 3'
			]
		};
	}
}

class ViewModel {
	constructor(view) {
		this.view = view;
        this.view.model = {};
		this.model = new ModelMVVM();

        Object.keys(this.model.state).forEach((key) => {
            Object.defineProperty(this.view.model, key, {
                get: () => this.model.state[key],

                set: (val) => {
                    this.model.state[key] = val;
                    this.view.update();
                },
            });
        });
	}
}

const mvvm = new ViewMVVM();

mvvm.mount();
