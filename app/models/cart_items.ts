import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Cart from './cart.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from './product.js'

export default class CartItems extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cartId: number
  @column()
  declare productId: number
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
}
