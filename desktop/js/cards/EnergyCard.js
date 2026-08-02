/**
 * Carte spécialisée pour les informations d'énergie.
 */
import { SmartCard } from '../SmartCard.js';

export class EnergyCard extends SmartCard {
  /**
   * Crée une instance de carte énergie.
   * @param {object} [data={}] Données de la carte.
   */
  constructor(data = {}) {
    super({
      id: data.id || 'energy-card',
      type: 'ENERGY',
      title: data.title || 'Énergie',
      value: data.value || 'stable',
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
      type: 'ENERGY',
      title: data.title || this.data.title,
      value: data.value || this.data.value,
      status: data.status || this.data.status,
      metadata: {
        consumption: data.consumption || this.data.metadata?.consumption || '3.2 kWh',
        production: data.production || this.data.metadata?.production || '1.1 kWh',
        trend: data.trend || this.data.metadata?.trend || 'stable',
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
    meta.textContent = `${this.data.metadata?.consumption || '3.2 kWh'} • ${this.data.metadata?.production || '1.1 kWh'} • ${this.data.metadata?.trend || 'stable'}`;
    element.appendChild(meta);
    return element;
  }
}

export default EnergyCard;
