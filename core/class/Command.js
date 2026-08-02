/**
 * Modèle générique de commande pour l'abstraction Jeedom.
 */
export class Command {
  /**
   * Crée une commande.
   * @param {object} [data={}] Données d'initialisation.
   * @param {string|number} [data.id=''] Identifiant de la commande.
   * @param {string} [data.name=''] Nom de la commande.
   * @param {string} [data.type='unknown'] Type de commande.
   * @param {any} [data.value=null] Valeur courante.
   * @param {string} [data.unit=''] Unité associée.
   */
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.type = data.type || 'unknown';
    this.value = data.value ?? null;
    this.unit = data.unit || '';
  }

  /**
   * Met à jour les propriétés de la commande.
   * @param {object} data Nouvelles données.
   * @returns {Command}
   */
  update(data) {
    Object.assign(this, data);
    return this;
  }

  /**
   * Sérialise la commande.
   * @returns {object}
   */
  serialize() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      value: this.value,
      unit: this.unit,
    };
  }
}

export default Command;
