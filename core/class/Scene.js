/**
 * Modèle représentant une scène domotique.
 */
export class Scene {
  /**
   * Crée une scène.
   * @param {object} [data={}] Données d'initialisation.
   * @param {string|number} [data.id=''] Identifiant de la scène.
   * @param {string} [data.name='Scène'] Nom de la scène.
   * @param {string} [data.description=''] Description de la scène.
   * @param {Array<object>} [data.actions=[]] Actions associées.
   * @param {boolean} [data.enabled=true] État d'activation.
   */
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || 'Scène';
    this.description = data.description || '';
    this.actions = data.actions || [];
    this.enabled = data.enabled ?? true;
  }

  /**
   * Ajoute une action à la scène.
   * @param {object} action Action à ajouter.
   * @returns {Scene}
   */
  addAction(action) {
    this.actions.push(action);
    return this;
  }

  /**
   * Active la scène.
   * @returns {Scene}
   */
  enable() {
    this.enabled = true;
    return this;
  }

  /**
   * Désactive la scène.
   * @returns {Scene}
   */
  disable() {
    this.enabled = false;
    return this;
  }

  /**
   * Sérialise la scène.
   * @returns {object}
   */
  serialize() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      actions: this.actions,
      enabled: this.enabled,
    };
  }
}

export default Scene;
