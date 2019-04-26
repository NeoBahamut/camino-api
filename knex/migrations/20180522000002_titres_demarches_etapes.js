exports.up = knex => {
  return knex.schema
    .createTable('titresDemarches', table => {
      table.string('id', 128).primary()
      table.string('titreId', 128).notNullable()
      table
        .foreign('titreId')
        .references('titres.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .string('typeId', 3)
        .notNullable()
        .references('demarchesTypes.id')
      table
        .string('statutId', 3)
        .notNullable()
        .references('demarchesStatuts.id')
        .defaultTo('ind')
      table.integer('ordre')
      table.string('annulationTitreDemarcheId', 128).references('id')
    })
    .createTable('titresDemarchesLiens', table => {
      table.string('enfantTitreDemarcheId', 128)
      table
        .foreign('enfantTitreDemarcheId')
        .references('titresDemarches.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('parentTitreDemarcheId', 128)
      table
        .foreign('parentTitreDemarcheId')
        .references('titresDemarches.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.primary(['enfantTitreDemarcheId', 'parentTitreDemarcheId'])
    })
    .createTable('titresPhases', table => {
      table.string('titreDemarcheId', 128).primary()
      table
        .foreign('titreDemarcheId')
        .references('titresDemarches.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .string('statutId', 3)
        .notNullable()
        .references('phasesStatuts.id')
      table.date('dateDebut')
      table.date('dateFin')
    })
    .createTable('titresEtapes', table => {
      table.string('id', 128).primary()
      table.string('titreDemarcheId', 128).notNullable()
      table
        .foreign('titreDemarcheId')
        .references('titresDemarches.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .string('typeId', 3)
        .notNullable()
        .references('etapesTypes.id')
      table
        .string('statutId', 3)
        .notNullable()
        .references('etapesStatuts.id')
      table.integer('ordre')
      table.date('date').notNullable()
      table.date('dateDebut')
      table.date('dateFin')
      table.integer('duree')
      table.float('surface')
      table.float('volume')
      table.string('volumeUniteId').references('volumeUnites.id')
      table.specificType('visas', 'text[]')
      table.float('engagement')
      table.string('engagementDeviseId').references('devises.id')
      table.boolean('sourceIndisponible')
    })
    .alterTable('titres', table => {
      table.string('pointsTitreEtapeId', 128)
      table
        .foreign('pointsTitreEtapeId')
        .references('titresEtapes.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('titulairesTitreEtapeId', 128)
      table
        .foreign('titulairesTitreEtapeId')
        .references('titresEtapes.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('amodiatairesTitreEtapeId', 128)
      table
        .foreign('amodiatairesTitreEtapeId')
        .references('titresEtapes.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('administrationsTitreEtapeId', 128)
      table
        .foreign('administrationsTitreEtapeId')
        .references('titresEtapes.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('surfaceTitreEtapeId', 128)
      table
        .foreign('surfaceTitreEtapeId')
        .references('titresEtapes.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('volumeTitreEtapeId', 128)
      table
        .foreign('volumeTitreEtapeId')
        .references('titresEtapes.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('volumeUniteIdTitreEtapeId', 128)
      table
        .foreign('volumeUniteIdTitreEtapeId')
        .references('titresEtapes.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('substancesTitreEtapeId', 128)
      table
        .foreign('substancesTitreEtapeId')
        .references('titresEtapes.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('communesTitreEtapeId', 128)
      table
        .foreign('communesTitreEtapeId')
        .references('titresEtapes.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('engagementTitreEtapeId', 128)
      table
        .foreign('engagementTitreEtapeId')
        .references('titresEtapes.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('engagementDeviseIdTitreEtapeId', 128)
      table
        .foreign('engagementDeviseIdTitreEtapeId')
        .references('titresEtapes.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
}

exports.down = knex => {
  return knex.schema
    .alterTable('titres', table => {
      table.dropColumn('substancesTitreEtapeId')
      table.dropColumn('pointsTitreEtapeId')
      table.dropColumn('titulairesTitreEtapeId')
      table.dropColumn('amodiatairesTitreEtapeId')
      table.dropColumn('administrationsTitreEtapeId')
      table.dropColumn('surfaceTitreEtapeId')
      table.dropColumn('volumeTitreEtapeId')
      table.dropColumn('volumeUniteIdTitreEtapeId')
      table.dropColumn('communesTitreEtapeId')
      table.dropColumn('engagementTitreEtapeId')
      table.dropColumn('engagementDeviseIdTitreEtapeId')
    })
    .dropTable('titresEtapes')
    .dropTable('titresPhases')
    .dropTable('titresDemarchesLiens')
    .dropTable('titresDemarches')
}
