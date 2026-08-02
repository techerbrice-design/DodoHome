/**
 * Registre central des équipements simulés.
 */
export class EquipmentRegistry {
  /**
   * Crée une instance du registre.
   */
  constructor() {
    this.items = [];
  }

  /**
   * Enregistre un équipement.
   * @param {object} equipment Équipement à enregistrer.
   * @returns {object}
   */
  register(equipment = {}) {
    if (!this.items.some((item) => item.id === equipment.id)) {
      this.items.push(equipment);
    }
    return equipment;
  }

  /**
   * Retourne un équipement par identifiant.
   * @param {string} id Identifiant recherché.
   * @returns {object|undefined}
   */
  getById(id = '') {
    return this.items.find((item) => item.id === id);
  }

  /**
   * Retourne les équipements d'une catégorie.
   * @param {string} category Catégorie recherchée.
   * @returns {Array<object>}
   */
  getByCategory(category = '') {
    return this.items.filter((item) => item.category === category);
  }

  /**
   * Retourne les équipements d'une pièce.
   * @param {string} room Pièce recherchée.
   * @returns {Array<object>}
   */
  getByRoom(room = '') {
    return this.items.filter((item) => item.room === room);
  }

  /**
   * Retourne la liste complète des équipements.
   * @returns {Array<object>}
   */
  getAll() {
    return this.items;
  }
}

export default EquipmentRegistry;
