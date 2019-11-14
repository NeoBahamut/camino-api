import { debug } from '../../config/index'

import restrictions from './_restrictions'

import fieldsBuild from './_fields-build'
import eagerBuild from './_eager-build'

import {
  typesGet,
  domainesGet,
  statutsGet,
  devisesGet,
  geoSystemesGet,
  unitesGet,
  documentsTypesGet,
  referencesTypesGet
} from '../../database/queries/metas'

const metas = async (variables, context, info) => {
  try {
    const devises = await devisesGet()
    const geoSystemes = await geoSystemesGet()
    const unites = await unitesGet()
    const documentsTypes = await documentsTypesGet()
    const referencesTypes = await referencesTypesGet()

    let domaines = await domainesGet()
    let statuts = await statutsGet()

    const fields = fieldsBuild(info)
    const typesEager = eagerBuild(fields.types, 'types')
    const types = await typesGet({ eager: typesEager })

    if (!context.user) {
      domaines = domaines.filter(
        domaine => !restrictions.domaines.find(d => d.domaineId === domaine.id)
      )
      statuts = statuts.filter(
        statut => !restrictions.statutIds.find(d => d === statut.id)
      )
    }

    return {
      domaines,
      statuts,
      types,
      devises,
      documentsTypes,
      referencesTypes,
      geoSystemes,
      unites
    }
  } catch (e) {
    if (debug) {
      console.error(e)
    }

    throw e
  }
}

export { metas }
