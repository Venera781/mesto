class Section {
  constructor({ items, renderer }, elSelector) {
    this._items = items;
    this._renderer = renderer;
    this._parentEl = document.querySelector(elSelector);
  }

  addItem(cardItem) {
    this._renderer(cardItem, this._parentEl);
  }

  render() {
    for (let i = 0; i < this._items.length; i++) {
      this.addItem(this._items[i]);
    }
  };
}

export default Section;
