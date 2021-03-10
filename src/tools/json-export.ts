import 'dotenv/config'
import { writeFileSync } from 'fs'
import knex from '../init'

// TODO : remplacer par 'sources'
const repSources = 'sourcesJson'

// Liste des noms des tables à sauvegarder au format json
const tablesNames = [
  'activites_statuts',
  'activites_types__administrations',
  'activites_types__documents_types',
  'activites_types__pays',
  'activites_types',
  'administrations__titres_types__etapes_types',
  'administrations__titres_types__titres_statuts',
  'administrations__titres_types',
  'administrations_types',
  'administrations',
  'annees',
  'definitions',
  'demarches_statuts',
  'demarches_types',
  'departements',
  'devises',
  'documents_types',
  'domaines',
  'etapes_statuts',
  'etapes_types__etapes_statuts',
  'etapes_types',
  'frequences',
  'geo_systemes',
  'globales',
  'mois',
  'pays',
  'permissions',
  'phases_statuts',
  'references_types',
  'regions',
  'substances__substances_legales',
  'substances_legales_codes',
  'substances_legales',
  'substances',
  'titres_statuts',
  'titres_types__activites_types',
  'titres_types__demarches_types__etapes_types',
  'titres_types__demarches_types',
  'titres_types__titres_statuts',
  'titres_types_types',
  'titres_types',
  'travaux_types__etapes_types',
  'travaux_types',
  'trimestres',
  'unites'
]

const jsonSourceFilesExport = () => {
  tablesNames.forEach(async tableName => {
    const jsonFileName = `${tableName.replace(/_/g, '-')}.json`
    const filePath = `${repSources}/${jsonFileName}`

    const res = await knex.from(tableName)

    if (res) {
      writeFileSync(filePath, JSON.stringify(res))
    } else {
      console.log(tableName)
    }
  })
  // process.exit(0)
}

const main = () => jsonSourceFilesExport()
main()

export default jsonSourceFilesExport
