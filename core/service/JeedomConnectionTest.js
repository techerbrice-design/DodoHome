/**
 * Service de test de connexion Jeedom en lecture seule.
 * Charge la configuration locale et vérifie la disponibilité de Jeedom sans exposer de secrets.
 */
import { ConnectionService } from './ConnectionService.js';
import { JeedomConfig } from '../config/JeedomConfig.js';

export class JeedomConnectionTest {
  /**
   * Crée une instance du test de connexion.
   * @param {object} [options={}] Options du service.
   * @param {JeedomConfig} [options.config] Configuration locale Jeedom.
   * @param {ConnectionService} [options.connectionService] Service de connexion.
   */
  constructor(options = {}) {
    this.config = options.config || new JeedomConfig();
    this.connectionService = options.connectionService || new ConnectionService({ config: this.config });
  }

  /**
   * Exécute le test de connexion.
   * @returns {Promise<{success: boolean, status: string, message: string}>}
   */
  async run() {
    this.connectionService.initialize();

    if (!this.checkUrl()) {
      return {
        success: false,
        status: 'ERROR',
        message: 'URL Jeedom absente ou invalide.',
      };
    }

    if (!this.checkApi()) {
      return {
        success: false,
        status: 'ERROR',
        message: 'Clé API Jeedom absente.',
      };
    }

    const status = await this.connectionService.testConnection();
    return {
      success: status === 'CONNECTED',
      status,
      message: status === 'CONNECTED' ? 'Connexion Jeedom prête pour une lecture seule.' : 'Connexion non disponible.',
    };
  }

  /**
   * Vérifie la présence d'une URL Jeedom.
   * @returns {boolean}
   */
  checkUrl() {
    const url = this.config.get('url', '');
    return typeof url === 'string' && url.trim().length > 0;
  }

  /**
   * Vérifie la présence d'une clé API Jeedom.
   * @returns {boolean}
   */
  checkApi() {
    const apiKey = this.config.get('apiKey', '');
    return typeof apiKey === 'string' && apiKey.trim().length > 0;
  }
}

export default JeedomConnectionTest;
