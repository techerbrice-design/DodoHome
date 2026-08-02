/**
 * Gestionnaire interne de navigation pour l'interface desktop.
 */
export class Navigation {
  /**
   * Crée une instance de navigation.
   * @param {object} [options={}] Options du composant.
   */
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Navigue vers un état interne sans URL.
   * @param {string} [view='home'] Vue cible.
   * @returns {string}
   */
  navigate(view = 'home') {
    return view;
  }
}

export default Navigation;
