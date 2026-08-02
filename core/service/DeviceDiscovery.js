/**
 * Service de transformation des données découvertes en modèles DodoHome.
 */
import { Device } from '../class/Device.js';
import { Command } from '../class/Command.js';

export class DeviceDiscovery {
  /**
   * Crée une instance du service de découverte.
   * @param {object} [options={}] Options du service.
   */
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Débute la découverte de données brutes.
   * @param {object} [payload={}] Données à traiter.
   * @returns {Promise<Array<object>>}
   */
  async discover(payload = {}) {
    const devices = Array.isArray(payload.devices) ? payload.devices : [];
    return devices.map((device) => this.parseDevice(device));
  }

  /**
   * Transforme une donnée d'équipement en modèle DodoHome.
   * @param {object} data Donnée brute d'équipement.
   * @returns {Device}
   */
  parseDevice(data) {
    const commands = Array.isArray(data.commands)
      ? data.commands.map((command) => this.parseCommand(command))
      : [];

    return new Device({
      id: data.id || '',
      name: data.name || '',
      type: data.type || 'unknown',
      room: data.room || '',
      commands,
      status: data.status || 'unknown',
    });
  }

  /**
   * Transforme une donnée de commande en modèle DodoHome.
   * @param {object} data Donnée brute de commande.
   * @returns {Command}
   */
  parseCommand(data) {
    return new Command({
      id: data.id || '',
      name: data.name || '',
      type: data.type || 'unknown',
      value: data.value ?? null,
      unit: data.unit || '',
    });
  }
}

export default DeviceDiscovery;
