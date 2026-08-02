/**
 * Fournisseur central de données de démonstration pour Dodo Home.
 * Il fournit une structure simulée et remplaçable par des données réelles plus tard.
 */
export class DemoDataProvider {
  /**
   * Crée une instance du fournisseur de données de démonstration.
   */
  constructor() {
    this.houseStatus = {
      status: 'READY',
      health: 92,
      lastUpdate: '2026-08-02T12:00:00',
    };

    this.rooms = [
      { id: 'living-room', name: 'Salon', status: 'OK', temperature: '22°C' },
      { id: 'kitchen', name: 'Cuisine', status: 'OK', temperature: '21°C' },
      { id: 'bedroom', name: 'Chambre', status: 'READY', temperature: '20°C' },
      { id: 'office', name: 'Bureau', status: 'OK', temperature: '19°C' },
      { id: 'outdoor', name: 'Extérieur', status: 'WATCH', temperature: '18°C' },
    ];

    this.equipment = [
      { id: 'lamp-01', name: 'Lampe salon', category: 'LIGHTING', state: 'ON' },
      { id: 'climate-01', name: 'Climatisation', category: 'CLIMATE', state: 'AUTO' },
      { id: 'security-01', name: 'Alarme', category: 'SECURITY', state: 'ARMED' },
      { id: 'energy-01', name: 'Compteur', category: 'ENERGY', state: 'READY' },
      { id: 'shutter-01', name: 'Volets', category: 'SHUTTER', state: 'CLOSED' },
    ];

    this.scenes = [
      { id: 'wake-up', name: 'Réveil', status: 'READY' },
      { id: 'leave-home', name: 'Départ maison', status: 'READY' },
      { id: 'return-home', name: 'Retour maison', status: 'READY' },
      { id: 'night', name: 'Nuit', status: 'READY' },
    ];

    this.energy = {
      consumption: '3.2 kWh',
      production: '1.1 kWh',
      trend: 'stable',
    };

    this.history = [
      { timestamp: '2026-08-02T11:45:00', type: 'EVENT', message: 'Scène Réveil exécutée' },
      { timestamp: '2026-08-02T11:30:00', type: 'INFO', message: 'État système normal' },
      { timestamp: '2026-08-02T11:10:00', type: 'WARNING', message: 'Volets fermés' },
    ];
  }

  /**
   * Retourne l'état global de la maison.
   * @returns {object}
   */
  getHouseStatus() {
    return this.houseStatus;
  }

  /**
   * Retourne la liste des pièces.
   * @returns {Array<object>}
   */
  getRooms() {
    return this.rooms;
  }

  /**
   * Retourne la liste des équipements.
   * @returns {Array<object>}
   */
  getEquipment() {
    return this.equipment;
  }

  /**
   * Retourne la liste des scènes.
   * @returns {Array<object>}
   */
  getScenes() {
    return this.scenes;
  }

  /**
   * Retourne les données énergie.
   * @returns {object}
   */
  getEnergy() {
    return this.energy;
  }

  /**
   * Retourne l'historique simulé.
   * @returns {Array<object>}
   */
  getHistory() {
    return this.history;
  }

  /**
   * Retourne l'intégralité des données simulées.
   * @returns {object}
   */
  getAllData() {
    return {
      houseStatus: this.getHouseStatus(),
      rooms: this.getRooms(),
      equipment: this.getEquipment(),
      scenes: this.getScenes(),
      energy: this.getEnergy(),
      history: this.getHistory(),
    };
  }
}

export default DemoDataProvider;
