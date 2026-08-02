/**
 * Carte spécialisée pour les informations de climat.
 */
import { SmartCard } from '../SmartCard.js';

export class ClimateCard extends SmartCard {
  /**
   * Crée une instance de carte climat.
   * @param {object} [data={}] Données de la carte.
   */
  constructor(data = {}) {
    super({
      id: data.id || 'climate-card',
      type: 'CLIMATE',
      title: data.title || 'Climat',
      value: data.value || 'Stable',
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
      type: 'CLIMATE',
      title: data.title || this.data.title,
      value: data.value || this.data.value,
      status: data.status || this.data.status,
      metadata: {
        temperature: data.temperature || this.data.metadata?.temperature || '21°C',
        target: data.target || this.data.metadata?.target || '22°C',
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
    meta.textContent = `${this.data.metadata?.temperature || '21°C'} • consigne ${this.data.metadata?.target || '22°C'} • ${this.data.metadata?.trend || 'stable'}`;
    element.appendChild(meta);
    return element;
  }
}

export default ClimateCard;
