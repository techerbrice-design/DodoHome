/**
 * Connecteur minimal entre le dashboard existant et la façade DodoHomeAPI.
 * Prépare la récupération des données sans créer d'interface graphique supplémentaire.
 */
export class DashboardConnector {
  /**
   * Crée une instance du connecteur.
   * @param {object} [options={}] Options du connecteur.
   * @param {object} [options.api] Instance de DodoHomeAPI.
   * @param {object} [options.dashboard] Instance du composant Dashboard.
   */
  constructor(options = {}) {
    this.api = options.api || null;
    this.dashboard = options.dashboard || null;
    this.data = {};
    this.status = 'OFFLINE';
    this.lastUpdate = '';
  }

  /**
   * Connecte le dashboard à la couche de données.
   * @returns {Promise<object>}
   */
  async connect() {
    return this.loadData();
  }

  /**
   * Charge les données du dashboard via l'API interne.
   * @returns {Promise<object>}
   */
  async loadData() {
    if (!this.api || typeof this.api.getDashboard !== 'function') {
      this.status = 'ERROR';
      this.data = {};
      this.lastUpdate = new Date().toISOString();
      return this.getData();
    }

    const response = await this.api.getDashboard();
    this.data = response && response.data ? response.data : {};
    this.status = response && response.status === 'READY' ? 'READY' : 'WARNING';
    this.lastUpdate = response && response.timestamp ? response.timestamp : new Date().toISOString();

    if (this.dashboard && typeof this.dashboard.setData === 'function') {
      this.dashboard.setData(this.data);
    }

    return this.getData();
  }

  /**
   * Rafraîchit les données du dashboard.
   * @returns {Promise<object>}
   */
  async refresh() {
    return this.loadData();
  }

  /**
   * Retourne les données chargées.
   * @returns {object}
   */
  getData() {
    return {
      status: this.status,
      data: this.data,
      lastUpdate: this.lastUpdate,
    };
  }

  /**
   * Retourne le statut courant du connecteur.
   * @returns {string}
   */
  getStatus() {
    return this.status;
  }
}

export default DashboardConnector;
