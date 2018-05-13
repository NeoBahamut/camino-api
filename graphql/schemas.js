const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    "Liste de titres"
    titres(
      typeId: [TypeId]
      domaineId: [DomaineId]
      travauxId: [TravauxId]
    ): [Titre]

    "Un titre"
    titre(id: String!): Titre
  }

  "Titre minier"
  type Titre {
    """
    L'__id__ du titre est constituée de la concaténation:
    - du type en 3 lettres.
    - du nom du titre en minuscule, sans caractères spéciaux, avec des tirets au lieu des espaces.

    Exemples: _con-saint-elie_ ou _per-pedral_.
    """
    id: ID!
    nom: String!
    type: Type!
    domaine: Domaine!
    statut: Statut!
    travaux: Travaux!
  }

  type Type {
    id: TypeId!
    nom: TypeNom!
  }

  type Domaine {
    id: DomaineId!
    nom: DomaineNom!
  }

  type Statut {
    id: StatutId!
    nom: StatutNom!
  }

  type Travaux {
    id: TravauxId!
    nom: TravauxNom!
  }

  type Mutation {
    titreAjouter(titre: TitreInput!): Titre

    titreSupprimer(id: ID!): Titre

    titreModifier(titre: TitreInput!): Titre
  }

  "tauuust"
  input TitreInput {
    """
    L'__id__ du titre est constituée de la concaténation:
    - du type en 3 lettres.
    - du nom du titre en minuscule, sans caractères spéciaux, avec des tirets au lieu des espaces.

    Exemples: _con-saint-elie_ ou _per-pedral_.
    """
    id: ID!
    nom: String!
    type: TypeInput!
    domaine: DomaineInput!
    statut: StatutInput!
    travaux: TravauxInput!
  }

  input TypeInput {
    id: TypeId!
    nom: TypeNom!
  }

  input DomaineInput {
    id: DomaineId!
    nom: DomaineNom!
  }

  input StatutInput {
    id: StatutId!
    nom: StatutNom!
  }

  input TravauxInput {
    id: TravauxId!
    nom: TravauxNom!
  }

  """
  - __aex__: Autorisation d'exploitation
  - __con__: Concession
  - __per__: Permis exclusif de recherches
  """
  enum TypeId {
    aex
    con
    per
  }

  scalar TypeNom

  """
  - __m__: Minéraux et métaux
  - __h__: Substances énergétiques
  - __s__: Stockage
  - __g__: Géothermie
  """
  enum DomaineId {
    m
    h
    s
    g
  }

  scalar DomaineNom

  """
  - __ins__: En instruction
  - __val__: Valide
  - __ech__: Échu
  """
  enum StatutId {
    ins
    val
    ech
  }

  scalar StatutNom

  """
  - __ins__: En instruction
  - __enc__: En cours
  - __ach__: Achevés
  """
  enum TravauxId {
    ins
    enc
    ach
  }

  scalar TravauxNom
`

module.exports = typeDefs
