/**
 * Modèle représentant une habitation connectée complète.
 */
export class Home {
  /**
   * Crée une maison.
   * @param {object} [data={}] Données d'initialisation.
   * @param {string|number} [data.id=''] Identifiant de la maison.
   * @param {string} [data.name='Maison'] Nom de la maison.
   * @param {Array<object>} [data.floors=[]] Étages de la maison.
   * @param {Array<object>} [data.rooms=[]] Pièces de la maison.
   * @param {Array<object>} [data.zones=[]] Zones fonctionnelles.
   * @param {Array<object>} [data.scenes=[]] Scènes domotiques.
   */
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || 'Maison';
    this.floors = data.floors || [];
    this.rooms = data.rooms || [];
    this.zones = data.zones || [];
    this.scenes = data.scenes || [];
  }

  /**
   * Ajoute un étage à la maison.
   * @param {object} floor Étage à ajouter.
   * @returns {Home}
   */
  addFloor(floor) {
    this.floors.push(floor);
    return this;
  }

  /**
   * Supprime un étage de la maison.
   * @param {object} floor Étage à supprimer.
   * @returns {Home}
   */
  removeFloor(floor) {
    this.floors = this.floors.filter((item) => item !== floor);
    return this;
  }

  /**
   * Ajoute une pièce à la maison.
   * @param {object} room Pièce à ajouter.
   * @returns {Home}
   */
  addRoom(room) {
    this.rooms.push(room);
    return this;
  }

  /**
   * Recherche une pièce par son identifiant.
   * @param {string|number} id Identifiant de la pièce.
   * @returns {object|null}
   */
  findRoom(id) {
    return this.rooms.find((room) => room.id === id) || null;
  }

  /**
   * Sérialise la maison.
   * @returns {object}
   */
  serialize() {
    return {
      id: this.id,
      name: this.name,
      floors: this.floors,
      rooms: this.rooms,
      zones: this.zones,
      scenes: this.scenes,
    };
  }
}

export default Home;
