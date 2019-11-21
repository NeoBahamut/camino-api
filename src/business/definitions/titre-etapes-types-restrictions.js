const titreEtapesTypesRestrictions = [
  {
    condition: { etape: { typeId: 'mfr' } },
    obligatoireApresUne: null,
    // impossible après toute étape
    impossibleApresUne: '*'
  },
  {
    condition: { etape: { typeId: 'ret' } },
    obligatoireApresUne: { typeId: 'mfr' },
    impossibleApresUne: { typeId: 'sco' }
  },
  {
    condition: { etape: { typeId: 'mdp' } },
    obligatoireApresUne: { typeId: 'mfr' },
    impossibleApresUne: { typeId: 'mcr' }
  },
  {
    condition: { etape: { typeId: 'pfd' } },
    obligatoireApresUne: { typeId: 'mfr' },
    impossibleApresUne: { typeId: 'mcr' }
  },

  {
    condition: { etape: { typeId: 'dae' } },
    obligatoireApresUne: { typeId: 'mdp' },
    impossibleApresUne: { typeId: 'mcr' }
  },
  {
    condition: { etape: { typeId: 'mod' } },
    obligatoireApresUne: { typeId: 'mdp' },
    impossibleApresUne: { typeId: 'mcr' }
  },
  {
    condition: { etape: { typeId: 'mco' } },
    obligatoireApresUne: { typeId: 'mdp' },
    impossibleApresUne: { typeId: 'mcr' }
  },
  {
    condition: { etape: { typeId: 'rco' } },
    obligatoireApresUne: { typeId: 'mdp' },
    impossibleApresUne: { typeId: 'mcr' }
  },

  {
    condition: { etape: { typeId: 'mcr' } },
    obligatoireApresUne: { typeId: 'pfd' },
    impossibleApresUne: { typeId: 'aca', statutId: ['def', 'fav'] }
  },
  {
    condition: { etape: { typeId: 'edm' } },
    obligatoireApresUne: { typeId: 'mcr', statutId: 'fav' },
    impossibleApresUne: { typeId: 'aca', statutId: ['def', 'fav'] }
  },
  {
    condition: { etape: { typeId: 'ede' } },
    obligatoireApresUne: { typeId: 'mcr', statutId: 'fav' },
    impossibleApresUne: { typeId: 'aca', statutId: ['def', 'fav'] }
  },
  {
    condition: { etape: { typeId: 'rde' } },
    obligatoireApresUne: { typeId: 'mcr', statutId: 'fav' },
    impossibleApresUne: { typeId: 'aca', statutId: ['def', 'fav'] }
  },
  {
    condition: { etape: { typeId: 'eof' } },
    obligatoireApresUne: { typeId: 'mcr', statutId: 'fav' },
    impossibleApresUne: { typeId: 'aca', statutId: ['def', 'fav'] }
  },
  {
    condition: { etape: { typeId: 'aof' } },
    obligatoireApresUne: { typeId: 'mcr', statutId: 'fav' },
    impossibleApresUne: { typeId: 'aca', statutId: ['def', 'fav'] }
  },

  {
    condition: { etape: { typeId: 'aca' } },
    obligatoireApresUne: { typeId: 'mcr', statutId: 'fav' },
    impossibleApresUne: { typeId: 'aca', statutId: ['def', 'fav'] }
  },

  {
    condition: {
      titre: { contenu: { onf: { mecanisee: false } } },
      etape: { typeId: 'mno' }
    },
    obligatoireApresUne: { typeId: 'aca', statutId: 'fav' },
    impossibleApresUne: { typeId: 'sco' }
  },
  {
    condition: {
      titre: { contenu: { onf: { mecanisee: false } } },
      etape: { typeId: 'sco' }
    },
    obligatoireApresUne: { typeId: 'mno' },
    impossibleApresUne: { typeId: 'aco' }
  },
  {
    condition: {
      titre: { contenu: { onf: { mecanisee: true } } },
      etape: { typeId: 'mno' }
    },
    obligatoireApresUne: { typeId: 'aca', statutId: 'fav' },
    impossibleApresUne: { typeId: 'pfc' }
  },
  {
    condition: {
      titre: { contenu: { onf: { mecanisee: true } } },
      etape: { typeId: 'pfc' }
    },
    obligatoireApresUne: { typeId: 'mno', statutId: 'fav' },
    impossibleApresUne: { typeId: 'sco' }
  },
  {
    condition: {
      titre: { contenu: { onf: { mecanisee: true } } },
      etape: { typeId: 'sco' }
    },
    obligatoireApresUne: { typeId: 'pfc' },
    impossibleApresUne: { typeId: 'aco' }
  },
  {
    condition: { etape: { typeId: 'aco' } },
    obligatoireApresUne: { typeId: 'sco' },
    impossibleApresUne: null
  }
]

export default titreEtapesTypesRestrictions