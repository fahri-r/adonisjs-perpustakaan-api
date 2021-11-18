import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Borrow from './Borrow'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public address: string

  @column()
  public phone: string

  @column()
  public image: string

  @column()
  public userId: number

  @belongsTo(() => User, {
    onQuery(query) {
      query.select('id', 'email', 'created_at', 'updated_at')
    }
  })
  public user: BelongsTo<typeof User>

  @hasMany(() => Borrow)
  public borrows: HasMany<typeof Borrow>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
