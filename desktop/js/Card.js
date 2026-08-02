/**
 * Composant générique de carte réutilisable pour l'interface desktop.
 */
export class Card {
  /**
   * Crée une instance de carte.
   * @param {object} [options={}] Options du composant.
   */
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Rend la carte.
   * @returns {HTMLElement}
   */
  render() {
    const card = document.createElement('section');
    card.className = 'card';
    return card;
  }
}

export default Card;
