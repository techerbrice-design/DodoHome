/**
 * Service de mapping des équipements vers les pièces de la maison Dodo Home.
 * Normalise les noms de pièces et prépare une association structurée sans modifier la configuration.
 */
export class RoomMappingService {
  /**
   * Crée une instance du service de mapping.
   * @param {object} [options={}] Options du service.
   * @param {object} [options.house] Structure de maison source.
   * @param {Array<object>} [options.equipment] Équipements à associer.
   */
  constructor(options = {}) {
    this.house = options.house || {};
    this.equipment = Array.isArray(options.equipment) ? options.equipment : [];
    this.rooms = [];
    this.mapping = [];
    this.unmatched = [];
  }

  /**
   * Charge les pièces disponibles depuis la structure de maison.
   * @returns {Array<string>}
   */
  loadRooms() {
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

    this.rooms = rooms;
    return this.rooms;
  }

  /**
   * Normalise un nom de pièce pour la comparaison.
   * @param {string} [room=''] Nom de la pièce.
   * @returns {string}
   */
  normalizeRoomName(room = '') {
    return String(room || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  /**
   * Recherche une pièce correspondante dans la maison.
   * @param {string} [room=''] Nom de la pièce à retrouver.
   * @returns {object}
   */
  findRoom(room = '') {
    const normalizedInput = this.normalizeRoomName(room);

    if (!normalizedInput) {
      return {
        found: false,
        name: '',
        status: 'ERROR',
      };
    }

    const exact = this.rooms.find((entry) => this.normalizeRoomName(entry) === normalizedInput);
    if (exact) {
      return {
        found: true,
        name: exact,
        status: 'MATCH',
      };
    }

    const close = this.rooms.find((entry) => this.normalizeRoomName(entry).includes(normalizedInput) || normalizedInput.includes(this.normalizeRoomName(entry)));
    if (close) {
      return {
        found: true,
        name: close,
        status: 'WARNING',
      };
    }

    return {
      found: false,
      name: '',
      status: 'ERROR',
    };
  }

  /**
   * Associe les équipements aux pièces de la maison.
   * @returns {object}
   */
  mapEquipment() {
    this.loadRooms();
    this.mapping = [];
    this.unmatched = [];

    this.equipment.forEach((item) => {
      const roomRef = typeof item && item.room === 'string' ? item.room : '';
      const roomMatch = this.findRoom(roomRef);

      if (!roomRef) {
        this.unmatched.push({
          id: item.id || '',
          name: item.name || '',
          reason: 'Pièce non renseignée',
        });
        return;
      }

      if (roomMatch.found && roomMatch.status === 'MATCH') {
        this.mapping.push({
          id: item.id || '',
          name: item.name || '',
          type: item.type || 'unknown',
          room: roomMatch.name,
          status: 'VALID',
        });
        return;
      }

      if (roomMatch.found && roomMatch.status === 'WARNING') {
        this.mapping.push({
          id: item.id || '',
          name: item.name || '',
          type: item.type || 'unknown',
          room: roomMatch.name,
          status: 'WARNING',
        });
        return;
      }

      this.unmatched.push({
        id: item.id || '',
        name: item.name || '',
        reason: 'Pièce introuvable',
      });
    });

    return this.getMapping();
  }

  /**
   * Récupère les équipements non associés.
   * @returns {Array<object>}
   */
  findUnmatched() {
    return this.unmatched;
  }

  /**
   * Retourne la structure de mapping complète.
   * @returns {object}
   */
  getMapping() {
    const rooms = [];
    const roomMap = new Map();

    this.mapping.forEach((item) => {
      const key = item.room || 'non_attribue';
      if (!roomMap.has(key)) {
        roomMap.set(key, []);
      }
      roomMap.get(key).push(item);
    });

    roomMap.forEach((equipment, name) => {
      rooms.push({
        name,
        equipment,
      });
    });

    return {
      status: 'READY',
      summary: this.getSummary(),
      rooms,
    };
  }

  /**
   * Génère un résumé du mapping.
   * @returns {object}
   */
  getSummary() {
    return {
      rooms: this.rooms.length,
      mapped: this.mapping.length,
      unmatched: this.unmatched.length,
      warnings: this.mapping.filter((item) => item.status === 'WARNING').length,
    };
  }
}

export default RoomMappingService;
