/**
 * Vue détaillée générique d'un équipement simulé.
 */
import { EquipmentModel } from './EquipmentModel.js';

export class EquipmentDetailView {
  /**
   * Crée une instance de la vue détaillée.
   * @param {object} [equipment={}] Équipement à afficher.
   */
  constructor(equipment = {}) {
    this.equipment = equipment instanceof EquipmentModel ? equipment : new EquipmentModel(equipment);
  }

  /**
   * Définit l'équipement à afficher.
   * @param {object} equipment Équipement.
   */
  setEquipment(equipment = {}) {
    this.equipment = equipment instanceof EquipmentModel ? equipment : new EquipmentModel(equipment);
    return this.equipment;
  }

  /**
   * Rend la vue détaillée.
   * @returns {HTMLElement}
   */
  render() {
    const container = document.createElement('section');
    container.className = 'equipment-detail-view';

    const title = document.createElement('h4');
    title.textContent = this.equipment.name || 'Équipement';

    const category = document.createElement('p');
    category.textContent = `Catégorie : ${this.equipment.category || 'OTHER'}`;

    const room = document.createElement('p');
    room.textContent = `Pièce : ${this.equipment.room || 'Inconnu'}`;

    const state = document.createElement('p');
    state.textContent = `État : ${this.equipment.state || 'READY'}`;

    const capabilities = document.createElement('p');
    capabilities.textContent = `Capacités : ${(this.equipment.getCapabilities() || []).join(', ') || 'Aucune'}`;

    const metadata = document.createElement('p');
    metadata.textContent = `Infos : ${JSON.stringify(this.equipment.metadata || {})}`;

    [title, category, room, state, capabilities, metadata].forEach((node) => container.appendChild(node));
    return container;
  }

  /**
   * Retourne l'état courant.
   * @returns {string}
   */
  getState() {
    return this.equipment.getState();
  }
}

export default EquipmentDetailView;
