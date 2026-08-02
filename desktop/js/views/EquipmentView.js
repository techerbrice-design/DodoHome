/**
 * Vue métier des équipements.
 */
import { LightCard } from '../cards/LightCard.js';
import { ClimateCard } from '../cards/ClimateCard.js';
import { SecurityCard } from '../cards/SecurityCard.js';
import { EnergyCard } from '../cards/EnergyCard.js';

export class EquipmentView {
  /**
   * Crée une instance de la vue équipements.
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
    container.className = 'view-equipment';
    const title = document.createElement('h3');
    title.textContent = 'Equipment';
    const content = document.createElement('p');
    content.textContent = this.data.equipment || 'Catégories équipement';

    const light = new LightCard({ title: 'Éclairage', value: 'ON', status: 'READY', metadata: { lights: 5, intensity: 72 } });
    const climate = new ClimateCard({ title: 'Climat', value: 'Stable', status: 'READY', temperature: '21°C', target: '22°C', trend: 'stable' });
    const security = new SecurityCard({ title: 'Sécurité', value: 'ARMED', status: 'READY', presence: 'Présence détectée', alerts: ['Aucune'] });
    const energy = new EnergyCard({ title: 'Énergie', value: 'stable', status: 'READY', consumption: '3.2 kWh', production: '1.1 kWh', trend: 'stable' });

    [light, climate, security, energy].forEach((card) => {
      container.appendChild(card.render());
    });

    container.appendChild(title);
    container.appendChild(content);
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

export default EquipmentView;
