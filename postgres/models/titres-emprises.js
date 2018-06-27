const { Model } = require('objection')
const Emprises = require('./emprises')

class TitresEmprises extends Model {
  static get tableName() {
    return 'titres_emprises'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['emprises_id', 'titre_demarche_etape_id'],

      properties: {
        emprise_id: { type: 'string', maxLength: 3 },
        titre_demarche_etape_id: { type: 'string', maxLength: 128 }
      }
    }
  }

  static get relationMappings() {
    return {
      substance: {
        relation: Model.BelongsToOneRelation,
        modelClass: Emprises,
        join: {
          from: 'titres_titulaires.emprise_id',
          to: 'emprises.id'
        }
      }
    }
  }
}

module.exports = TitresEmprises
