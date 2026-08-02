/**
 * Service de validation des équipements découverts avant intégration dans la configuration DodoHome.
 * Vérifie la cohérence des équipements, des pièces et des commandes sans effectuer d'appel réseau.
 */
export class EquipmentValidationService {
  /**
   * Crée une instance du service de validation.
   * @param {object} [options={}] Options du service.
   * @param {object} [options.preview] Prévisualisation d'équipements.
   * @param {object} [options.house] Structure de maison source.
   */
  constructor(options = {}) {
    this.preview = options.preview || null;
    this.house = options.house || {};
    this.results = [];
  }

  /**
   * Valide la prévisualisation et retourne un rapport exploitable.
   * @returns {object}
   */
  validate() {
    this.results = [];
    const equipment = Array.isArray(this.preview && this.preview.equipment) ? this.preview.equipment : [];

    equipment.forEach((item, index) => {
      this.results.push(this.validateEquipment(item, index));
    });

    return this.getReport();
  }

  /**
   * Valide un équipement individuel.
   * @param {object} [equipment={}] Équipement à vérifier.
   * @param {number} [index=0] Index de l'équipement.
   * @returns {object}
   */
  validateEquipment(equipment = {}, index = 0) {
    const issues = [];
    let status = 'VALID';

    if (!equipment || typeof equipment !== 'object') {
      return {
        id: `equipment_${index + 1}`,
        name: 'Équipement inconnu',
        status: 'ERROR',
        issues: ['Équipement non exploitable.'],
        room: '',
        commands: [],
      };
    }

    const equipmentId = typeof equipment.id === 'string' ? equipment.id.trim() : '';
    const equipmentName = typeof equipment.name === 'string' ? equipment.name.trim() : '';
    const equipmentType = typeof equipment.type === 'string' ? equipment.type.trim() : '';
    const roomValidation = this.validateRoom(equipment.room);
    const typeValidation = this.validateType(equipmentType);
    const commandsValidation = this.validateCommands(equipment.commands);

    if (!equipmentId) {
      issues.push('Identifiant manquant.');
      status = 'ERROR';
    }

    if (!equipmentName) {
      issues.push('Nom manquant.');
      status = 'ERROR';
    }

    if (typeValidation.status === 'ERROR') {
      issues.push(typeValidation.message);
      status = 'ERROR';
    } else if (typeValidation.status === 'WARNING') {
      issues.push(typeValidation.message);
      if (status !== 'ERROR') {
        status = 'WARNING';
      }
    }

    if (roomValidation.status === 'ERROR') {
      issues.push(roomValidation.message);
      status = 'ERROR';
    } else if (roomValidation.status === 'WARNING') {
      issues.push(roomValidation.message);
      if (status !== 'ERROR') {
        status = 'WARNING';
      }
    }

    if (commandsValidation.status === 'ERROR') {
      issues.push(commandsValidation.message);
      status = 'ERROR';
    } else if (commandsValidation.status === 'WARNING') {
      issues.push(commandsValidation.message);
      if (status !== 'ERROR') {
        status = 'WARNING';
      }
    }

    return {
      id: equipmentId || `equipment_${index + 1}`,
      name: equipmentName || `Équipement ${index + 1}`,
      type: equipmentType || 'unknown',
      status,
      issues,
      room: typeof equipment.room === 'string' ? equipment.room : '',
      commands: Array.isArray(equipment.commands) ? equipment.commands : [],
    };
  }

  /**
   * Valide l'association d'un équipement à une pièce.
   * @param {string} [room=''] Nom de la pièce.
   * @returns {object}
   */
  validateRoom(room = '') {
    const normalizedRoom = typeof room === 'string' ? room.trim() : '';
    const availableRooms = this.getAvailableRooms();

    if (!normalizedRoom) {
      return {
        status: 'WARNING',
        message: 'Aucune pièce associée.',
      };
    }

    if (availableRooms.includes(normalizedRoom)) {
      return {
        status: 'VALID',
        message: 'Pièce reconnue dans la structure de maison.',
      };
    }

    return {
      status: 'ERROR',
      message: 'Pièce introuvable dans la structure de maison.',
    };
  }

  /**
   * Valide le type d'un équipement.
   * @param {string} [type=''] Type de l'équipement.
   * @returns {object}
   */
  validateType(type = '') {
    const normalizedType = typeof type === 'string' ? type.trim().toLowerCase() : '';
    const knownTypes = ['light', 'switch', 'sensor', 'camera', 'thermostat', 'scene', 'lock', 'shutter', 'outlet', 'unknown'];

    if (!normalizedType) {
      return {
        status: 'ERROR',
        message: 'Type manquant.',
      };
    }

    if (knownTypes.includes(normalizedType)) {
      return {
        status: 'VALID',
        message: 'Type connu.',
      };
    }

    return {
      status: 'WARNING',
      message: 'Type non répertorié dans la liste de types connue.',
    };
  }

  /**
   * Valide la liste de commandes associées à un équipement.
   * @param {Array<object>} [commands=[]] Commandes à examiner.
   * @returns {object}
   */
  validateCommands(commands = []) {
    if (!Array.isArray(commands)) {
      return {
        status: 'WARNING',
        message: 'Liste de commandes absente.',
      };
    }

    if (commands.length === 0) {
      return {
        status: 'WARNING',
        message: 'Aucune commande fournie.',
      };
    }

    const exploitables = commands.filter((command) => {
      if (!command || typeof command !== 'object') {
        return false;
      }

      return typeof command.id === 'string' && command.id.trim().length > 0;
    });

    if (exploitables.length === commands.length) {
      return {
        status: 'VALID',
        message: `${commands.length} commandes exploitables.`,
      };
    }

    return {
      status: 'WARNING',
      message: 'Certaines commandes ne sont pas exploitables.',
    };
  }

  /**
   * Génère le rapport final de validation.
   * @returns {object}
   */
  getReport() {
    const summary = {
      total: this.results.length,
      valid: 0,
      warning: 0,
      error: 0,
    };

    this.results.forEach((item) => {
      if (item.status === 'VALID') {
        summary.valid += 1;
      } else if (item.status === 'WARNING') {
        summary.warning += 1;
      } else {
        summary.error += 1;
      }
    });

    const status = summary.error > 0 ? 'ERROR' : summary.warning > 0 ? 'WARNING' : 'VALID';

    return {
      status,
      summary,
      items: this.results,
    };
  }

  /**
   * Récupère la liste des pièces connues depuis la structure de maison.
   * @returns {Array<string>}
   */
  getAvailableRooms() {
    const rooms = [];

    if (Array.isArray(this.house && this.house.floors)) {
      this.house.floors.forEach((floor) => {
        if (Array.isArray(floor && floor.rooms)) {
          floor.rooms.forEach((room) => {
            if (typeof room === 'string' && room.trim().length > 0) {
              rooms.push(room.trim());
            }
          });
        }
      });
    }

    return rooms;
  }
}

export default EquipmentValidationService;
