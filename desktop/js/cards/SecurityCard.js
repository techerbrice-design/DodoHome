/**
 * Carte spécialisée pour les informations de sécurité.
 */
import { SmartCard } from '../SmartCard.js';

export class SecurityCard extends SmartCard {
  /**
   * Crée une instance de carte sécurité.
   * @param {object} [data={}] Données de la carte.
   */
  constructor(data = {}) {
    super({
      id: data.id || 'security-card',
      type: 'SECURITY',
      title: data.title || 'Sécurité',
      value: data.value || 'ARMED',
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
      type: 'SECURITY',
      title: data.title || this.data.title,
      value: data.value || this.data.value,
      status: data.status || this.data.status,
      metadata: {
        status: data.status || this.data.metadata?.status || 'ARMED',
        presence: data.presence || this.data.metadata?.presence || 'Présence détectée',
        alerts: data.alerts || this.data.metadata?.alerts || [],
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
    meta.textContent = `${this.data.metadata?.status || 'ARMED'} • ${this.data.metadata?.presence || 'Présence détectée'} • ${this.data.metadata?.alerts?.length || 0} alertes`;
    element.appendChild(meta);
    return element;
  }
}

export default SecurityCard;
