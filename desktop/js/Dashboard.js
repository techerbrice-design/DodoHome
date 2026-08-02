/**
 * Composant de page d'accueil vide pour l'interface desktop.
 */
import { DashboardViewModel } from './DashboardViewModel.js';
import { HomeDashboardView } from './HomeDashboardView.js';
import { ViewRouter } from './ViewRouter.js';

export class Dashboard {
  /**
   * Crée le tableau de bord.
   * @param {object} [options={}] Options du composant.
   * @param {import('../../core/js/Store.js').Store} [options.store] Instance du store partagé.
   * @param {import('../../core/js/Router.js').Router} [options.router] Instance du routeur partagé.
   */
  constructor(options = {}) {
    this.store = options.store;
    this.router = options.router;
    this.data = {};
    this.status = 'OFFLINE';
    this.viewModel = new DashboardViewModel();
    this.view = new HomeDashboardView();
    this.viewRouter = new ViewRouter();
    this.initializeViews();
  }

  /**
   * Initialise les vues disponibles du routeur.
   * @returns {void}
   */
  initializeViews() {
    this.viewRouter.registerView('HOME', { label: 'Accueil', description: 'Vue générale maison' });
    this.viewRouter.registerView('ROOMS', { label: 'Pièces', description: 'Vue pièces et zones' });
    this.viewRouter.registerView('EQUIPMENT', { label: 'Équipements', description: 'Vue équipements et catégories' });
    this.viewRouter.registerView('SCENES', { label: 'Scènes', description: 'Vue scénarios et automatisations' });
    this.viewRouter.registerView('ENERGY', { label: 'Énergie', description: 'Vue consommation et production' });
    this.viewRouter.registerView('HISTORY', { label: 'Historique', description: 'Vue événements et tendances' });
  }

  /**
   * Rend la page d'accueil.
   * @returns {HTMLElement}
   */
  render() {
    const dashboard = document.createElement('main');
    dashboard.className = 'dashboard';
    dashboard.dataset.currentView = this.viewRouter.getCurrentView();
    this.view.setData(this.data && this.data.data ? this.data.data : this.data);
    const rendered = this.view.render();
    dashboard.appendChild(rendered);
    return dashboard;
  }

  /**
   * Définit les données issues du connecteur.
   * @param {object} [data={}] Données retournées par l'API.
   */
  setData(data = {}) {
    this.data = data || {};
    this.status = data && data.status ? data.status : 'OFFLINE';
    this.viewModel = new DashboardViewModel({ data: data && data.data ? data.data : data });
    this.view.setData(data && data.data ? data.data : data);
  }

  /**
   * Navigue vers une vue spécifique.
   * @param {string} viewId Identifiant de la vue.
   * @returns {string}
   */
  navigate(viewId = '') {
    return this.viewRouter.navigate(viewId);
  }

  /**
   * Retourne la vue courante.
   * @returns {string}
   */
  getCurrentView() {
    return this.viewRouter.getCurrentView();
  }

  /**
   * Retourne les vues disponibles.
   * @returns {Array<object>}
   */
  getViews() {
    return this.viewRouter.getViews();
  }
}

export default Dashboard;
