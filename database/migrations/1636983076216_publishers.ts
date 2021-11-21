import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Publishers extends BaseSchema {
  protected tableName = 'publishers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('address').notNullable()
      table.string('phone', 20).notNullable()
      table.timestamps(true,true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
