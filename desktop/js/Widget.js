/**
 * Composant générique de widget réutilisable pour l'interface desktop.
 */
export class Widget {
  /**
   * Crée une instance de widget.
   * @param {object} [options={}] Options du composant.
   */
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Rend le widget.
   * @returns {HTMLElement}
   */
  render() {
    const widget = document.createElement('div');
    widget.className = 'widget';
    return widget;
  }
}

export default Widget;
