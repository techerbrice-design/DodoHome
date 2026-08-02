/**
 * Vue métier des pièces.
 */
export class RoomsView {
  /**
   * Crée une instance de la vue pièces.
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
    container.className = 'view-rooms';
    const title = document.createElement('h3');
    title.textContent = 'Rooms';
    const list = document.createElement('p');
    list.textContent = this.data.rooms || 'Zones disponibles';
    container.appendChild(title);
    container.appendChild(list);
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

export default RoomsView;
