import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import Cart from './cart.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from './product.js'
import { nanoid } from 'nanoid'
export default class CartItems extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare cartId: string
  @column()
  declare productId: string
  @column()
  declare quantity: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Cart)
  declare cart: BelongsTo<typeof Cart>

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

   
  @beforeCreate()
  public static assignUuid(cartItem: CartItems) {
    cartItem.id = nanoid() // Tạo id duy nhất
  }
}
