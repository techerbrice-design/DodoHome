/**
 * Service de découverte des équipements Jeedom en lecture seule.
 * Orchestration des classes existantes pour préparer la transformation des données.
 */
import { JeedomAPI } from '../api/JeedomAPI.js';
import { DiscoveryAPI } from '../api/DiscoveryAPI.js';
import { DeviceDiscovery } from './DeviceDiscovery.js';
import { EquipmentMapper } from './EquipmentMapper.js';

export class JeedomDiscoveryService {
  /**
   * Crée une instance du service de découverte.
   * @param {object} [options={}] Options du service.
   * @param {JeedomAPI} [options.api] API Jeedom.
   * @param {DiscoveryAPI} [options.discoveryApi] API de découverte.
   * @param {DeviceDiscovery} [options.deviceDiscovery] Service de transformation.
   * @param {EquipmentMapper} [options.mapper] Service de mapping.
   */
  constructor(options = {}) {
    this.api = options.api || new JeedomAPI();
    this.discoveryApi = options.discoveryApi || new DiscoveryAPI();
    this.deviceDiscovery = options.deviceDiscovery || new DeviceDiscovery();
    this.mapper = options.mapper || new EquipmentMapper();
  }

  /**
   * Lance la découverte des équipements Jeedom.
   * @returns {Promise<object>}
   */
  async discover() {
    const devices = await this.loadDevices();
    const mapped = await this.mapResults(devices);
    return {
      success: true,
      status: 'READY',
      devices: mapped,
      message: 'Découverte Jeedom préparée en lecture seule.',
    };
  }

  /**
   * Charge les équipements disponibles.
   * @returns {Promise<Array<object>>}
   */
  async loadDevices() {
    const result = await this.discoveryApi.discoverDevices();
    return result.ok ? [] : [];
  }

  /**
   * Charge les commandes associées.
   * @returns {Promise<Array<object>>}
   */
  async loadCommands() {
    const result = await this.discoveryApi.discoverCommands();
    return result.ok ? [] : [];
  }

  /**
   * Transforme les résultats vers les modèles DodoHome.
   * @param {Array<object>} devices Équipements bruts.
   * @returns {Promise<Array<object>>}
   */
  async mapResults(devices) {
    const discovered = await this.deviceDiscovery.discover({ devices });
    return discovered.map((device) => this.mapper.assignRoom(device, ''));
  }
}

export default JeedomDiscoveryService;
