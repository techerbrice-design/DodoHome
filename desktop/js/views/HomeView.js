/**
 * Vue métier générale de la maison.
 */
export class HomeView {
  /**
   * Crée une instance de la vue home.
   * @param {object} [data={}] Données de la vue.
   */
  constructor(data = {}) {
    this.data = data || {};
  }

  /**
   * Définit les données de la vue.
   * @param {object} [data={}] Nouvelles données.
   */
  setData(data = {}) {
    this.data = data || {};
  }

  /**
   * Rend la vue sous forme d'élément DOM.
   * @returns {HTMLElement}
   */
  render() {
    const container = document.createElement('section');
    container.className = 'view-home';
    const title = document.createElement('h3');
    title.textContent = 'Home';
    const summary = document.createElement('p');
    summary.textContent = this.data.summary || 'Résumé général maison';
    container.appendChild(title);
    container.appendChild(summary);
    return container;
  }

  /**
   * Retourne l'état courant de la vue.
   * @returns {string}
   */
  getState() {
    return this.data.state || 'READY';
  }
}

export default HomeView;
