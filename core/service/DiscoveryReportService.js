/**
 * Service de génération d'un rapport synthétique des résultats de découverte et de validation.
 * Agrège les résultats de découverte, prévisualisation et validation sans traiter de données sensibles.
 */
export class DiscoveryReportService {
  /**
   * Crée une instance du service de rapport.
   * @param {object} [options={}] Options du service.
   * @param {object} [options.discovery] Résultats de découverte.
   * @param {object} [options.preview] Prévisualisation des équipements.
   * @param {object} [options.validation] Rapport de validation.
   */
  constructor(options = {}) {
    this.discovery = options.discovery || null;
    this.preview = options.preview || null;
    this.validation = options.validation || null;
    this.report = {
      generated: false,
      summary: {
        devices: 0,
        valid: 0,
        warning: 0,
        error: 0,
      },
      devices: [],
    };
  }

  /**
   * Génère un rapport synthétique à partir des données disponibles.
   * @returns {object}
   */
  generate() {
    this.report = {
      generated: true,
      summary: {
        devices: 0,
        valid: 0,
        warning: 0,
        error: 0,
      },
      devices: [],
    };

    const devices = Array.isArray(this.preview && this.preview.equipment) ? this.preview.equipment : [];

    devices.forEach((device, index) => {
      const validationEntry = this.getValidationEntry(device, index);
      this.addDeviceResult(validationEntry);
    });

    return this.exportReport();
  }

  /**
   * Construit un résumé du rapport.
   * @returns {object}
   */
  buildSummary() {
    const summary = {
      devices: this.report.devices.length,
      valid: 0,
      warning: 0,
      error: 0,
    };

    this.report.devices.forEach((device) => {
      if (device.status === 'VALID') {
        summary.valid += 1;
      } else if (device.status === 'WARNING') {
        summary.warning += 1;
      } else {
        summary.error += 1;
      }
    });

    return summary;
  }

  /**
   * Ajoute un résultat d'équipement au rapport.
   * @param {object} result Résultat de l'équipement.
   */
  addDeviceResult(result = {}) {
    this.report.devices.push(result);
  }

  /**
   * Ajoute un avertissement à un équipement.
   * @param {object} device Résultat d'équipement.
   * @param {string} message Message d'avertissement.
   */
  addWarning(device = {}, message = '') {
    if (!device || typeof device !== 'object') {
      return;
    }

    device.warnings = Array.isArray(device.warnings) ? device.warnings : [];
    if (message && !device.warnings.includes(message)) {
      device.warnings.push(message);
    }
  }

  /**
   * Ajoute une erreur à un équipement.
   * @param {object} device Résultat d'équipement.
   * @param {string} message Message d'erreur.
   */
  addError(device = {}, message = '') {
    if (!device || typeof device !== 'object') {
      return;
    }

    device.errors = Array.isArray(device.errors) ? device.errors : [];
    if (message && !device.errors.includes(message)) {
      device.errors.push(message);
    }
  }

  /**
   * Exporte le rapport final.
   * @returns {object}
   */
  exportReport() {
    this.report.summary = this.buildSummary();
    return {
      generated: true,
      summary: this.report.summary,
      devices: this.report.devices,
    };
  }

  /**
   * Transforme un équipement de la prévisualisation en résultat de rapport.
   * @param {object} device Équipement de prévisualisation.
   * @param {number} index Index de l'équipement.
   * @returns {object}
   */
  getValidationEntry(device = {}, index = 0) {
    const normalized = device || {};
    const entry = {
      id: normalized.id || `device_${index + 1}`,
      name: normalized.name || `Équipement ${index + 1}`,
      type: normalized.type || 'unknown',
      room: normalized.room || '',
      status: 'VALID',
      warnings: [],
      errors: [],
    };

    if (!normalized.id) {
      this.addError(entry, 'Identifiant manquant.');
    }

    if (!normalized.name) {
      this.addError(entry, 'Nom manquant.');
    }

    if (!normalized.type || normalized.type === 'unknown') {
      this.addWarning(entry, 'Type non défini.');
    }

    if (!normalized.room) {
      this.addWarning(entry, 'Pièce non renseignée.');
    }

    if (entry.errors.length > 0) {
      entry.status = 'ERROR';
    } else if (entry.warnings.length > 0) {
      entry.status = 'WARNING';
    }

    return entry;
  }
}

export default DiscoveryReportService;
