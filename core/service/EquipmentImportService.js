/**
 * Service d'import contrôlé des équipements prévisualisés vers le modèle interne DodoHome.
 * Prépare un lot d'import sans modifier directement les configurations existantes.
 */
export class EquipmentImportService {
  /**
   * Crée une instance du service d'import.
   * @param {object} [options={}] Options du service.
   * @param {object} [options.preview] Prévisualisation des équipements.
   * @param {object} [options.validation] Rapport de validation.
   * @param {Array<object>} [options.existingEquipment] Équipements déjà présents.
   */
  constructor(options = {}) {
    this.preview = options.preview || null;
    this.validation = options.validation || null;
    this.existingEquipment = Array.isArray(options.existingEquipment) ? options.existingEquipment : [];
    this.importList = [];
    this.duplicates = [];
  }

  /**
   * Prépare le lot d'import à partir de la prévisualisation et de la validation.
   * @returns {object}
   */
  prepareImport() {
    this.importList = [];
    this.duplicates = [];

    const items = Array.isArray(this.preview && this.preview.equipment) ? this.preview.equipment : [];
    const validationItems = Array.isArray(this.validation && this.validation.items) ? this.validation.items : [];

    items.forEach((item, index) => {
      const validationItem = validationItems[index] || null;
      const importItem = this.validateImportItem(item, validationItem, index);

      if (importItem) {
        this.addToImportList(importItem);
      }
    });

    return this.getImportPreview();
  }

  /**
   * Valide un élément d'import individuel.
   * @param {object} [item={}] Équipement à importer.
   * @param {object} [validationItem=null] Résultat de validation.
   * @param {number} [index=0] Index.
   * @returns {object|null}
   */
  validateImportItem(item = {}, validationItem = null, index = 0) {
    if (!item || typeof item !== 'object') {
      return null;
    }

    const id = typeof item.id === 'string' ? item.id.trim() : '';
    const name = typeof item.name === 'string' ? item.name.trim() : '';
    const type = typeof item.type === 'string' ? item.type.trim() : '';
    const room = typeof item.room === 'string' ? item.room.trim() : '';

    const status = validationItem && validationItem.status ? validationItem.status : 'VALID';
    const warnings = [];

    if (!id || !name || !type || !room) {
      return null;
    }

    if (status === 'ERROR') {
      return null;
    }

    if (status === 'WARNING') {
      warnings.push('Import possible avec avertissement.');
    }

    const isDuplicate = this.detectDuplicates(id);
    if (isDuplicate) {
      this.duplicates.push(id);
      return null;
    }

    return {
      id,
      name,
      type,
      room,
      status: status === 'WARNING' ? 'WARNING' : 'VALID',
      warnings,
    };
  }

  /**
   * Détecte les doublons par identifiant.
   * @param {string} [id=''] Identifiant à vérifier.
   * @returns {boolean}
   */
  detectDuplicates(id = '') {
    if (!id) {
      return false;
    }

    const existingIds = this.existingEquipment.map((entry) => String(entry && entry.id || '')).filter(Boolean);
    return existingIds.includes(id) || this.importList.some((entry) => entry.id === id);
  }

  /**
   * Ajoute un élément au lot d'import.
   * @param {object} item Élément à ajouter.
   */
  addToImportList(item = {}) {
    if (!item || typeof item !== 'object') {
      return;
    }

    this.importList.push(item);
  }

  /**
   * Retourne la prévisualisation d'import finale.
   * @returns {object}
   */
  getImportPreview() {
    return {
      status: this.importList.length > 0 ? 'READY' : 'READY',
      summary: this.getSummary(),
      items: this.importList,
    };
  }

  /**
   * Génère le résumé de l'import.
   * @returns {object}
   */
  getSummary() {
    const accepted = this.importList.filter((item) => item.status === 'VALID').length;
    const warning = this.importList.filter((item) => item.status === 'WARNING').length;
    const rejected = this.importList.length === 0 ? 0 : 0;

    return {
      total: this.importList.length,
      accepted,
      warning,
      rejected,
      duplicates: this.duplicates.length,
    };
  }
}

export default EquipmentImportService;
