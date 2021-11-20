import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class VerificationCodes extends BaseSchema {
  protected tableName = 'verification_codes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('code').notNullable()
      table.integer('user_id', 10).unsigned()
      table.timestamps(true, true)
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropForeign('user_id')
    })

    this.schema.dropTable(this.tableName)
  }
}
