/**
 * Vue spécialisée pour le garage.
 */
import { RoomView } from './RoomView.js';
import { SecurityCard } from '../cards/SecurityCard.js';

export class GarageView extends RoomView {
  /**
   * Crée une instance de la vue garage.
   * @param {object} [room={}] Données du garage.
   */
  constructor(room = {}) {
    super(room);
    this.setRoom(room);
    this.addCard(new SecurityCard({ title: 'Sécurité garage', value: 'READY', status: 'READY', presence: 'Garage surveillé', alerts: ['Aucune'] }));
  }
}

export default GarageView;
