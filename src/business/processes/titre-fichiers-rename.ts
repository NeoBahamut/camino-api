import fileRename from '../../tools/file-rename'
import {
  ITitre,
  ITitreDemarche,
  ITitreEtape,
  ITitreDocument
} from '../../types'

interface Index {
  [id: string]: any
}

const titreDocumentsFichiersNamesFind = (
  titreDocuments: ITitreDocument[] | undefined | null,
  titreId: string,
  oldTitreId: string
) => {
  if (!titreDocuments || !titreDocuments.length) {
    return []
  }

  return titreDocuments.reduce((fichiersNames: Index[], titreDocument) => {
    if (titreDocument.fichier) {
      const oldTitreDocumentId = titreDocument.id.replace(titreId, oldTitreId)

      fichiersNames.push({
        [`${titreDocument.id}.${titreDocument.fichierTypeId}`]: `${oldTitreDocumentId}.${titreDocument.fichierTypeId}`
      })
    }

    return fichiersNames
  }, [])
}

const titreEtapesFichiersNamesFind = (
  titreEtapes: ITitreEtape[] | undefined | null,
  titreId: string,
  oldTitreId: string
) => {
  if (!titreEtapes || !titreEtapes.length) {
    return []
  }

  return titreEtapes.reduce((fichiersNames: Index[], titreEtape) => {
    fichiersNames.push(
      ...titreDocumentsFichiersNamesFind(
        titreEtape.documents,
        titreId,
        oldTitreId
      )
    )

    return fichiersNames
  }, [])
}

const titreFichiersNamesFind = (
  titreDemarches: ITitreDemarche[] | undefined | null,
  titreId: string,
  oldTitreId: string
) => {
  if (!titreDemarches || !titreDemarches.length) {
    return []
  }

  return titreDemarches.reduce((fichiersNames: Index[], titreDemarche) => {
    fichiersNames.push(
      ...titreEtapesFichiersNamesFind(titreDemarche.etapes, titreId, oldTitreId)
    )

    return fichiersNames
  }, [])
}

const titreFichiersRename = async (oldTitreId: string, titre: ITitre) => {
  const titreFichiersNames = titreFichiersNamesFind(
    titre.demarches,
    titre.id,
    oldTitreId
  )

  for (const fileNames of titreFichiersNames) {
    for (const [fileName, oldFileName] of Object.entries(fileNames)) {
      if (fileName !== oldFileName) {
        await fileRename(oldFileName, fileName)
      }
    }
  }
}

export { titreFichiersRename }
