/**
 * Vue spécialisée pour la cuisine.
 */
import { RoomView } from './RoomView.js';
import { ClimateCard } from '../cards/ClimateCard.js';

export class KitchenView extends RoomView {
  /**
   * Crée une instance de la vue cuisine.
   * @param {object} [room={}] Données de la cuisine.
   */
  constructor(room = {}) {
    super(room);
    this.setRoom(room);
    this.addCard(new ClimateCard({ title: 'Climat cuisine', value: 'Stable', status: 'READY', temperature: '21°C', target: '22°C', trend: 'stable' }));
  }
}

export default KitchenView;
