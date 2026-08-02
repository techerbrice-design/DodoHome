/**
 * Gestionnaire de configuration de l'application.
 * Prépare la structure pour le chargement futur des paramètres Jeedom.
 */
export class Config {
  /**
   * Crée une instance de configuration.
   * @param {object} [initialConfig={}] Valeurs de configuration initiales.
   */
  constructor(initialConfig = {}) {
    this.config = { ...initialConfig };
  }

  /**
   * Charge la configuration.
   * @returns {Promise<object>}
   */
  async load() {
    return this.config;
  }

  /**
   * Récupère une valeur de configuration.
   * @param {string} key Clé à lire.
   * @param {any} [defaultValue] Valeur par défaut.
   * @returns {any}
   */
  get(key, defaultValue) {
    return Object.prototype.hasOwnProperty.call(this.config, key) ? this.config[key] : defaultValue;
  }

  /**
   * Définit une valeur de configuration.
   * @param {string} key Clé à modifier.
   * @param {any} value Nouvelle valeur.
   * @returns {object}
   */
  set(key, value) {
    this.config[key] = value;
    return this.config;
  }
}

export default Config;
