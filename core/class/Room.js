/**
 * Modèle générique de pièce pour l'abstraction Jeedom.
 */
export class Room {
  /**
   * Crée une pièce.
   * @param {object} [data={}] Données d'initialisation.
   * @param {string|number} [data.id=''] Identifiant de la pièce.
   * @param {string} [data.name=''] Nom de la pièce.
   * @param {Array<object>} [data.devices=[]] Liste des équipements de la pièce.
   */
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.devices = data.devices || [];
  }

  /**
   * Ajoute un équipement à la pièce.
   * @param {object} device Équipement à ajouter.
   * @returns {Room}
   */
  addDevice(device) {
    this.devices.push(device);
    return this;
  }

  /**
   * Supprime un équipement de la pièce.
   * @param {object} device Équipement à supprimer.
   * @returns {Room}
   */
  removeDevice(device) {
    this.devices = this.devices.filter((item) => item !== device);
    return this;
  }

  /**
   * Sérialise la pièce.
   * @returns {object}
   */
  serialize() {
    return {
      id: this.id,
      name: this.name,
      devices: this.devices,
    };
  }
}

export default Room;
