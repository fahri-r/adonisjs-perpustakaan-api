import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email').unique().notNullable()
      table.boolean('verified').defaultTo(false).notNullable()
      table.string('password').notNullable()
      table.string('telegram_id').unique().nullable()
      table.enum('role', ['admin', 'employee', 'member']).defaultTo('employee').notNullable()
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
