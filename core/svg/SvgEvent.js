/**
 * Gestionnaire d'événements SVG.
 * Prépare les interactions clavier et souris sans logique métier.
 */
export class SvgEvent {
  /**
   * Crée un gestionnaire d'événements.
   * @param {object} [options={}] Options de l'événement.
   */
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Prépare un événement de clic.
   * @param {Function} handler Gestionnaire à appeler sur clic.
   * @returns {Function}
   */
  click(handler) {
    return handler;
  }

  /**
   * Prépare un événement de survol.
   * @param {Function} handler Gestionnaire à appeler au survol.
   * @returns {Function}
   */
  hover(handler) {
    return handler;
  }

  /**
   * Prépare un événement de sélection.
   * @param {Function} handler Gestionnaire à appeler sur sélection.
   * @returns {Function}
   */
  select(handler) {
    return handler;
  }
}

export default SvgEvent;
