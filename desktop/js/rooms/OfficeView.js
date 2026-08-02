/**
 * Vue spécialisée pour le bureau.
 */
import { RoomView } from './RoomView.js';
import { ClimateCard } from '../cards/ClimateCard.js';

export class OfficeView extends RoomView {
  /**
   * Crée une instance de la vue bureau.
   * @param {object} [room={}] Données du bureau.
   */
  constructor(room = {}) {
    super(room);
    this.setRoom(room);
    this.addCard(new ClimateCard({ title: 'Climat bureau', value: 'Confort', status: 'READY', temperature: '19°C', target: '20°C', trend: 'stable' }));
  }
}

export default OfficeView;
