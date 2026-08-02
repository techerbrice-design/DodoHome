/**
 * Vue spécialisée pour la salle de bain.
 */
import { RoomView } from './RoomView.js';
import { LightCard } from '../cards/LightCard.js';

export class BathroomView extends RoomView {
  /**
   * Crée une instance de la vue salle de bain.
   * @param {object} [room={}] Données de la salle de bain.
   */
  constructor(room = {}) {
    super(room);
    this.setRoom(room);
    this.addCard(new LightCard({ title: 'Éclairage salle de bain', value: 'ON', status: 'READY', metadata: { lights: 2, intensity: 60 } }));
  }
}

export default BathroomView;
