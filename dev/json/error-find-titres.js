const domainesIds = ['c', 'f', 'g', 'h', 'm', 'r', 's', 'w']

const errorFind = (a, b, join) => {
  const elementsA = domainesIds.flatMap(domaineId =>
    require(`../../sources/titres-${domaineId}-titres-${a}.json`)
  )

  const elementsB = domainesIds.flatMap(domaineId =>
    require(`../../sources/titres-${domaineId}-titres-${b}.json`)
  )

  elementsB.forEach(r => {
    const p = elementsA.find(p => p.id === r[join])

    if (!p) {
      console.info(r)
    }
  })
}

errorFind('etapes', 'documents', 'titre_etape_id')
