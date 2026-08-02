/**
 * Service central de synthèse de l'état global du système Dodo Home.
 * Agrège les statuts de connexion, de validation et de rapport en un état unique exploitable.
 */
export class SystemStatusService {
  /**
   * Crée une instance du service de statut système.
   * @param {object} [options={}] Options du service.
   * @param {object} [options.connectionStatus] Statut de connexion.
   * @param {object} [options.equipmentStatus] Statut des équipements.
   * @param {object} [options.validationStatus] Statut de validation.
   * @param {object} [options.reportStatus] Statut du rapport.
   */
  constructor(options = {}) {
    this.connectionStatus = options.connectionStatus || null;
    this.equipmentStatus = options.equipmentStatus || null;
    this.validationStatus = options.validationStatus || null;
    this.reportStatus = options.reportStatus || null;
    this.systemStatus = null;
  }

  /**
   * Retourne l'état global synthétisé du système.
   * @returns {object}
   */
  getStatus() {
    const connection = this.getConnectionStatus();
    const equipment = this.getEquipmentStatus();
    const validation = this.getValidationStatus();
    const report = this.getReportStatus();
    const health = this.calculateHealth(connection, equipment, report);

    this.systemStatus = {
      status: this.resolveSystemStatus(connection, equipment, report),
      health,
      connection,
      equipment,
      validation,
      report,
    };

    return this.systemStatus;
  }

  /**
   * Retourne l'état de connexion sous forme synthétique.
   * @returns {object}
   */
  getConnectionStatus() {
    const status = this.connectionStatus && typeof this.connectionStatus === 'object'
      ? this.connectionStatus.status || this.connectionStatus
      : this.connectionStatus;

    if (status === 'CONNECTED') {
      return { status: 'CONNECTED' };
    }

    if (status === 'DISCONNECTED') {
      return { status: 'DISCONNECTED' };
    }

    return { status: 'UNKNOWN' };
  }

  /**
   * Retourne l'état synthétique des équipements.
   * @returns {object}
   */
  getEquipmentStatus() {
    const source = this.equipmentStatus && typeof this.equipmentStatus === 'object'
      ? this.equipmentStatus
      : {};

    const total = Number(source.total || 0);
    const valid = Number(source.valid || 0);
    const warning = Number(source.warning || 0);
    const error = Number(source.error || 0);

    const status = error > 0 ? 'ERROR' : warning > 0 ? 'WARNING' : valid > 0 ? 'VALID' : 'VALID';

    return {
      total,
      valid,
      warning,
      error,
      status,
    };
  }

  /**
   * Retourne l'état de validation.
   * @returns {object}
   */
  getValidationStatus() {
    const source = this.validationStatus && typeof this.validationStatus === 'object'
      ? this.validationStatus
      : {};

    const status = source.status || 'VALID';

    return {
      status,
      summary: source.summary || {},
    };
  }

  /**
   * Retourne l'état du rapport.
   * @returns {object}
   */
  getReportStatus() {
    const available = Boolean(this.reportStatus && this.reportStatus.available);

    return {
      available,
      status: available ? 'READY' : 'OFFLINE',
    };
  }

  /**
   * Calcule la santé globale du système.
   * @param {object} connection État de connexion.
   * @param {object} equipment État des équipements.
   * @param {object} report État du rapport.
   * @returns {number}
   */
  calculateHealth(connection = {}, equipment = {}, report = {}) {
    let score = 0;

    if (connection && connection.status === 'CONNECTED') {
      score += 40;
    }

    if (report && report.available) {
      score += 20;
    }

    if (equipment && equipment.status === 'VALID') {
      score += 40;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Détermine le statut général du système.
   * @param {object} connection État de connexion.
   * @param {object} equipment État des équipements.
   * @param {object} report État du rapport.
   * @returns {string}
   */
  resolveSystemStatus(connection = {}, equipment = {}, report = {}) {
    if (connection && connection.status === 'CONNECTED' && report && report.available) {
      return equipment && equipment.status === 'ERROR' ? 'ERROR' : 'READY';
    }

    if (connection && connection.status === 'CONNECTED') {
      return 'WARNING';
    }

    if (report && report.available) {
      return 'WARNING';
    }

    return 'OFFLINE';
  }
}

export default SystemStatusService;
