/**
 * Représente un objet graphique SVG enregistré par le moteur.
 */
export class SvgObject {
  /**
   * Crée un objet SVG.
   * @param {object} [data={}] Données de l'objet.
   * @param {string} [data.id=''] Identifiant de l'objet.
   * @param {string} [data.type='shape'] Type d'objet.
   * @param {object|null} [data.element=null] Élément SVG associé.
   * @param {object} [data.state={}] État visuel actuel.
   */
  constructor(data = {}) {
    this.id = data.id || '';
    this.type = data.type || 'shape';
    this.element = data.element || null;
    this.state = data.state || {};
  }

  /**
   * Sélectionne l'objet.
   * @returns {SvgObject}
   */
  select() {
    this.state.selected = true;
    return this;
  }

  /**
   * Désélectionne l'objet.
   * @returns {SvgObject}
   */
  unselect() {
    this.state.selected = false;
    return this;
  }

  /**
   * Applique un état visuel à l'objet.
   * @param {object} state Nouvel état à appliquer.
   * @returns {SvgObject}
   */
  setState(state) {
    this.state = { ...this.state, ...state };
    return this;
  }

  /**
   * Sérialise l'objet SVG.
   * @returns {object}
   */
  serialize() {
    return {
      id: this.id,
      type: this.type,
      element: this.element,
      state: this.state,
    };
  }
}

export default SvgObject;
