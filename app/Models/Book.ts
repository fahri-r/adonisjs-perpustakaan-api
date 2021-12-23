import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import Publisher from './Publisher'
import Borrow from './Borrow'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public year: number

  @column()
  public qty: number

  @column()
  public page: number

  @column()
  public author: string
  
  @column()
  public categoryId: number
  
  @column()
  public publisherId: number

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>
  
  @belongsTo(() => Publisher)
  public publisher: BelongsTo<typeof Publisher>

  @hasMany(() => Borrow)
  public borrows: HasMany<typeof Borrow>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
