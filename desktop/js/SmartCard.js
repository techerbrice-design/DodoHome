/**
 * Composant générique de carte intelligente pour le dashboard Dodo Home.
 * Il prépare une structure réutilisable pour des vues de synthèse premium.
 */
export class SmartCard {
  /**
   * Crée une instance de carte intelligente.
   * @param {object} [options={}] Options de la carte.
   */
  constructor(options = {}) {
    this.options = options || {};
    this.data = {
      id: options.id || '',
      type: options.type || 'SYSTEM',
      title: options.title || 'Carte',
      value: options.value || '',
      status: options.status || 'READY',
      metadata: options.metadata || {},
      importance: options.importance || 'normal',
    };
  }

  /**
   * Définit les données de la carte.
   * @param {object} [data={}] Données de la carte.
   */
  setData(data = {}) {
    this.data = {
      id: data.id || this.data.id,
      type: data.type || this.data.type,
      title: data.title || this.data.title,
      value: data.value || this.data.value,
      status: data.status || this.data.status,
      metadata: data.metadata || this.data.metadata,
      importance: data.importance || this.data.importance,
    };
    return this.data;
  }

  /**
   * Met à jour la carte avec de nouvelles données.
   * @param {object} [data={}] Nouvelles données.
   */
  update(data = {}) {
    return this.setData(data);
  }

  /**
   * Retourne l'état courant de la carte.
   * @returns {string}
   */
  getState() {
    return this.data.status || 'READY';
  }

  /**
   * Rend la carte sous forme d'élément DOM.
   * @returns {HTMLElement}
   */
  render() {
    const card = document.createElement('section');
    card.className = 'card panel';
    card.dataset.cardType = this.data.type || 'SYSTEM';

    const title = document.createElement('h3');
    title.textContent = this.data.title || 'Carte';

    const value = document.createElement('p');
    value.textContent = this.data.value || '';

    const status = document.createElement('p');
    status.textContent = this.data.status || 'READY';

    card.appendChild(title);
    card.appendChild(value);
    card.appendChild(status);

    return card;
  }
}

export default SmartCard;
