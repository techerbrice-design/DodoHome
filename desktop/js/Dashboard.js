/**
 * Composant de page d'accueil vide pour l'interface desktop.
 */
export class Dashboard {
  /**
   * Crée le tableau de bord.
   * @param {object} [options={}] Options du composant.
   * @param {import('../../core/js/Store.js').Store} [options.store] Instance du store partagé.
   * @param {import('../../core/js/Router.js').Router} [options.router] Instance du routeur partagé.
   */
  constructor(options = {}) {
    this.store = options.store;
    this.router = options.router;
  }

  /**
   * Rend la page d'accueil.
   * @returns {HTMLElement}
   */
  render() {
    const dashboard = document.createElement('main');
    dashboard.className = 'dashboard';
    const title = document.createElement('h1');
    title.textContent = 'Bienvenue dans Dodo Home';
    dashboard.appendChild(title);
    return dashboard;
  }
}

export default Dashboard;
