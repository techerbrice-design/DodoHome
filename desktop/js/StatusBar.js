/**
 * Composant de barre d'état inférieure de l'interface desktop.
 */
export class StatusBar {
  /**
   * Crée une instance de la barre d'état.
   * @param {object} [options={}] Options du composant.
   */
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Rend la barre d'état.
   * @returns {HTMLElement}
   */
  render() {
    const statusBar = document.createElement('footer');
    statusBar.className = 'statusbar';
    return statusBar;
  }
}

export default StatusBar;
