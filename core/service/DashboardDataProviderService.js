/**
 * Service d'agrégation des données internes pour le futur dashboard Dodo Home.
 * Centralise l'état système, les pièces, les équipements, les scènes, les événements et l'historique.
 */
export class DashboardDataProviderService {
  /**
   * Crée une instance du fournisseur de données du dashboard.
   * @param {object} [options={}] Options du service.
   * @param {object} [options.system] Service de statut système.
   * @param {object} [options.rooms] Service de mapping des pièces.
   * @param {object} [options.equipment] Service de prévisualisation d'équipements.
   * @param {object} [options.scenes] Service de moteur de scènes.
   * @param {object} [options.events] Service de moteur d'événements.
   * @param {object} [options.history] Service d'historique.
   */
  constructor(options = {}) {
    this.system = options.system || null;
    this.rooms = options.rooms || null;
    this.equipment = options.equipment || null;
    this.scenes = options.scenes || null;
    this.events = options.events || null;
    this.history = options.history || null;
    this.dashboard = null;
  }

  /**
   * Charge l'état système.
   * @returns {object}
   */
  loadSystemStatus() {
    if (this.system && typeof this.system.getStatus === 'function') {
      return this.system.getStatus();
    }
    return { status: 'OFFLINE', health: 0 };
  }

  /**
   * Charge les pièces et leur mapping.
   * @returns {Array<object>}
   */
  loadRooms() {
    if (this.rooms && typeof this.rooms.mapEquipment === 'function') {
      const result = this.rooms.mapEquipment();
      return result && Array.isArray(result.rooms) ? result.rooms : [];
    }
    return [];
  }

  /**
   * Charge les équipements prévisualisés.
   * @returns {Array<object>}
   */
  loadEquipment() {
    if (this.equipment && typeof this.equipment.generatePreview === 'function') {
      const preview = this.equipment.generatePreview([]);
      return Array.isArray(preview && preview.equipment) ? preview.equipment : [];
    }
    return [];
  }

  /**
   * Charge les scènes disponibles.
   * @returns {Array<object>}
   */
  loadScenes() {
    if (this.scenes && typeof this.scenes.loadScenes === 'function') {
      return this.scenes.loadScenes();
    }
    return [];
  }

  /**
   * Charge les événements enregistrés.
   * @returns {Array<object>}
   */
  loadEvents() {
    if (this.events && typeof this.events.getEvents === 'function') {
      return this.events.getEvents();
    }
    return [];
  }

  /**
   * Charge l'historique et les statistiques.
   * @returns {object}
   */
  loadHistory() {
    if (this.history && typeof this.history.getSummary === 'function') {
      return this.history.getSummary();
    }
    return { status: 'EMPTY', summary: {}, timeline: [] };
  }

  /**
   * Construit la structure complète du dashboard.
   * @returns {object}
   */
  buildDashboard() {
    const system = this.loadSystemStatus();
    const rooms = this.loadRooms();
    const equipment = this.loadEquipment();
    const scenes = this.loadScenes();
    const events = this.loadEvents();
    const history = this.loadHistory();

    this.dashboard = {
      status: this.resolveStatus(system),
      system,
      rooms,
      equipment,
      scenes,
      events,
      history,
      summary: this.getSummary({ system, rooms, equipment, scenes, events, history }),
    };

    return this.dashboard;
  }

  /**
   * Retourne la structure du dashboard compilée.
   * @returns {object}
   */
  getDashboard() {
    if (!this.dashboard) {
      return this.buildDashboard();
    }
    return this.dashboard;
  }

  /**
   * Génère un résumé du dashboard.
   * @param {object} [data={}] Données à résumer.
   * @returns {object}
   */
  getSummary(data = {}) {
    const system = data.system || {};
    const rooms = Array.isArray(data.rooms) ? data.rooms : [];
    const equipment = Array.isArray(data.equipment) ? data.equipment : [];
    const scenes = Array.isArray(data.scenes) ? data.scenes : [];
    const events = Array.isArray(data.events) ? data.events : [];
    const history = data.history || {};

    return {
      rooms: rooms.length,
      equipment: equipment.length,
      activeScenes: scenes.filter((scene) => scene && scene.status === 'READY').length,
      events: events.length,
      health: Number(system.health || 0),
    };
  }

  /**
   * Détermine le statut global du dashboard.
   * @param {object} system État système.
   * @returns {string}
   */
  resolveStatus(system = {}) {
    if (!system || typeof system !== 'object') {
      return 'OFFLINE';
    }

    if (system.status === 'READY') {
      return 'READY';
    }

    if (system.status === 'WARNING') {
      return 'WARNING';
    }

    if (system.status === 'ERROR') {
      return 'ERROR';
    }

    return 'OFFLINE';
  }
}

export default DashboardDataProviderService;
