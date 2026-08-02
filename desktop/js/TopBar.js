/**
 * Composant de barre supérieure vide pour l'interface desktop.
 */
export class TopBar {
  /**
   * Crée la barre supérieure.
   * @param {object} [options={}] Options du composant.
   * @param {import('../../core/js/Store.js').Store} [options.store] Instance du store partagé.
   * @param {import('../../core/js/Router.js').Router} [options.router] Instance du routeur partagé.
   */
  constructor(options = {}) {
    this.store = options.store;
    this.router = options.router;
  }

  /**
   * Rend la barre supérieure.
   * @returns {HTMLElement}
   */
  render() {
    const topBar = document.createElement('header');
    topBar.className = 'topbar';
    return topBar;
  }
}

export default TopBar;
