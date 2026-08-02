/**
 * Vue spécialisée pour le salon.
 */
import { RoomView } from './RoomView.js';
import { LightCard } from '../cards/LightCard.js';

export class LivingRoomView extends RoomView {
  /**
   * Crée une instance de la vue salon.
   * @param {object} [room={}] Données du salon.
   */
  constructor(room = {}) {
    super(room);
    this.setRoom(room);
    this.addCard(new LightCard({ title: 'Éclairage salon', value: 'ON', status: 'READY', metadata: { lights: 3, intensity: 70 } }));
  }
}

export default LivingRoomView;
