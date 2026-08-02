/**
 * Associe une pièce à un objet SVG du plan interactif.
 */
export class RoomMap {
  /**
   * Crée une association pièce-plan.
   * @param {object} [data={}] Données de l'association.
   * @param {object} [data.room=null] Pièce associée.
   * @param {object} [data.svgObject=null] Objet SVG associé.
   * @param {object} [data.coordinates={}] Coordonnées de l'objet sur le plan.
   */
  constructor(data = {}) {
    this.room = data.room || null;
    this.svgObject = data.svgObject || null;
    this.coordinates = data.coordinates || {};
  }

  /**
   * Lie une pièce à un objet SVG.
   * @param {object} room Pièce à associer.
   * @param {object} svgObject Objet SVG à associer.
   * @returns {RoomMap}
   */
  bind(room, svgObject) {
    this.room = room;
    this.svgObject = svgObject;
    return this;
  }

  /**
   * Sérialise l'association.
   * @returns {object}
   */
  serialize() {
    return {
      room: this.room,
      svgObject: this.svgObject,
      coordinates: this.coordinates,
    };
  }
}

export default RoomMap;
