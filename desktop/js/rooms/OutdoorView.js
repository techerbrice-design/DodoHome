/**
 * Vue spécialisée pour les espaces extérieurs.
 */
import { RoomView } from './RoomView.js';
import { SecurityCard } from '../cards/SecurityCard.js';

export class OutdoorView extends RoomView {
  /**
   * Crée une instance de la vue extérieur.
   * @param {object} [room={}] Données de l'extérieur.
   */
  constructor(room = {}) {
    super(room);
    this.setRoom(room);
    this.addCard(new SecurityCard({ title: 'Sécurité extérieur', value: 'WATCH', status: 'READY', presence: 'Zone surveillée', alerts: ['Aucune'] }));
  }
}

export default OutdoorView;
