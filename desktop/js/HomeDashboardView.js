/**
 * Première vue synthétique du dashboard Dodo Home.
 * Assemble les composants existants Card et Widget à partir du modèle de vue.
 */
import { Card } from './Card.js';
import { Widget } from './Widget.js';
import { Header } from './Header.js';
import { StatusBar } from './StatusBar.js';

export class HomeDashboardView {
  /**
   * Crée une instance de la vue dashboard.
   * @param {object} [options={}] Options de la vue.
   */
  constructor(options = {}) {
    this.options = options;
    this.data = {};
    this.components = {
      header: null,
      status: null,
      cards: [],
      widgets: [],
    };
  }

  /**
   * Définit les données à afficher.
   * @param {object} [data={}] Données de synthèse.
   */
  setData(data = {}) {
    this.data = data || {};
  }

  /**
   * Rend la vue de dashboard.
   * @returns {HTMLElement}
   */
  render() {
    const container = document.createElement('section');
    container.className = 'workspace';

    const header = new Header();
    const headerEl = header.render();
    headerEl.className = 'topbar';
    const title = document.createElement('h2');
    title.textContent = 'Dodo Home';
    headerEl.appendChild(title);
    this.components.header = headerEl;

    const statusBar = new StatusBar();
    const statusBarEl = statusBar.render();
    statusBarEl.className = 'statusbar';
    this.components.status = statusBarEl;

    const summary = this.data.summary || {};
    const cards = this.buildCards(summary);
    const widgets = this.buildWidgets(summary);

    const content = document.createElement('div');
    content.className = 'panel';
    cards.forEach((card) => content.appendChild(card));
    widgets.forEach((widget) => content.appendChild(widget));

    container.appendChild(headerEl);
    container.appendChild(content);
    container.appendChild(statusBarEl);

    this.components.cards = cards;
    this.components.widgets = widgets;
    return container;
  }

  /**
   * Met à jour la vue avec de nouvelles données.
   * @param {object} [data={}] Données de synthèse.
   */
  update(data = {}) {
    this.setData(data);
    return this.render();
  }

  /**
   * Retourne les composants rendus.
   * @returns {object}
   */
  getComponents() {
    return this.components;
  }

  /**
   * Construit les cartes de synthèse.
   * @param {object} [summary={}] Résumé de données.
   * @returns {Array<HTMLElement>}
   */
  buildCards(summary = {}) {
    const cards = [];
    const cardDefinitions = [
      {
        id: 'state',
        title: 'État maison',
        value: summary.status || 'OFFLINE',
        detail: `Santé ${summary.health || 0}`,
      },
      {
        id: 'rooms',
        title: 'Pièces',
        value: summary.rooms || 0,
        detail: 'Pièces disponibles',
      },
      {
        id: 'equipment',
        title: 'Équipements',
        value: summary.equipment || 0,
        detail: 'Équipements préparés',
      },
      {
        id: 'activity',
        title: 'Activité',
        value: summary.events || 0,
        detail: 'Événements récents',
      },
    ];

    cardDefinitions.forEach((definition) => {
      const card = new Card();
      const element = card.render();
      element.className = 'card panel';
      const title = document.createElement('h3');
      title.textContent = definition.title;
      const value = document.createElement('p');
      value.textContent = String(definition.value);
      const detail = document.createElement('p');
      detail.textContent = definition.detail;
      element.appendChild(title);
      element.appendChild(value);
      element.appendChild(detail);
      cards.push(element);
    });

    return cards;
  }

  /**
   * Construit les widgets d'information.
   * @param {object} [summary={}] Résumé de données.
   * @returns {Array<HTMLElement>}
   */
  buildWidgets(summary = {}) {
    const widgets = [];
    const widgetDefinitions = [
      {
        id: 'scenes',
        title: 'Scènes',
        value: summary.scenes || 0,
        detail: 'Scènes disponibles',
      },
      {
        id: 'history',
        title: 'Historique',
        value: summary.history || 0,
        detail: 'Dernière activité connue',
      },
    ];

    widgetDefinitions.forEach((definition) => {
      const widget = new Widget();
      const element = widget.render();
      element.className = 'widget panel';
      const title = document.createElement('h3');
      title.textContent = definition.title;
      const value = document.createElement('p');
      value.textContent = String(definition.value);
      const detail = document.createElement('p');
      detail.textContent = definition.detail;
      element.appendChild(title);
      element.appendChild(value);
      element.appendChild(detail);
      widgets.push(element);
    });

    return widgets;
  }
}

export default HomeDashboardView;
