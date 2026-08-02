/*
 * Script JavaScript de l'interface desktop de DodoHome.
 * Prépare le lien avec le connecteur de données du dashboard.
 */
import { DodoHomeAPI } from '../../core/api/DodoHomeAPI.js';
import { DashboardConnector } from './DashboardConnector.js';

export class DodoHome {
  /**
   * Crée l'instance de l'application desktop.
   * @param {object} [options={}] Options de configuration.
   */
  constructor(options = {}) {
    this.api = options.api || new DodoHomeAPI();
    this.connector = options.connector || new DashboardConnector({ api: this.api });
  }

  /**
   * Initialise la connexion au fournisseur de données.
   * @returns {Promise<object>}
   */
  async init() {
    return this.connector.connect();
  }
}

export default DodoHome;

