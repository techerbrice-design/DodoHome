/**
 * Modèle représentant un étage d'une habitation.
 */
export class Floor {
  /**
   * Crée un étage.
   * @param {object} [data={}] Données d'initialisation.
   * @param {string|number} [data.id=''] Identifiant de l'étage.
   * @param {string} [data.name='Étage'] Nom de l'étage.
   * @param {number} [data.level=0] Niveau de l'étage.
   * @param {Array<object>} [data.rooms=[]] Pièces de l'étage.
   */
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || 'Étage';
    this.level = data.level ?? 0;
    this.rooms = data.rooms || [];
  }

  /**
   * Ajoute une pièce à l'étage.
   * @param {object} room Pièce à ajouter.
   * @returns {Floor}
   */
  addRoom(room) {
    this.rooms.push(room);
    return this;
  }

  /**
   * Supprime une pièce de l'étage.
   * @param {object} room Pièce à supprimer.
   * @returns {Floor}
   */
  removeRoom(room) {
    this.rooms = this.rooms.filter((item) => item !== room);
    return this;
  }

  /**
   * Sérialise l'étage.
   * @returns {object}
   */
  serialize() {
    return {
      id: this.id,
      name: this.name,
      level: this.level,
      rooms: this.rooms,
    };
  }
}

export default Floor;
