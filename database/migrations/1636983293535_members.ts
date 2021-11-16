import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Members extends BaseSchema {
  protected tableName = 'members'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.text('address')
      table.string('phone', 20)
      table.string('image')
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
