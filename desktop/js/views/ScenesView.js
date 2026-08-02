/**
 * Vue métier des scènes.
 */
export class ScenesView {
  /**
   * Crée une instance de la vue scènes.
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
    container.className = 'view-scenes';
    const title = document.createElement('h3');
    title.textContent = 'Scenes';
    const content = document.createElement('p');
    content.textContent = this.data.scenes || 'Scènes disponibles';
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

export default ScenesView;
