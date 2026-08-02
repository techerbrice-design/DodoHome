/**
 * Carte spécialisée pour la présence.
 */
import { SmartCard } from '../SmartCard.js';

export class PresenceCard extends SmartCard {
  /**
   * Crée une instance de carte présence.
   * @param {object} [data={}] Données de la carte.
   */
  constructor(data = {}) {
    super({
      id: data.id || 'presence-card',
      type: 'PRESENCE',
      title: data.title || 'Présence',
      value: data.value || 'Actif',
      status: data.status || 'READY',
      metadata: data.metadata || {},
    });
    this.setData(data);
  }

  /**
   * Définit les données de la carte.
   * @param {object} [data={}] Nouvelles données.
   */
  setData(data = {}) {
    const next = {
      id: data.id || this.data.id,
      type: 'PRESENCE',
      title: data.title || this.data.title,
      value: data.value || this.data.value,
      status: data.status || this.data.status,
      metadata: {
        persons: data.persons || this.data.metadata?.persons || 2,
        zones: data.zones || this.data.metadata?.zones || 'Salon, Cuisine',
        lastActivity: data.lastActivity || this.data.metadata?.lastActivity || 'Il y a 5 min',
      },
    };
    return super.setData(next);
  }

  /**
   * Rend la carte sous forme d'élément DOM.
   * @returns {HTMLElement}
   */
  render() {
    const element = super.render();
    const meta = document.createElement('p');
    meta.textContent = `${this.data.metadata?.persons || 2} occupants • ${this.data.metadata?.zones || 'Salon, Cuisine'} • ${this.data.metadata?.lastActivity || 'Il y a 5 min'}`;
    element.appendChild(meta);
    return element;
  }
}

export default PresenceCard;
