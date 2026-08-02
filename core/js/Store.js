/**
 * Gestionnaire d'état global pour l'application DodoHome.
 * Centralise les informations relatives à la navigation, aux pièces, à la météo,
 * au système, aux dispositifs et aux réglages.
 */
export class Store {
  /**
   * Crée une instance du store.
   * @param {object} [initialState={}] État initial.
   */
  constructor(initialState = {}) {
    this.initialState = {
      page: 'home',
      rooms: [],
      weather: null,
      system: null,
      devices: [],
      settings: {},
      ...initialState,
    };
    this.state = { ...this.initialState };
    this.listeners = new Set();
  }

  /**
   * Récupère l'état complet ou une valeur précise.
   * @param {string} [key] Clé à lire.
   * @returns {any}
   */
  get(key) {
    if (!key) {
      return this.state;
    }
    return this.state[key];
  }

  /**
   * Met à jour une valeur du store.
   * @param {string} key Clé à modifier.
   * @param {any} value Nouvelle valeur.
   * @returns {object}
   */
  set(key, value) {
    this.state[key] = value;
    this.emit();
    return this.state;
  }

  /**
   * Abonne un écouteur aux changements d'état.
   * @param {function(object): void} listener Fonction appelée à chaque mise à jour.
   * @returns {function(object): void}
   */
  subscribe(listener) {
    this.listeners.add(listener);
    return listener;
  }

  /**
   * Désabonne un écouteur.
   * @param {function(object): void} listener Fonction à retirer.
   * @returns {boolean}
   */
  unsubscribe(listener) {
    return this.listeners.delete(listener);
  }

  /**
   * Réinitialise le store à son état initial.
   * @returns {object}
   */
  reset() {
    this.state = { ...this.initialState };
    this.emit();
    return this.state;
  }

  /**
   * Notifie les écouteurs.
   * @private
   */
  emit() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}

export default Store;
