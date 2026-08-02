/**
 * Représente une couche SVG au sein d'un plan interactif.
 */
export class SvgLayer {
  /**
   * Crée une couche SVG.
   * @param {object} [data={}] Données de la couche.
   * @param {string} [data.id=''] Identifiant de la couche.
   * @param {string} [data.name='Layer'] Nom de la couche.
   * @param {Array<object>} [data.objects=[]] Objets contenus dans la couche.
   */
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || 'Layer';
    this.objects = data.objects || [];
  }

  /**
   * Ajoute un objet à la couche.
   * @param {object} object Objet à ajouter.
   * @returns {SvgLayer}
   */
  addObject(object) {
    this.objects.push(object);
    return this;
  }

  /**
   * Supprime un objet de la couche.
   * @param {object} object Objet à supprimer.
   * @returns {SvgLayer}
   */
  removeObject(object) {
    this.objects = this.objects.filter((item) => item !== object);
    return this;
  }

  /**
   * Récupère la liste des objets présents dans la couche.
   * @returns {Array<object>}
   */
  getObjects() {
    return this.objects;
  }
}

export default SvgLayer;
