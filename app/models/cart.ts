import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import CartItems from './cart_items.js'
import { nanoid } from 'nanoid'
export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare totalPrice: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => CartItems)
  declare cartItems: HasMany<typeof CartItems>

   
  @beforeCreate()
  public static assignUuid(cart: Cart) {
    cart.id = nanoid() // Tạo id duy nhất
  }
}
