import { LivingRoomView } from '../rooms/LivingRoomView.js';
import { KitchenView } from '../rooms/KitchenView.js';
import { BedroomView } from '../rooms/BedroomView.js';
import { OfficeView } from '../rooms/OfficeView.js';
import { BathroomView } from '../rooms/BathroomView.js';
import { OutdoorView } from '../rooms/OutdoorView.js';
import { GarageView } from '../rooms/GarageView.js';

/**
 * Vue métier des pièces.
 */
export class RoomsView {
  /**
   * Crée une instance de la vue pièces.
   * @param {object} [data={}] Données de la vue.
   */
  constructor(data = {}) {
    this.data = data || {};
  }

  /**
   * Définit les données de la vue.
   * @param {object} [data={}] Nouvelles données.
   */
  setData(data = {}) {
    this.data = data || {};
  }

  /**
   * Rend la vue sous forme d'élément DOM.
   * @returns {HTMLElement}
   */
  render() {
    const container = document.createElement('section');
    container.className = 'view-rooms';
    const title = document.createElement('h3');
    title.textContent = 'Rooms';
    const list = document.createElement('p');
    list.textContent = this.data.rooms || 'Zones disponibles';

    const preparedRooms = Array.isArray(this.data.roomsData) ? this.data.roomsData : [];
    preparedRooms.forEach((room) => {
      let view = null;
      switch (room.name) {
        case 'Salon':
          view = new LivingRoomView(room);
          break;
        case 'Cuisine':
          view = new KitchenView(room);
          break;
        case 'Chambre':
        case 'Chambre parentale':
        case 'Chambre Maxence':
        case 'Chambre Amis':
          view = new BedroomView(room);
          break;
        case 'Bureau':
          view = new OfficeView(room);
          break;
        case 'Salle de bain':
          view = new BathroomView(room);
          break;
        case 'Terrasse':
        case 'Portail':
        case 'Extérieur':
          view = new OutdoorView(room);
          break;
        case 'Garage':
          view = new GarageView(room);
          break;
        default:
          view = null;
      }

      if (view) {
        container.appendChild(view.render());
      }
    });

    container.appendChild(title);
    container.appendChild(list);
    return container;
  }

  /**
   * Retourne l'état courant de la vue.
   * @returns {string}
   */
  getState() {
    return this.data.state || 'READY';
  }
}

export default RoomsView;
