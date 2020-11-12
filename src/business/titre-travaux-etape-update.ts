import { titreTravauxGet } from '../database/queries/titres-travaux'
import titresTravauxEtapesOrdreUpdate from './processes/titres-travaux-etapes-ordre-update'
import titresTravauxOrdreUpdate from './processes/titres-travaux-ordre-update'

const titreTravauxEtapeUpdate = async (titreTravauxId: string) => {
  try {
    console.info()
    console.info('- - -')
    console.info(`mise à jour d'une étape de travaux : ${titreTravauxId}`)
    console.info()

    const titreTravaux = await titreTravauxGet(titreTravauxId, {
      fields: {
        etapes: { id: {} },
        type: { etapesTypes: { id: {} } },
        titre: { id: {} }
      }
    })

    if (!titreTravaux) {
      throw new Error(`les travaux ${titreTravaux} n'existent pas`)
    }

    const titresTravauxEtapesOrdreUpdated = await titresTravauxEtapesOrdreUpdate(
      [titreTravauxId]
    )
    const titreId = titreTravaux.titreId
    const titresTravauxOrdreUpdated = await titresTravauxOrdreUpdate([titreId])

    console.info()
    console.info('-')
    console.info('tâches exécutées:')
    if (titresTravauxEtapesOrdreUpdated.length) {
      console.info(
        `mise à jour: ${titresTravauxEtapesOrdreUpdated.length} étape(s) de travaux (ordre)`
      )
    }

    if (titresTravauxOrdreUpdated.length) {
      console.info(
        `mise à jour: ${titresTravauxOrdreUpdated.length} démarche(s) (ordre)`
      )
    }

    return titreId
  } catch (e) {
    console.error(`erreur: titreTravauxEtapeUpdate ${titreTravauxId}`)
    console.error(e)
    throw e
  }
}

export default titreTravauxEtapeUpdate
