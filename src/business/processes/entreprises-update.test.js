import entrepriseUpdate from './entreprises-update'
import * as apiEntreprises from '../../tools/api-insee'

import {
  entreprisesDbCreees,
  entreprisesEtablissementsDbCreees,
  entreprisesApiCreees,
  entreprisesDbModifiees,
  entreprisesEtablissementsDbModifies,
  entreprisesApiModifiees,
  entreprisesDbExistantes,
  entreprisesEtablissementsDbExistants,
  entreprisesApiExistantes,
  entreprisesEtablissementsApiExistantes,
  entreprisesDbInexistantes,
  entreprisesEtablissementsDbInexistants,
  entreprisesApiInexistantes
} from './__mocks__/entreprises-update'

// 'jest.mock()` est hoisté avant l'import, le court-circuitant
// https://jestjs.io/docs/en/jest-object#jestdomockmodulename-factory-options
jest.mock('../../database/queries/entreprises', () => ({
  entreprisesUpsert: jest.fn().mockImplementation(a => a)
}))

jest.mock('../../database/queries/entreprises-etablissements', () => ({
  entreprisesEtablissementsUpsert: jest.fn().mockImplementation(a => a)
}))

// 'jest.mock()' est hoisté avant l'import, le court-circuitant
// https://jestjs.io/docs/en/jest-object#jestdomockmodulename-factory-options
jest.mock('../../tools/api-insee', () => ({
  entrepriseAdresseGet: jest.fn(),
  entrepriseEtablissementGet: jest.fn(),
  tokenInitialize: jest.fn().mockResolvedValue(1)
}))

console.log = jest.fn()
console.info = jest.fn()
console.error = jest.fn()

describe('entreprises', () => {
  test("crée les entreprises si elles n'existent pas", async () => {
    apiEntreprises.entrepriseAdresseGet.mockResolvedValue(entreprisesApiCreees)
    apiEntreprises.entrepriseEtablissementGet.mockResolvedValue(
      entreprisesApiCreees
    )

    const [etablissementsUpdated, entreprisesUpdated] = await entrepriseUpdate(
      entreprisesDbCreees,
      entreprisesEtablissementsDbCreees
    )

    expect(etablissementsUpdated.length).toEqual(1)
    expect(entreprisesUpdated.length).toEqual(1)
    expect(console.log).toHaveBeenCalled()
    expect(console.info).toHaveBeenCalled()
  })

  test('met à jour les entreprises qui ont été modifiées', async () => {
    apiEntreprises.entrepriseAdresseGet.mockResolvedValue(
      entreprisesApiModifiees
    )
    apiEntreprises.entrepriseEtablissementGet.mockResolvedValue(
      entreprisesApiModifiees
    )

    const [etablissementsUpdated, entreprisesUpdated] = await entrepriseUpdate(
      entreprisesDbModifiees,
      entreprisesEtablissementsDbModifies
    )

    expect(etablissementsUpdated.length).toEqual(1)
    expect(entreprisesUpdated.length).toEqual(1)
    expect(console.log).toHaveBeenCalled()
  })

  test('ne crée pas les entreprises qui existent déjà', async () => {
    apiEntreprises.entrepriseAdresseGet.mockResolvedValue(
      entreprisesApiExistantes
    )
    apiEntreprises.entrepriseEtablissementGet.mockResolvedValue(
      entreprisesEtablissementsApiExistantes
    )

    const [entreprisesUpdated, etablissementsUpdated] = await entrepriseUpdate(
      entreprisesDbExistantes,
      entreprisesEtablissementsDbExistants
    )

    expect(entreprisesUpdated.length).toEqual(0)
    expect(etablissementsUpdated.length).toEqual(0)
    expect(console.log).not.toHaveBeenCalled()
  })

  test("ne modifie pas d'entreprises si elles n'existent déjà", async () => {
    apiEntreprises.entrepriseAdresseGet.mockResolvedValue(
      entreprisesApiInexistantes
    )
    apiEntreprises.entrepriseEtablissementGet.mockResolvedValue(
      entreprisesApiInexistantes
    )

    const [etablissementsUpdated, entreprisesUpdated] = await entrepriseUpdate(
      entreprisesDbInexistantes,
      entreprisesEtablissementsDbInexistants
    )

    expect(etablissementsUpdated.length).toEqual(0)
    expect(entreprisesUpdated.length).toEqual(0)
    expect(console.log).not.toHaveBeenCalled()
  })

  test("retourne un message d'erreur si le token d'accès à l'api Siren ne fonctionne pas", async () => {
    apiEntreprises.tokenInitialize.mockResolvedValue(null)

    const [etablissementsUpdated, entreprisesUpdated] = await entrepriseUpdate(
      entreprisesDbCreees,
      entreprisesEtablissementsDbCreees
    )

    expect(etablissementsUpdated.length).toEqual(0)
    expect(entreprisesUpdated.length).toEqual(0)
    expect(console.log).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalled()
  })
})
