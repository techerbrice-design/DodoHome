import { HomeView } from './views/HomeView.js';
import { RoomsView } from './views/RoomsView.js';
import { EquipmentView } from './views/EquipmentView.js';
import { ScenesView } from './views/ScenesView.js';
import { EnergyView } from './views/EnergyView.js';
import { HistoryView } from './views/HistoryView.js';

/**
 * Routeur interne léger pour la navigation entre vues Dodo Home.
 * Il prépare l'évolution vers plusieurs vues spécialisées sans créer de nouveaux écrans.
 */
export class ViewRouter {
  /**
   * Crée une instance du routeur.
   */
  constructor() {
    this.currentView = 'HOME';
    this.availableViews = [];
    this.viewInstances = {};
  }

  /**
   * Enregistre une vue disponible.
   * @param {string} viewId Identifiant de la vue.
   * @param {object} [options={}] Options de la vue.
   * @returns {object}
   */
  registerView(viewId = '', options = {}) {
    const normalizedView = {
      id: viewId,
      label: options.label || viewId,
      description: options.description || '',
    };

    if (!this.availableViews.some((view) => view.id === normalizedView.id)) {
      this.availableViews.push(normalizedView);
    }

    return normalizedView;
  }

  /**
   * Navigue vers une vue enregistrée.
   * @param {string} viewId Identifiant de la vue cible.
   * @returns {string}
   */
  navigate(viewId = '') {
    const target = this.availableViews.find((view) => view.id === viewId);
    if (target) {
      this.currentView = target.id;
    }
    return this.currentView;
  }

  /**
   * Crée ou renvoie l'instance de vue associée à un identifiant.
   * @param {string} viewId Identifiant de la vue.
   * @param {object} [data={}] Données de la vue.
   * @returns {object}
   */
  getViewInstance(viewId = '', data = {}) {
    if (!this.viewInstances[viewId]) {
      switch (viewId) {
        case 'ROOMS':
          this.viewInstances[viewId] = new RoomsView(data);
          break;
        case 'EQUIPMENT':
          this.viewInstances[viewId] = new EquipmentView(data);
          break;
        case 'SCENES':
          this.viewInstances[viewId] = new ScenesView(data);
          break;
        case 'ENERGY':
          this.viewInstances[viewId] = new EnergyView(data);
          break;
        case 'HISTORY':
          this.viewInstances[viewId] = new HistoryView(data);
          break;
        case 'HOME':
        default:
          this.viewInstances[viewId] = new HomeView(data);
          break;
      }
    }

    return this.viewInstances[viewId];
  }

  /**
   * Retourne la vue courante.
   * @returns {string}
   */
  getCurrentView() {
    return this.currentView;
  }

  /**
   * Retourne la liste des vues disponibles.
   * @returns {Array<object>}
   */
  getViews() {
    return this.availableViews;
  }
}

export default ViewRouter;
