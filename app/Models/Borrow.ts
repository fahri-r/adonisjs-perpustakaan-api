import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Employee from './Employee'
import Member from './Member'
import Book from './Book'

export default class Borrow extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public bookId: number

  @column()
  public memberId: number
  
  @column()
  public employeeId: number

  @column.date()
  public borrowDate: DateTime

  @column.date()
  public returnDate: DateTime

  @column()
  public status: boolean

  @belongsTo(() => Employee)
  public employee: BelongsTo<typeof Employee>

  @belongsTo(() => Member)
  public member: BelongsTo<typeof Member>

  @belongsTo(() => Book)
  public book: BelongsTo<typeof Book>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
