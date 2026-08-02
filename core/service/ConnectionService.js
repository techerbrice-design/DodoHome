/**
 * Service de gestion de connexion avec Jeedom.
 * Prépare la vérification de configuration et le test de connexion sans appel réseau réel.
 */
import { JeedomConfig } from '../config/JeedomConfig.js';
import { JeedomAPI } from '../api/JeedomAPI.js';

export class ConnectionService {
  /**
   * Crée une instance du service de connexion.
   * @param {object} [options={}] Options du service.
   * @param {JeedomConfig} [options.config] Configuration Jeedom.
   * @param {JeedomAPI} [options.api] API Jeedom.
   */
  constructor(options = {}) {
    this.config = options.config || new JeedomConfig();
    this.api = options.api || new JeedomAPI();
    this.status = 'DISCONNECTED';
  }

  /**
   * Initialise le service et prépare la configuration.
   * @returns {ConnectionService}
   */
  initialize() {
    this.status = 'DISCONNECTED';
    return this;
  }

  /**
   * Vérifie si la configuration Jeedom est présente.
   * @returns {boolean}
   */
  checkConfiguration() {
    const url = this.config.get('url', '');
    const apiKey = this.config.get('apiKey', '');
    return Boolean(url && apiKey);
  }

  /**
   * Prépare un test de connexion sans exécution réseau réelle.
   * @returns {Promise<string>}
   */
  async testConnection() {
    if (!this.checkConfiguration()) {
      this.status = 'CONFIGURED';
      return this.status;
    }

    this.status = 'CONNECTED';
    return this.status;
  }

  /**
   * Retourne l'état courant du service.
   * @returns {string}
   */
  getStatus() {
    return this.status;
  }
}

export default ConnectionService;
