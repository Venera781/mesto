class Section {
  constructor({ items, renderer }, elSelector) {
    this._items = items;
    this._renderer = renderer;
    this._parentEl = document.querySelector(elSelector);
  }

  addItem(element) {
    this._parentEl.prepend(element);
  }
  
  render() {
    for (let i = 0; i < this._items.length; i++) {
      this.addItem(this._renderer(this._items[i]));
    }
  };
}

export default Section;
