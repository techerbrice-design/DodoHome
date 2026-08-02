/**
 * Organisateur de zones de dashboard pour Dodo Home.
 * Définit une structure modulaire de présentation inspirée des interfaces premium.
 */
export class DashboardLayout {
  /**
   * Crée une instance de layout.
   */
  constructor() {
    this.layout = { zones: [] };
    this.cards = [];
    this.widgets = [];
  }

  /**
   * Ajoute une zone au layout.
   * @param {object} [zone={}] Définition de la zone.
   * @returns {object}
   */
  addZone(zone = {}) {
    const normalizedZone = {
      id: zone.id || `zone-${this.layout.zones.length + 1}`,
      title: zone.title || 'Zone',
      description: zone.description || '',
      type: zone.type || 'general',
      cards: [],
      widgets: [],
    };

    this.layout.zones.push(normalizedZone);
    return normalizedZone;
  }

  /**
   * Ajoute une carte à une zone.
   * @param {HTMLElement|object} card Élément ou définition de carte.
   * @param {string} [zoneId=''] Identifiant de la zone de destination.
   * @returns {object}
   */
  addCard(card, zoneId = '') {
    const entry = { zoneId, element: card };
    this.cards.push(entry);

    if (zoneId) {
      const zone = this.layout.zones.find((item) => item.id === zoneId);
      if (zone) {
        zone.cards.push(entry);
      }
    }

    return entry;
  }

  /**
   * Ajoute un widget à une zone.
   * @param {HTMLElement|object} widget Élément ou définition de widget.
   * @param {string} [zoneId=''] Identifiant de la zone de destination.
   * @returns {object}
   */
  addWidget(widget, zoneId = '') {
    const entry = { zoneId, element: widget };
    this.widgets.push(entry);

    if (zoneId) {
      const zone = this.layout.zones.find((item) => item.id === zoneId);
      if (zone) {
        zone.widgets.push(entry);
      }
    }

    return entry;
  }

  /**
   * Retourne la structure de layout complète.
   * @returns {{layout: object, cards: Array<object>, widgets: Array<object>}}
   */
  getLayout() {
    return {
      layout: this.layout,
      cards: this.cards,
      widgets: this.widgets,
    };
  }

  /**
   * Rend le layout sous forme d'élément DOM.
   * @returns {HTMLElement}
   */
  render() {
    const root = document.createElement('div');
    root.className = 'dashboard-layout';

    this.layout.zones.forEach((zone) => {
      const zoneElement = document.createElement('section');
      zoneElement.className = `dashboard-zone ${zone.type || 'general'}`;
      zoneElement.dataset.zoneId = zone.id;

      const title = document.createElement('h3');
      title.className = 'dashboard-zone-title';
      title.textContent = zone.title || 'Zone';

      const description = document.createElement('p');
      description.className = 'dashboard-zone-description';
      description.textContent = zone.description || '';

      const content = document.createElement('div');
      content.className = 'dashboard-zone-content';

      const zoneCards = (zone.cards || []).map((item) => item.element).filter(Boolean);
      const zoneWidgets = (zone.widgets || []).map((item) => item.element).filter(Boolean);

      zoneCards.forEach((card) => content.appendChild(card));
      zoneWidgets.forEach((widget) => content.appendChild(widget));

      zoneElement.appendChild(title);
      if (zone.description) {
        zoneElement.appendChild(description);
      }
      zoneElement.appendChild(content);
      root.appendChild(zoneElement);
    });

    return root;
  }
}

export default DashboardLayout;
