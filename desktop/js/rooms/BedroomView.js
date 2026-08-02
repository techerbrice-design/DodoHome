/**
 * Vue spécialisée pour les chambres.
 */
import { RoomView } from './RoomView.js';
import { PresenceCard } from '../cards/PresenceCard.js';

export class BedroomView extends RoomView {
  /**
   * Crée une instance de la vue chambre.
   * @param {object} [room={}] Données de la chambre.
   */
  constructor(room = {}) {
    super(room);
    this.setRoom(room);
    this.addCard(new PresenceCard({ title: 'Présence chambre', value: 'Actif', status: 'READY', persons: 1, zones: room.name || 'Chambre', lastActivity: 'Il y a 10 min' }));
  }
}

export default BedroomView;
