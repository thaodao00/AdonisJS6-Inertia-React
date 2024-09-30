import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import OrderItems from './order_items.js'
import { nanoid } from 'nanoid'
export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare status: 'pending' | 'processing' | 'completed' | 'canceled'

  @column()
  declare phone: string

  @column()
  declare address: string

  @column()
  declare totalAmount: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => OrderItems)
  declare orderItems: HasMany<typeof OrderItems>

   
  @beforeCreate()
  public static assignUuid(order: Order) {
    order.id = nanoid() // Tạo id duy nhất
  }
}
