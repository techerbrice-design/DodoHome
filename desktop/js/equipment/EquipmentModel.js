/**
 * Modèle générique représentant un équipement simulé.
 */
export class EquipmentModel {
  /**
   * Crée une instance de modèle d'équipement.
   * @param {object} [data={}] Données de l'équipement.
   */
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || 'Équipement';
    this.category = data.category || 'OTHER';
    this.room = data.room || 'Inconnu';
    this.state = data.state || 'READY';
    this.capabilities = Array.isArray(data.capabilities) ? data.capabilities : [];
    this.metadata = data.metadata || {};
  }

  /**
   * Définit l'état de l'équipement.
   * @param {string} state Nouvel état.
   */
  setState(state = 'READY') {
    this.state = state;
    return this.state;
  }

  /**
   * Retourne l'état courant.
   * @returns {string}
   */
  getState() {
    return this.state;
  }

  /**
   * Retourne les capacités de l'équipement.
   * @returns {Array<string>}
   */
  getCapabilities() {
    return this.capabilities;
  }

  /**
   * Convertit le modèle en objet JSON simple.
   * @returns {object}
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      room: this.room,
      state: this.state,
      capabilities: this.capabilities,
      metadata: this.metadata,
    };
  }
}

export default EquipmentModel;
