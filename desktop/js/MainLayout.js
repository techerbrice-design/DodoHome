/**
 * Composant principal de mise en page de l'interface desktop.
 * Assemble la barre latérale, la barre supérieure et le tableau de bord.
 */
import { Sidebar } from './Sidebar.js';
import { TopBar } from './TopBar.js';
import { Dashboard } from './Dashboard.js';

export class MainLayout {
  /**
   * Crée la structure de l'interface principale.
   * @param {object} [options={}] Options du layout.
   * @param {import('../../core/js/Store.js').Store} [options.store] Instance du store partagé.
   * @param {import('../../core/js/Router.js').Router} [options.router] Instance du routeur partagé.
   */
  constructor(options = {}) {
    this.store = options.store;
    this.router = options.router;
    this.sidebar = new Sidebar({ store: this.store, router: this.router });
    this.topBar = new TopBar({ store: this.store, router: this.router });
    this.dashboard = new Dashboard({ store: this.store, router: this.router });
  }

  /**
   * Rend l'interface dans un élément racine.
   * @param {HTMLElement} root Élément racine du rendu.
   */
  render(root) {
    root.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'main-layout';

    const sidebar = this.sidebar.render();
    const topBar = this.topBar.render();
    const dashboard = this.dashboard.render();

    wrapper.appendChild(sidebar);
    wrapper.appendChild(topBar);
    wrapper.appendChild(dashboard);
    root.appendChild(wrapper);
  }
}

export default MainLayout;
