/**
 * API de découverte des équipements Jeedom.
 * Prépare les méthodes de découverte sans exécuter de requête réseau réelle sans configuration.
 */
export class DiscoveryAPI {
  /**
   * Crée une instance de l'API de découverte.
   * @param {object} [options={}] Configuration de l'instance.
   * @param {string} [options.url=''] URL de base Jeedom.
   * @param {string} [options.apiKey=''] Clé API Jeedom.
   */
  constructor(options = {}) {
    this.url = options.url || '';
    this.apiKey = options.apiKey || '';
  }

  /**
   * Prépare la découverte des équipements.
   * @returns {Promise<object>}
   */
  async discoverDevices() {
    if (!this.url || !this.apiKey) {
      return { ok: false, message: 'Configuration Jeedom manquante pour la découverte' };
    }
    return { ok: true, message: 'Découverte des équipements prête' };
  }

  /**
   * Prépare la découverte des commandes.
   * @returns {Promise<object>}
   */
  async discoverCommands() {
    if (!this.url || !this.apiKey) {
      return { ok: false, message: 'Configuration Jeedom manquante pour la découverte des commandes' };
    }
    return { ok: true, message: 'Découverte des commandes prête' };
  }

  /**
   * Prépare la liste des types d'équipements supportés.
   * @returns {Promise<Array<string>>}
   */
  async getDeviceTypes() {
    return ['thermostat', 'heating', 'shutter', 'light', 'sensor', 'security', 'gate'];
  }
}

export default DiscoveryAPI;
