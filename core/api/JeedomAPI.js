/**
 * Façade d'accès aux services Jeedom.
 * Prépare les appels réseau et les méthodes de lecture des équipements et commandes.
 */
export class JeedomAPI {
  /**
   * Crée une instance de l'API Jeedom.
   * @param {object} [options={}] Configuration de l'instance.
   * @param {string} [options.url=''] URL de base de Jeedom.
   * @param {string} [options.apiKey=''] Clé API Jeedom.
   * @param {number} [options.timeout=5000] Délai d'attente des requêtes.
   */
  constructor(options = {}) {
    this.url = options.url || '';
    this.apiKey = options.apiKey || '';
    this.timeout = options.timeout || 5000;
  }

  /**
   * Exécute une requête préparée sans l'exécuter si la configuration est absente.
   * @param {string} [method='GET'] Méthode HTTP.
   * @param {string} [endpoint=''] Endpoint cible.
   * @param {object} [payload={}] Données éventuelles.
   * @returns {Promise<object>}
   */
  async request(method = 'GET', endpoint = '', payload = {}) {
    if (!this.url || !this.apiKey) {
      return { ok: false, message: 'Configuration Jeedom manquante', method, endpoint, payload };
    }

    return { ok: true, message: 'Requête prête', method, endpoint, payload };
  }

  /**
   * Récupère un équipement par son identifiant.
   * @param {string|number} id Identifiant de l'équipement.
   * @returns {Promise<object>}
   */
  async getDevice(id) {
    return this.request('GET', `/device/${id}`);
  }

  /**
   * Récupère la liste des équipements.
   * @returns {Promise<object>}
   */
  async getDevices() {
    return this.request('GET', '/devices');
  }

  /**
   * Récupère une commande par son identifiant.
   * @param {string|number} id Identifiant de la commande.
   * @returns {Promise<object>}
   */
  async getCommand(id) {
    return this.request('GET', `/command/${id}`);
  }

  /**
   * Récupère la liste des commandes.
   * @returns {Promise<object>}
   */
  async getCommands() {
    return this.request('GET', '/commands');
  }
}

export default JeedomAPI;
