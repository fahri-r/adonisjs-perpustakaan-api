import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Employees extends BaseSchema {
  protected tableName = 'employees'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('address').notNullable()
      table.string('phone', 20).notNullable()
      table.string('image')
      table.integer('user_id', 10).unsigned()
      table.timestamps(true, true)
    })
    
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('user_id')
    })
    
    this.schema.dropTable(this.tableName)
  }
}
