/**
 * Moteur de gestion des plans SVG interactifs.
 * Permet de charger un document SVG, d'enregistrer des couches et des objets,
 * et de préparer des états visuels futurs.
 */
export class SvgEngine {
  /**
   * Crée une instance du moteur SVG.
   * @param {object} [options={}] Options du moteur.
   */
  constructor(options = {}) {
    this.options = options;
    this.document = null;
    this.layers = new Map();
    this.objects = new Map();
  }

  /**
   * Charge un document SVG.
   * @param {Document|HTMLElement|string} svgDocument Document SVG à charger.
   * @returns {Promise<SvgEngine>}
   */
  async load(svgDocument) {
    this.document = svgDocument;
    return this;
  }

  /**
   * Enregistre une couche SVG.
   * @param {string} id Identifiant de la couche.
   * @param {import('./SvgLayer.js').SvgLayer} layer Couche à enregistrer.
   * @returns {SvgEngine}
   */
  registerLayer(id, layer) {
    this.layers.set(id, layer);
    return this;
  }

  /**
   * Enregistre un objet SVG.
   * @param {string} id Identifiant de l'objet.
   * @param {import('./SvgObject.js').SvgObject} object Objet à enregistrer.
   * @returns {SvgEngine}
   */
  registerObject(id, object) {
    this.objects.set(id, object);
    return this;
  }

  /**
   * Récupère un objet SVG enregistré.
   * @param {string} id Identifiant de l'objet.
   * @returns {import('./SvgObject.js').SvgObject|undefined}
   */
  getObject(id) {
    return this.objects.get(id);
  }

  /**
   * Applique un état visuel à un objet.
   * @param {string} id Identifiant de l'objet.
   * @param {object} state État à appliquer.
   * @returns {SvgEngine}
   */
  setState(id, state) {
    const object = this.getObject(id);
    if (object) {
      object.setState(state);
    }
    return this;
  }
}

export default SvgEngine;
