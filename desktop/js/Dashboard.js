/**
 * Composant de page d'accueil vide pour l'interface desktop.
 */
import { DashboardViewModel } from './DashboardViewModel.js';

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
  }

  /**
   * Rend la page d'accueil.
   * @returns {HTMLElement}
   */
  render() {
    const dashboard = document.createElement('main');
    dashboard.className = 'dashboard';
    const title = document.createElement('h1');
    title.textContent = 'Bienvenue dans Dodo Home';
    dashboard.appendChild(title);
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
  }
}

export default Dashboard;
