/**
 * Service d'historique et de statistiques Dodo Home en mémoire.
 * Conserve des événements simulés, des changements d'état et des synthèses de fonctionnement.
 */
export class HistoryService {
  /**
   * Crée une instance du service d'historique.
   * @param {object} [options={}] Options du service.
   */
  constructor(options = {}) {
    this.events = [];
    this.states = [];
    this.statistics = [];
    this.timeline = [];
    this.options = options;
  }

  /**
   * Ajoute un événement à l'historique.
   * @param {object} event Événement à enregistrer.
   * @returns {object}
   */
  addEvent(event = {}) {
    const entry = {
      id: event.id || `event_${Date.now()}_${this.events.length}`,
      type: event.type || 'event',
      source: event.source || 'system',
      timestamp: event.timestamp || new Date().toISOString(),
      data: event.data && typeof event.data === 'object' ? event.data : {},
    };

    this.events.push(entry);
    this.timeline.push(entry);
    return entry;
  }

  /**
   * Ajoute un changement d'état à l'historique.
   * @param {object} stateChange Changement d'état à enregistrer.
   * @returns {object}
   */
  addStateChange(stateChange = {}) {
    const entry = {
      id: stateChange.id || `state_${Date.now()}_${this.states.length}`,
      type: 'state_change',
      source: stateChange.source || 'system',
      timestamp: stateChange.timestamp || new Date().toISOString(),
      data: stateChange.data && typeof stateChange.data === 'object' ? stateChange.data : {},
    };

    this.states.push(entry);
    this.timeline.push(entry);
    return entry;
  }

  /**
   * Retourne l'historique complet.
   * @returns {Array<object>}
   */
  getHistory() {
    return this.events.concat(this.states);
  }

  /**
   * Filtre les événements par type.
   * @param {string} [type=''] Type à filtrer.
   * @returns {Array<object>}
   */
  filterByType(type = '') {
    if (!type) {
      return this.getHistory();
    }

    return this.getHistory().filter((entry) => entry.type === type);
  }

  /**
   * Construit la timeline de l'historique.
   * @returns {Array<object>}
   */
  buildTimeline() {
    this.timeline = [...this.events, ...this.states].sort((left, right) => left.timestamp.localeCompare(right.timestamp));
    return this.timeline;
  }

  /**
   * Calcule les statistiques synthétiques.
   * @returns {Array<object>}
   */
  calculateStatistics() {
    const timeline = this.buildTimeline();
    const byType = {};

    timeline.forEach((entry) => {
      byType[entry.type] = (byType[entry.type] || 0) + 1;
    });

    const stats = {
      period: 'current',
      totalEvents: timeline.length,
      byType,
      activityScore: Math.min(100, timeline.length * 5),
    };

    this.statistics = [stats];
    return this.statistics;
  }

  /**
   * Retourne les statistiques calculées.
   * @returns {Array<object>}
   */
  getStatistics() {
    if (!this.statistics.length) {
      this.calculateStatistics();
    }
    return this.statistics;
  }

  /**
   * Vide l'historique en mémoire.
   */
  clearHistory() {
    this.events = [];
    this.states = [];
    this.statistics = [];
    this.timeline = [];
  }

  /**
   * Retourne un résumé synthétique de l'historique.
   * @returns {object}
   */
  getSummary() {
    return {
      status: this.timeline.length ? 'READY' : 'EMPTY',
      summary: {
        events: this.events.length,
        states: this.states.length,
        statistics: this.statistics.length,
      },
      timeline: this.buildTimeline(),
    };
  }
}

export default HistoryService;
