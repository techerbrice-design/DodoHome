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
