/**
 * Service d'association des équipements Jeedom à la structure DodoHome.
 */
import { Room } from '../class/Room.js';

export class EquipmentMapper {
  /**
   * Crée une instance du mapper.
   * @param {object} [options={}] Options du service.
   */
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Associe un équipement à un modèle de pièce.
   * @param {object} device Équipement à mapper.
   * @param {string|object} room Pièce ou identifiant de pièce.
   * @returns {object}
   */
  mapDevice(device, room) {
    return {
      ...device,
      room: room,
    };
  }

  /**
   * Assigne une pièce à un équipement.
   * @param {object} device Équipement à traiter.
   * @param {string|object} room Pièce ou identifiant de pièce.
   * @returns {object}
   */
  assignRoom(device, room) {
    return this.mapDevice(device, room);
  }

  /**
   * Sérialise le résultat du mapping.
   * @param {object} item Élément à sérialiser.
   * @returns {object}
   */
  serialize(item) {
    return item;
  }
}

export default EquipmentMapper;
