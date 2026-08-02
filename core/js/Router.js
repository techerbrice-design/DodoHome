/**
 * Routeur interne de l'application.
 * Gère la navigation sans dépendre d'une URL réelle.
 */
export class Router {
  /**
   * Crée un routeur.
   * @param {object} [options={}] Options du routeur.
   * @param {import('./Store.js').Store} [options.store] Instance du store partagé.
   */
  constructor(options = {}) {
    this.store = options.store;
    this.routes = new Map();
    this.currentRoute = null;
  }

  /**
   * Enregistre une route interne.
   * @param {string} name Nom de la route.
   * @param {function(object): any} handler Fonction de traitement.
   * @returns {Router}
   */
  registerRoute(name, handler) {
    this.routes.set(name, handler);
    return this;
  }

  /**
   * Navigue vers une route interne.
   * @param {string} name Nom de la route.
   * @param {object} [params={}] Paramètres associés.
   * @returns {any}
   */
  navigate(name, params = {}) {
    this.currentRoute = { name, params };

    if (this.store) {
      this.store.set('page', name);
    }

    const handler = this.routes.get(name);
    if (typeof handler === 'function') {
      return handler(params);
    }

    return null;
  }

  /**
   * Récupère la route courante.
   * @returns {{name: string, params: object}|null}
   */
  getCurrentRoute() {
    return this.currentRoute;
  }
}

export default Router;
