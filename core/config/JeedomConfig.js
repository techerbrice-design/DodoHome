/**
 * Configuration de base pour la connexion à Jeedom.
 * Prépare les paramètres de connexion sans effectuer d'appel réseau.
 */
export class JeedomConfig {
  /**
   * Crée une instance de configuration Jeedom.
   * @param {object} [initialConfig={}] Valeurs de configuration initiales.
   */
  constructor(initialConfig = {}) {
    this.defaults = {
      url: '',
      apiKey: '',
      timeout: 5000,
      connection: {
        enabled: false,
        mode: 'disabled',
      },
    };
    this.config = { ...this.defaults, ...initialConfig };
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

  /**
   * Réinitialise la configuration aux valeurs par défaut.
   * @returns {object}
   */
  reset() {
    this.config = { ...this.defaults };
    return this.config;
  }
}

export default JeedomConfig;
