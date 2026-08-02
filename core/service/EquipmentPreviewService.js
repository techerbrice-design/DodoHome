/**
 * Service de prévisualisation des équipements découverts depuis Jeedom.
 * Transforme les données brutes en un format de prévisualisation exploitable sans stockage sensible.
 */
export class EquipmentPreviewService {
  /**
   * Crée une instance du service de prévisualisation.
   * @param {object} [options={}] Options du service.
   */
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Génère une prévisualisation à partir d'une liste d'équipements.
   * @param {Array<object>} [devices=[]] Équipements à prévisualiser.
   * @returns {object}
   */
  generatePreview(devices = []) {
    return {
      generated: false,
      equipment: devices.map((device) => this.normalizeDevice(device)),
    };
  }

  /**
   * Normalise un équipement pour la prévisualisation.
   * @param {object} device Équipement brut.
   * @returns {object}
   */
  normalizeDevice(device = {}) {
    return {
      id: device.id || '',
      name: device.name || '',
      type: device.type || 'unknown',
      room: device.room || '',
      commands: Array.isArray(device.commands) ? device.commands.map((command) => this.normalizeCommand(command)) : [],
    };
  }

  /**
   * Normalise une commande pour la prévisualisation.
   * @param {object} command Commande brute.
   * @returns {object}
   */
  normalizeCommand(command = {}) {
    return {
      id: command.id || '',
      name: command.name || '',
      type: command.type || 'unknown',
      value: command.value ?? null,
      unit: command.unit || '',
    };
  }

  /**
   * Exporte la prévisualisation dans un format contrôlé.
   * @param {object} preview Prévisualisation à exporter.
   * @returns {object}
   */
  exportPreview(preview) {
    return {
      generated: Boolean(preview && preview.generated),
      equipment: Array.isArray(preview && preview.equipment) ? preview.equipment : [],
    };
  }
}

export default EquipmentPreviewService;
