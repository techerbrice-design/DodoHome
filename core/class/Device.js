/**
 * Modèle générique d'équipement pour l'abstraction Jeedom.
 */
export class Device {
  /**
   * Crée un équipement.
   * @param {object} [data={}] Données d'initialisation.
   * @param {string|number} [data.id=''] Identifiant de l'équipement.
   * @param {string} [data.name=''] Nom de l'équipement.
   * @param {string} [data.type='unknown'] Type d'équipement.
   * @param {string|number} [data.room=''] Pièce associée.
   * @param {Array<object>} [data.commands=[]] Liste des commandes liées.
   * @param {string} [data.status='unknown'] Statut courant.
   */
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.type = data.type || 'unknown';
    this.room = data.room || '';
    this.commands = data.commands || [];
    this.status = data.status || 'unknown';
  }

  /**
   * Met à jour les propriétés de l'équipement.
   * @param {object} data Nouvelles données.
   * @returns {Device}
   */
  update(data) {
    Object.assign(this, data);
    return this;
  }

  /**
   * Sérialise l'équipement.
   * @returns {object}
   */
  serialize() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      room: this.room,
      commands: this.commands,
      status: this.status,
    };
  }
}

export default Device;
