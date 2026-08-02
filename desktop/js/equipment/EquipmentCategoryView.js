/**
 * Vue de regroupement des équipements par catégorie.
 */
import { EquipmentDetailView } from './EquipmentDetailView.js';

export class EquipmentCategoryView {
  /**
   * Crée une instance de la vue par catégorie.
   * @param {string} [category='OTHER'] Catégorie à afficher.
   */
  constructor(category = 'OTHER') {
    this.category = category;
    this.equipments = [];
  }

  /**
   * Ajoute un équipement à la catégorie.
   * @param {object} equipment Équipement à ajouter.
   */
  addEquipment(equipment) {
    this.equipments.push(equipment);
    return this.equipments;
  }

  /**
   * Définit la liste des équipements de la catégorie.
   * @param {Array<object>} [equipments=[]] Équipements.
   */
  setEquipments(equipments = []) {
    this.equipments = Array.isArray(equipments) ? equipments : [];
    return this.equipments;
  }

  /**
   * Rend la vue de catégorie.
   * @returns {HTMLElement}
   */
  render() {
    const container = document.createElement('section');
    container.className = 'equipment-category-view';

    const title = document.createElement('h4');
    title.textContent = this.category || 'OTHER';
    container.appendChild(title);

    this.equipments.forEach((equipment) => {
      const detail = new EquipmentDetailView(equipment);
      container.appendChild(detail.render());
    });

    return container;
  }
}

export default EquipmentCategoryView;
