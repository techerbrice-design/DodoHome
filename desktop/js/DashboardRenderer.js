/**
 * Petit orchestrateur permettant de relier données, modèle, vues et composants UI.
 * Il prépare un premier dashboard fonctionnel avec les données de démonstration.
 */
import { DashboardViewModel } from './DashboardViewModel.js';
import { HomeView } from './views/HomeView.js';
import { RoomsView } from './views/RoomsView.js';
import { EquipmentView } from './views/EquipmentView.js';
import { ScenesView } from './views/ScenesView.js';
import { EnergyView } from './views/EnergyView.js';
import { HistoryView } from './views/HistoryView.js';

export class DashboardRenderer {
  /**
   * Crée une instance du renderer.
   */
  constructor() {
    this.viewModel = new DashboardViewModel();
    this.data = {};
    this.currentView = 'HOME';
    this.viewInstance = null;
  }

  /**
   * Définit la vue active.
   * @param {string} viewId Identifiant de la vue.
   * @returns {string}
   */
  setView(viewId = 'HOME') {
    this.currentView = viewId;
    return this.currentView;
  }

  /**
   * Définit les données à utiliser.
   * @param {object} [data={}] Données d'entrée.
   * @returns {object}
   */
  setData(data = {}) {
    this.data = data || {};
    this.viewModel = new DashboardViewModel({ data: this.data });
    return this.data;
  }

  /**
   * Rend la vue active à partir des données.
   * @returns {HTMLElement}
   */
  render() {
    const summary = this.viewModel.build ? this.viewModel.build().summary : {};
    const cards = this.viewModel.build ? this.viewModel.build().cards : [];
    const widgets = this.viewModel.build ? this.viewModel.build().widgets : [];

    switch (this.currentView) {
      case 'ROOMS':
        this.viewInstance = new RoomsView({
          rooms: cards.filter((card) => card.id === 'rooms').map((card) => card.title),
          summary,
        });
        break;
      case 'EQUIPMENT':
        this.viewInstance = new EquipmentView({
          equipment: cards.filter((card) => card.id === 'equipment').map((card) => card.title),
          summary,
        });
        break;
      case 'SCENES':
        this.viewInstance = new ScenesView({
          scenes: cards.filter((card) => card.id === 'scenes').map((card) => card.title),
          summary,
        });
        break;
      case 'ENERGY':
        this.viewInstance = new EnergyView({
          energy: summary.status || 'Synthèse énergie',
          summary,
        });
        break;
      case 'HISTORY':
        this.viewInstance = new HistoryView({
          history: widgets.map((widget) => widget.title).join(', '),
          summary,
        });
        break;
      case 'HOME':
      default:
        this.viewInstance = new HomeView({
          summary: `${summary.status} - Santé ${summary.health}`,
          cards,
          widgets,
        });
        break;
    }

    return this.viewInstance.render();
  }

  /**
   * Rafraîchit l'affichage avec les données actuelles.
   * @returns {HTMLElement}
   */
  refresh() {
    return this.render();
  }
}

export default DashboardRenderer;
