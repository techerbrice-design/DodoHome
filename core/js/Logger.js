/**
 * Journaliseur simple pour l'application DodoHome.
 * Permet d'émettre des logs structurés sans dépendre d'une librairie externe.
 */
export class Logger {
  /**
   * Crée un journaliseur.
   * @param {string} [scope='DodoHome'] Nom du contexte de log.
   */
  constructor(scope = 'DodoHome') {
    this.scope = scope;
  }

  /**
   * Journalise un message d'information.
   * @param {string} message Message à enregistrer.
   * @param {...any[]} args Arguments complémentaires.
   */
  info(message, ...args) {
    console.info(`[${this.scope}]`, message, ...args);
  }

  /**
   * Journalise un message d'avertissement.
   * @param {string} message Message à enregistrer.
   * @param {...any[]} args Arguments complémentaires.
   */
  warning(message, ...args) {
    console.warn(`[${this.scope}]`, message, ...args);
  }

  /**
   * Journalise un message d'erreur.
   * @param {string} message Message à enregistrer.
   * @param {...any[]} args Arguments complémentaires.
   */
  error(message, ...args) {
    console.error(`[${this.scope}]`, message, ...args);
  }

  /**
   * Journalise un message de débogage.
   * @param {string} message Message à enregistrer.
   * @param {...any[]} args Arguments complémentaires.
   */
  debug(message, ...args) {
    console.debug(`[${this.scope}]`, message, ...args);
  }
}

export default Logger;
