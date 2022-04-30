class View {
    constructor(model) {
        this.input = document.querySelector('input');
        this.list = document.querySelector('list');
    }

    renderedList(items) {
        return items.map(item => `<li>${item}</li>`);
    }

    update() {
        this.list.innerHTML = this.renderedList(items);
    }
}