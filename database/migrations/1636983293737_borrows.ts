import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Borrows extends BaseSchema {
  protected tableName = 'borrows'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('employee_id', 10).unsigned()
      table.integer('member_id', 10).unsigned()
      table.integer('book_id', 10).unsigned()
      table.date('borrow_date').notNullable()
      table.date('return_date').notNullable()
      table.boolean('status').defaultTo(false)
      table.timestamps(true, true)
    })
    
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('employee_id').references('employees.id').onDelete('SET NULL')
      table.foreign('member_id').references('members.id').onDelete('SET NULL')
      table.foreign('book_id').references('books.id').onDelete('SET NULL')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('employee_id')
      table.dropForeign('member_id')
      table.dropForeign('book_id')
    })

    this.schema.dropTable(this.tableName)
  }
}
