/**
 * Composant de page d'accueil vide pour l'interface desktop.
 */
import { DashboardViewModel } from './DashboardViewModel.js';
import { HomeDashboardView } from './HomeDashboardView.js';

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
  }

  /**
   * Rend la page d'accueil.
   * @returns {HTMLElement}
   */
  render() {
    const dashboard = document.createElement('main');
    dashboard.className = 'dashboard';
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
}

export default Dashboard;
