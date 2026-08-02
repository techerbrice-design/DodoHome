/**
 * Composant de barre latérale vide pour l'interface desktop.
 */
export class Sidebar {
  /**
   * Crée la barre latérale.
   * @param {object} [options={}] Options du composant.
   * @param {import('../../core/js/Store.js').Store} [options.store] Instance du store partagé.
   * @param {import('../../core/js/Router.js').Router} [options.router] Instance du routeur partagé.
   */
  constructor(options = {}) {
    this.store = options.store;
    this.router = options.router;
  }

  /**
   * Rend la barre latérale.
   * @returns {HTMLElement}
   */
  render() {
    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';
    return sidebar;
  }
}

export default Sidebar;
