import { LightCard } from '../cards/LightCard.js';
import { ClimateCard } from '../cards/ClimateCard.js';
import { SecurityCard } from '../cards/SecurityCard.js';
import { EnergyCard } from '../cards/EnergyCard.js';
import { PresenceCard } from '../cards/PresenceCard.js';

/**
 * Vue métier générale de la maison.
 */
export class HomeView {
  /**
   * Crée une instance de la vue home.
   * @param {object} [data={}] Données de la vue.
   */
  constructor(data = {}) {
    this.data = data || {};
  }

  /**
   * Définit les données de la vue.
   * @param {object} [data={}] Nouvelles données.
   */
  setData(data = {}) {
    this.data = data || {};
  }

  /**
   * Rend la vue sous forme d'élément DOM.
   * @returns {HTMLElement}
   */
  render() {
    const container = document.createElement('section');
    container.className = 'view-home';
    const title = document.createElement('h3');
    title.textContent = 'Home';
    const summary = document.createElement('p');
    summary.textContent = this.data.summary || 'Résumé général maison';

    const light = new LightCard({ title: 'Éclairage', value: 'ON', status: 'READY', metadata: { lights: 5, intensity: 72 } });
    const climate = new ClimateCard({ title: 'Climat', value: 'Stable', status: 'READY', temperature: '21°C', target: '22°C', trend: 'stable' });
    const security = new SecurityCard({ title: 'Sécurité', value: 'ARMED', status: 'READY', presence: 'Présence détectée', alerts: ['Aucune'] });
    const energy = new EnergyCard({ title: 'Énergie', value: 'stable', status: 'READY', consumption: '3.2 kWh', production: '1.1 kWh', trend: 'stable' });
    const presence = new PresenceCard({ title: 'Présence', value: 'Actif', status: 'READY', persons: 2, zones: 'Salon, Cuisine', lastActivity: 'Il y a 5 min' });

    [light, climate, security, energy, presence].forEach((card) => {
      container.appendChild(card.render());
    });

    container.appendChild(title);
    container.appendChild(summary);
    return container;
  }

  /**
   * Retourne l'état courant de la vue.
   * @returns {string}
   */
  getState() {
    return this.data.state || 'READY';
  }
}

export default HomeView;
