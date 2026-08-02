/**
 * Vue générique représentant une pièce du logement.
 */
export class RoomView {
  /**
   * Crée une instance de la vue pièce.
   * @param {object} [room={}] Données de la pièce.
   */
  constructor(room = {}) {
    this.room = room || {};
    this.equipment = [];
    this.cards = [];
  }

  /**
   * Définit la pièce actuelle.
   * @param {object} [room={}] Données de la pièce.
   */
  setRoom(room = {}) {
    this.room = room || {};
    return this.room;
  }

  /**
   * Définit l'équipement associé à la pièce.
   * @param {Array<object>} [equipment=[]] Équipements.
   */
  setEquipment(equipment = []) {
    this.equipment = Array.isArray(equipment) ? equipment : [];
    return this.equipment;
  }

  /**
   * Ajoute une carte à la vue.
   * @param {object} card Carte à ajouter.
   */
  addCard(card) {
    this.cards.push(card);
    return this.cards;
  }

  /**
   * Rend la vue sous forme d'élément DOM.
   * @returns {HTMLElement}
   */
  render() {
    const container = document.createElement('section');
    container.className = 'room-view';
    const title = document.createElement('h3');
    title.textContent = this.room.name || 'Pièce';
    const floor = document.createElement('p');
    floor.textContent = this.room.floor || 'Étage inconnu';
    container.appendChild(title);
    container.appendChild(floor);
    this.cards.forEach((card) => container.appendChild(card.render ? card.render() : card));
    return container;
  }

  /**
   * Retourne l'état courant de la vue.
   * @returns {string}
   */
  getState() {
    return this.room.status || 'READY';
  }
}

export default RoomView;
