import { SmartCard } from './SmartCard.js';
import { DemoDataProvider } from './mock/DemoDataProvider.js';
import { LightCard } from './cards/LightCard.js';
import { ClimateCard } from './cards/ClimateCard.js';
import { SecurityCard } from './cards/SecurityCard.js';
import { EnergyCard } from './cards/EnergyCard.js';
import { PresenceCard } from './cards/PresenceCard.js';

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
    this.demoProvider = new DemoDataProvider();
  }

  /**
   * Construit les cartes, widgets et résumé à partir des données internes.
   * @returns {{cards: Array<object>, widgets: Array<object>, summary: object}}
   */
  build() {
    const demoData = this.demoProvider.getAllData();
    const system = this.data.system || demoData.houseStatus || {};
    const rooms = Array.isArray(this.data.rooms) ? this.data.rooms : (Array.isArray(demoData.rooms) ? demoData.rooms : []);
    const equipment = Array.isArray(this.data.equipment) ? this.data.equipment : (Array.isArray(demoData.equipment) ? demoData.equipment : []);
    const scenes = Array.isArray(this.data.scenes) ? this.data.scenes : (Array.isArray(demoData.scenes) ? demoData.scenes : []);
    const events = Array.isArray(this.data.events) ? this.data.events : [];
    const history = this.data.history || (Array.isArray(demoData.history) ? { timeline: demoData.history } : {});

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

    const smartCards = [
      new LightCard({ id: 'lighting', title: 'Éclairage', value: 'ON', status: 'READY', metadata: { lights: 5, intensity: 72 } }),
      new ClimateCard({ id: 'climate', title: 'Climat', value: 'Stable', status: 'READY', temperature: '21°C', target: '22°C', trend: 'stable' }),
      new SecurityCard({ id: 'security', title: 'Sécurité', value: 'ARMED', status: 'READY', presence: 'Présence détectée', alerts: ['Aucune'] }),
      new EnergyCard({ id: 'energy', title: 'Énergie', value: 'stable', status: 'READY', consumption: '3.2 kWh', production: '1.1 kWh', trend: 'stable' }),
      new PresenceCard({ id: 'presence', title: 'Présence', value: 'Actif', status: 'READY', persons: 2, zones: 'Salon, Cuisine', lastActivity: 'Il y a 5 min' }),
    ];

    cards.push(...smartCards.map((card) => ({
      id: card.data.id,
      title: card.data.title,
      value: card.data.value,
      detail: card.data.metadata && card.data.metadata.category ? card.data.metadata.category : '',
      type: card.data.type,
    })));

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
