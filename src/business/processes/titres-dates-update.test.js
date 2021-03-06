import titresDatesUpdate from './titres-dates-update'
import titreDateFinFind from '../rules/titre-date-fin-find'
import titreDateDebutFind from '../rules/titre-date-debut-find'
import titreDateDemandeFind from '../rules/titre-date-demande-find'

jest.mock('../../database/queries/titres', () => ({
  titreUpdate: jest.fn().mockResolvedValue()
}))
jest.mock('../rules/titre-date-fin-find')
jest.mock('../rules/titre-date-debut-find')
jest.mock('../rules/titre-date-demande-find')

console.log = jest.fn()

describe("dates d'un titre", () => {
  test("met à jour les dates d'un titre", async () => {
    titreDateFinFind.mockImplementation(() => '2019-01-01')
    titreDateDebutFind.mockImplementation(() => null)
    titreDateDemandeFind.mockImplementation(() => null)

    const titresDatesUpdated = await titresDatesUpdate([{ id: 'titre-id' }])

    expect(titresDatesUpdated.length).toEqual(1)
    expect(console.log).toHaveBeenCalledTimes(1)
  })

  test('ne met à jour aucun titre', async () => {
    titreDateFinFind.mockImplementation(() => '2019-01-01')
    titreDateDebutFind.mockImplementation(() => null)
    titreDateDemandeFind.mockImplementation(() => null)

    const titresDatesUpdated = await titresDatesUpdate([
      {
        id: 'titre-type-id',
        dateFin: new Date('2019-01-01'),
        dateDebut: null,
        dateDemande: null
      }
    ])

    expect(titresDatesUpdated.length).toEqual(0)
    expect(console.log).toHaveBeenCalledTimes(0)
  })
})
