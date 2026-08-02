/**
 * Modèle de vue pour transformer les données API en structure de synthèse adaptée au dashboard.
 */
export class DashboardViewModel {
  /**
   * Crée une instance du modèle de vue.
   * @param {object} [options={}] Options du modèle.
   * @param {object} [options.data] Données issues de l'API.
   */
  constructor(options = {}) {
    this.data = options.data || {};
  }

  /**
   * Construit les cartes, widgets et résumé à partir des données internes.
   * @returns {{cards: Array<object>, widgets: Array<object>, summary: object}}
   */
  build() {
    const system = this.data.system || {};
    const rooms = Array.isArray(this.data.rooms) ? this.data.rooms : [];
    const equipment = Array.isArray(this.data.equipment) ? this.data.equipment : [];
    const scenes = Array.isArray(this.data.scenes) ? this.data.scenes : [];
    const events = Array.isArray(this.data.events) ? this.data.events : [];
    const history = this.data.history || {};

    const cards = [
      {
        id: 'system',
        title: 'État global maison',
        value: system.status || 'OFFLINE',
        detail: `Santé ${system.health || 0}`,
      },
      {
        id: 'rooms',
        title: 'Pièces',
        value: rooms.length,
        detail: 'Pièces disponibles',
      },
      {
        id: 'equipment',
        title: 'Équipements',
        value: equipment.length,
        detail: 'Équipements préparés',
      },
      {
        id: 'scenes',
        title: 'Scènes',
        value: scenes.length,
        detail: 'Scènes disponibles',
      },
    ];

    const widgets = [
      {
        id: 'events',
        title: 'Événements',
        value: events.length,
        detail: 'Événements récents',
      },
      {
        id: 'history',
        title: 'Dernière activité',
        value: history && history.summary ? history.summary.events || 0 : 0,
        detail: 'Événements enregistrés',
      },
    ];

    const summary = {
      status: system.status || 'OFFLINE',
      health: system.health || 0,
      rooms: rooms.length,
      equipment: equipment.length,
      scenes: scenes.length,
      events: events.length,
      history: history && history.timeline ? history.timeline.length : 0,
    };

    return {
      cards,
      widgets,
      summary,
    };
  }

  /**
   * Retourne les cartes construites.
   * @returns {Array<object>}
   */
  getCards() {
    return this.build().cards;
  }

  /**
   * Retourne les widgets construits.
   * @returns {Array<object>}
   */
  getWidgets() {
    return this.build().widgets;
  }

  /**
   * Retourne le résumé construit.
   * @returns {object}
   */
  getSummary() {
    return this.build().summary;
  }
}

export default DashboardViewModel;
