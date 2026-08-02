/**
 * Bus d'événements interne pour la communication légère entre composants.
 */
export class EventBus {
  /**
   * Crée l'instance du bus d'événements.
   */
  constructor() {
    this.listeners = new Map();
  }

  /**
   * S'abonne à un événement.
   * @param {string} eventName Nom de l'événement.
   * @param {function(...any[]): void} handler Gestionnaire à appeler.
   * @returns {EventBus}
   */
  on(eventName, handler) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName).add(handler);
    return this;
  }

  /**
   * Supprime un abonnement.
   * @param {string} eventName Nom de l'événement.
   * @param {function(...any[]): void} handler Gestionnaire à supprimer.
   * @returns {EventBus}
   */
  off(eventName, handler) {
    if (!this.listeners.has(eventName)) {
      return this;
    }
    this.listeners.get(eventName).delete(handler);
    return this;
  }

  /**
   * Émet un événement à tous les abonnés.
   * @param {string} eventName Nom de l'événement.
   * @param {...any[]} args Arguments à transmettre.
   * @returns {EventBus}
   */
  emit(eventName, ...args) {
    if (!this.listeners.has(eventName)) {
      return this;
    }
    for (const handler of this.listeners.get(eventName)) {
      handler(...args);
    }
    return this;
  }

  /**
   * S'abonne une seule fois à un événement.
   * @param {string} eventName Nom de l'événement.
   * @param {function(...any[]): void} handler Gestionnaire à appeler une seule fois.
   * @returns {EventBus}
   */
  once(eventName, handler) {
    const onceHandler = (...args) => {
      this.off(eventName, onceHandler);
      handler(...args);
    };
    return this.on(eventName, onceHandler);
  }
}

export default EventBus;
