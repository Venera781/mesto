class Section {
  constructor({ renderer }, elSelector) {
    this._renderer = renderer;
    this._parentEl = document.querySelector(elSelector);
  }

  addItem(element) {
    this._parentEl.prepend(element);
  }

  render(items) {
    items.forEach((item) => { 
      this._renderer(item);
    })
  }
}

export default Section;
