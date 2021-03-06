import '../database/index'
import { titreGet } from '../database/queries/titres'

import { activitesTypesGet } from '../database/queries/metas'
import titresActivitesUpdate from './processes/titres-activites-update'
import titresStatutIdsUpdate from './processes/titres-statut-ids-update'
import titresPropsEtapeIdUpdate from './processes/titres-props-etape-id-update'
import titresPhasesUpdate from './processes/titres-phases-update'
import titresPropsActivitesUpdate from './processes/titres-props-activites-update'
import titresDatesUpdate from './processes/titres-dates-update'
import titresDemarchesOrdreUpdate from './processes/titres-demarches-ordre-update'
import { titreIdsUpdate } from './processes/titres-ids-update'

const titreDemarcheUpdate = async titreId => {
  // 3.
  console.log('ordre des démarches…')
  let titre = await titreGet(titreId)
  const titresDemarchesOrdreUpdated = await titresDemarchesOrdreUpdate([titre])

  // 4.
  console.log('statut des titres…')
  titre = await titreGet(titreId)
  const titresStatutIdUpdated = await titresStatutIdsUpdate([titre])

  // 5.
  console.log('phases des titres…')
  titre = await titreGet(titreId)
  const titresPhasesUpdated = await titresPhasesUpdate([titre])

  // 6.
  console.log('date de début, de fin et de demande initiale des titres…')
  titre = await titreGet(titreId)
  const titresDatesUpdated = await titresDatesUpdate([titre])

  // 10.
  console.log('propriétés des titres (liens vers les étapes)…')
  titre = await titreGet(titreId)
  const titresPropsEtapeIdUpdated = await titresPropsEtapeIdUpdate([titre])

  // 11.
  // pour les année 2018 et 2019 (en dur)
  console.log()
  console.log('activités des titres…')
  const annees = [2018, 2019]

  titre = await titreGet(titreId)
  const activitesTypes = await activitesTypesGet()
  const titresActivitesNew = await titresActivitesUpdate(
    [titre],
    activitesTypes,
    annees
  )

  // 12.
  console.log()
  console.log('propriétés des titres (activités abs, enc et dep)…')
  titre = await titreGet(titreId)
  const titresPropsActivitesUpdated = await titresPropsActivitesUpdate([titre])

  // 13.
  console.log('ids de titres, démarches, étapes et sous-éléments…')
  titre = await titreGet(titreId, { format: false })
  // titreNew n'est pas formaté
  const titreUpdated = await titreIdsUpdate(titre)

  console.log(
    `mise à jour: ${titresDemarchesOrdreUpdated.length} démarche(s) (ordre)`
  )
  console.log(`mise à jour: ${titresStatutIdUpdated.length} titre(s) (statuts)`)
  console.log(`mise à jour: ${titresPhasesUpdated.length} titre(s) (phases)`)
  console.log(
    `mise à jour: ${titresDatesUpdated.length} titre(s) (propriétés-dates)`
  )
  console.log(
    `mise à jour: ${titresPropsEtapeIdUpdated.length} titres(s) (propriétés-étapes)`
  )
  console.log(`mise à jour: ${titresActivitesNew.length} activités`)
  console.log(
    `mise à jour: ${titresPropsActivitesUpdated.length} titre(s) (propriétés-activités)`
  )
  console.log(`mise à jour: 1 titre(s) (ids)`)

  // on retourne le titre bien formaté
  return titreGet(titreUpdated.id)
}

export default titreDemarcheUpdate
