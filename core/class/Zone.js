/**
 * Modèle représentant une zone fonctionnelle de la maison.
 */
export class Zone {
  /**
   * Crée une zone.
   * @param {object} [data={}] Données d'initialisation.
   * @param {string|number} [data.id=''] Identifiant de la zone.
   * @param {string} [data.name='Zone'] Nom de la zone.
   * @param {string} [data.type='general'] Type de zone.
   * @param {Array<object>} [data.rooms=[]] Pièces associées.
   */
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || 'Zone';
    this.type = data.type || 'general';
    this.rooms = data.rooms || [];
  }

  /**
   * Ajoute une pièce à la zone.
   * @param {object} room Pièce à associer.
   * @returns {Zone}
   */
  addRoom(room) {
    this.rooms.push(room);
    return this;
  }

  /**
   * Sérialise la zone.
   * @returns {object}
   */
  serialize() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      rooms: this.rooms,
    };
  }
}

export default Zone;
