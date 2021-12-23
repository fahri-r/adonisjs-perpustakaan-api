import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Books extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.text('description')
      table.integer('year').notNullable()
      table.string('author').notNullable()
      table.string('qty').notNullable()
      table.string('page').notNullable()
      table.integer('category_id', 10).unsigned()
      table.integer('publisher_id', 10).unsigned()
      table.timestamps(true, true)
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('category_id').references('categories.id').onDelete('SET NULL')
      table.foreign('publisher_id').references('publishers.id').onDelete('SET NULL')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('category_id')
      table.dropForeign('publisher_id')
    })
    
    this.schema.dropTable(this.tableName)
  }
}
