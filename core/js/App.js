/**
 * Point d'entrée principal de l'application DodoHome.
 * Initialise la configuration, le stockage, le routage et l'interface desktop.
 */
import { Logger } from './Logger.js';
import { Config } from './Config.js';
import { Store } from './Store.js';
import { Router } from './Router.js';
import { MainLayout } from '../../desktop/js/MainLayout.js';

export class App {
  /**
   * Crée l'instance de l'application.
   * @param {object} [options={}] Options d'initialisation.
   * @param {HTMLElement|string} [options.root=document.body] Élément racine du rendu.
   */
  constructor(options = {}) {
    this.options = options;
    this.logger = new Logger('App');
    this.config = new Config();
    this.store = new Store();
    this.router = new Router({ store: this.store });
    this.mainLayout = new MainLayout({ store: this.store, router: this.router });
  }

  /**
   * Initialise l'application.
   * @returns {Promise<void>}
   */
  async init() {
    this.logger.info('Initialisation de l’application');
    await this.config.load();
    this.store.set('page', 'home');

    const root = this.options.root || document.body;
    this.mainLayout.render(root);
  }
}

export default App;
