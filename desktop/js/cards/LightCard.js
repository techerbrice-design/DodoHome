/**
 * Carte spécialisée pour les informations d'éclairage.
 */
import { SmartCard } from '../SmartCard.js';

export class LightCard extends SmartCard {
  /**
   * Crée une instance de carte éclairage.
   * @param {object} [data={}] Données de la carte.
   */
  constructor(data = {}) {
    super({
      id: data.id || 'light-card',
      type: 'LIGHTING',
      title: data.title || 'Éclairage',
      value: data.value || 'ON',
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
      type: 'LIGHTING',
      title: data.title || this.data.title,
      value: data.value || this.data.value,
      status: data.status || this.data.status,
      metadata: {
        lights: data.metadata?.lights || this.data.metadata?.lights || 0,
        intensity: data.metadata?.intensity || this.data.metadata?.intensity || 0,
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
    meta.textContent = `${this.data.metadata?.lights || 0} lumières • ${this.data.metadata?.intensity || 0}%`;
    element.appendChild(meta);
    return element;
  }
}

export default LightCard;
