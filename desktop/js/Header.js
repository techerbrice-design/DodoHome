/**
 * Composant de barre supérieure de l'interface desktop.
 */
export class Header {
  /**
   * Crée une instance de la barre supérieure.
   * @param {object} [options={}] Options du composant.
   */
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Rend la barre supérieure.
   * @returns {HTMLElement}
   */
  render() {
    const header = document.createElement('header');
    header.className = 'topbar';
    return header;
  }
}

export default Header;
