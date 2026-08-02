/**
 * Vue métier de l'historique.
 */
export class HistoryView {
  /**
   * Crée une instance de la vue historique.
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
    container.className = 'view-history';
    const title = document.createElement('h3');
    title.textContent = 'History';
    const content = document.createElement('p');
    content.textContent = this.data.history || 'Événements récents';
    container.appendChild(title);
    container.appendChild(content);
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

export default HistoryView;
