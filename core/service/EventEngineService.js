/**
 * Service de moteur d'événements Dodo Home en mode simulation.
 * Valide les événements, identifie leur type et prépare des correspondances vers des scènes.
 */
export class EventEngineService {
  /**
   * Crée une instance du moteur d'événements.
   * @param {object} [options={}] Options du service.
   * @param {Array<object>} [options.events] Événements à traiter.
   * @param {Array<object>} [options.rules] Règles de correspondance.
   * @param {Array<object>} [options.scenes] Scènes disponibles.
   */
  constructor(options = {}) {
    this.events = Array.isArray(options.events) ? options.events : [];
    this.rules = Array.isArray(options.rules) ? options.rules : [];
    this.scenes = Array.isArray(options.scenes) ? options.scenes : [];
    this.matches = [];
    this.executionQueue = [];
  }

  /**
   * Enregistre un événement simulé.
   * @param {object} event Événement à enregistrer.
   * @returns {object}
   */
  registerEvent(event = {}) {
    const validated = this.validateEvent(event);
    if (validated && validated.status !== 'ERROR') {
      this.events.push(validated);
    }
    return validated;
  }

  /**
   * Valide la structure d'un événement.
   * @param {object} [event={}] Événement à valider.
   * @returns {object}
   */
  validateEvent(event = {}) {
    if (!event || typeof event !== 'object') {
      return {
        id: 'invalid_event',
        type: 'unknown',
        source: 'unknown',
        timestamp: '',
        data: {},
        status: 'ERROR',
      };
    }

    const normalized = {
      id: typeof event.id === 'string' && event.id.trim() ? event.id.trim() : `event_${Date.now()}`,
      type: typeof event.type === 'string' && event.type.trim() ? event.type.trim() : this.identifyEventType(event),
      source: typeof event.source === 'string' && event.source.trim() ? event.source.trim() : 'unknown',
      timestamp: typeof event.timestamp === 'string' && event.timestamp.trim() ? event.timestamp.trim() : new Date().toISOString(),
      data: event.data && typeof event.data === 'object' ? event.data : {},
      status: 'READY',
    };

    if (!normalized.type) {
      normalized.status = 'ERROR';
    }

    return normalized;
  }

  /**
   * Identifie le type d'un événement à partir de ses propriétés.
   * @param {object} [event={}] Événement à analyser.
   * @returns {string}
   */
  identifyEventType(event = {}) {
    if (!event || typeof event !== 'object') {
      return 'unknown';
    }

    if (event.type && typeof event.type === 'string') {
      return event.type;
    }

    if (event.data && event.data.presence) {
      return 'presence';
    }

    if (event.data && event.data.motion) {
      return 'motion';
    }

    if (event.data && event.data.temperature !== undefined) {
      return 'temperature';
    }

    if (event.data && event.data.schedule) {
      return 'schedule';
    }

    return 'manual';
  }

  /**
   * Tente de faire correspondre un événement à une scène.
   * @param {object} event Événement à matcher.
   * @returns {object}
   */
  matchScene(event = {}) {
    const normalizedEvent = this.validateEvent(event);
    if (normalizedEvent.status === 'ERROR') {
      return {
        event: normalizedEvent.id,
        scene: '',
        matched: false,
        simulation: ['Événement invalide.'],
      };
    }

    const candidateScene = this.scenes.find((scene) => {
      if (!scene || typeof scene !== 'object') {
        return false;
      }
      const trigger = Array.isArray(scene.trigger) ? scene.trigger : [];
      return trigger.includes(normalizedEvent.type);
    });

    if (candidateScene) {
      return {
        event: normalizedEvent.id,
        scene: candidateScene.name || candidateScene.id || '',
        matched: true,
        simulation: [`Événement ${normalizedEvent.type} associé à la scène ${candidateScene.name || candidateScene.id || ''}.`],
      };
    }

    return {
      event: normalizedEvent.id,
      scene: '',
      matched: false,
      simulation: [`Aucune scène associée à l'événement ${normalizedEvent.type}.`],
    };
  }

  /**
   * Construit la file d'exécution des correspondances.
   * @param {Array<object>} [events=[]] Événements à traiter.
   * @returns {Array<object>}
   */
  buildExecutionQueue(events = []) {
    const queue = [];
    const sourceEvents = Array.isArray(events) && events.length ? events : this.events;

    sourceEvents.forEach((event) => {
      const match = this.matchScene(event);
      queue.push(match);
    });

    this.executionQueue = queue;
    this.matches = queue;
    return queue;
  }

  /**
   * Simule le déclenchement d'un événement.
   * @param {object} [event={}] Événement à simuler.
   * @returns {object}
   */
  simulateTrigger(event = {}) {
    const validatedEvent = this.validateEvent(event);
    const match = this.matchScene(validatedEvent);
    return {
      event: validatedEvent.id,
      type: validatedEvent.type,
      status: match.matched ? 'READY' : 'IGNORED',
      simulation: match.simulation,
    };
  }

  /**
   * Retourne la liste des événements enregistrés.
   * @returns {Array<object>}
   */
  getEvents() {
    return this.events;
  }

  /**
   * Retourne un résumé du moteur d'événements.
   * @returns {object}
   */
  getSummary() {
    const summary = {
      events: this.events.length,
      matched: 0,
      unmatched: 0,
      errors: 0,
    };

    this.matches.forEach((match) => {
      if (match && match.matched) {
        summary.matched += 1;
      } else if (match) {
        summary.unmatched += 1;
      }
    });

    this.events.forEach((event) => {
      if (event && event.status === 'ERROR') {
        summary.errors += 1;
      }
    });

    return summary;
  }
}

export default EventEngineService;
