/**
 * Façade logicielle interne pour l'accès aux données Dodo Home.
 * Fournit une interface simple entre le futur dashboard et le fournisseur de données.
 */
export class DodoHomeAPI {
  /**
   * Crée une instance de la façade API interne.
   * @param {object} [options={}] Options de configuration.
   * @param {object} [options.provider] Fournisseur de données du dashboard.
   */
  constructor(options = {}) {
    this.provider = options.provider || null;
  }

  /**
   * Retourne la vue complète du dashboard.
   * @returns {object}
   */
  getDashboard() {
    return this.buildResponse('READY', this.provider ? this.provider.getDashboard() : {});
  }

  /**
   * Retourne l'état système synthétisé.
   * @returns {object}
   */
  getSystemStatus() {
    return this.buildResponse('READY', this.provider && typeof this.provider.loadSystemStatus === 'function' ? this.provider.loadSystemStatus() : {});
  }

  /**
   * Retourne les pièces et leur mapping.
   * @returns {object}
   */
  getRooms() {
    return this.buildResponse('READY', this.provider && typeof this.provider.loadRooms === 'function' ? this.provider.loadRooms() : []);
  }

  /**
   * Retourne les équipements préparés pour le dashboard.
   * @returns {object}
   */
  getEquipment() {
    return this.buildResponse('READY', this.provider && typeof this.provider.loadEquipment === 'function' ? this.provider.loadEquipment() : []);
  }

  /**
   * Retourne les scènes préparées.
   * @returns {object}
   */
  getScenes() {
    return this.buildResponse('READY', this.provider && typeof this.provider.loadScenes === 'function' ? this.provider.loadScenes() : []);
  }

  /**
   * Retourne les événements disponibles.
   * @returns {object}
   */
  getEvents() {
    return this.buildResponse('READY', this.provider && typeof this.provider.loadEvents === 'function' ? this.provider.loadEvents() : []);
  }

  /**
   * Retourne l'historique et les statistiques synthétiques.
   * @returns {object}
   */
  getHistory() {
    return this.buildResponse('READY', this.provider && typeof this.provider.loadHistory === 'function' ? this.provider.loadHistory() : {});
  }

  /**
   * Retourne un résumé compact du dashboard.
   * @returns {object}
   */
  getSummary() {
    return this.buildResponse('READY', this.provider && typeof this.provider.getSummary === 'function' ? this.provider.getSummary() : {});
  }

  /**
   * Construit une réponse standardisée pour l'API interne.
   * @param {string} [status='READY'] Statut de la réponse.
   * @param {object|Array} [data={}] Données à retourner.
   * @returns {object}
   */
  buildResponse(status = 'READY', data = {}) {
    return {
      status,
      data,
      timestamp: new Date().toISOString(),
    };
  }
}

export default DodoHomeAPI;
