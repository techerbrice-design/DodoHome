/**
 * Vue métier de l'énergie.
 */
export class EnergyView {
  /**
   * Crée une instance de la vue énergie.
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
    container.className = 'view-energy';
    const title = document.createElement('h3');
    title.textContent = 'Energy';
    const content = document.createElement('p');
    content.textContent = this.data.energy || 'Synthèse énergie';
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

export default EnergyView;
