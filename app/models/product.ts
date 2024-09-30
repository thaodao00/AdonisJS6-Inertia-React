import { BaseModel, beforeCreate, column, hasMany, manyToMany } from "@adonisjs/lucid/orm"
import { DateTime } from "luxon"
import Category from "./category.js"
import type { HasMany, ManyToMany } from "@adonisjs/lucid/types/relations"
import CartItems from "./cart_items.js"
import { nanoid } from "nanoid"
export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: string
  @column()
  declare image: string
  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare price: number

  @column()
  declare stock: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Category, {
    pivotTable: 'products_categories',
  })
  declare categories: ManyToMany<typeof Category>

  @hasMany(() => CartItems)
  declare items: HasMany<typeof CartItems>

  
  @beforeCreate()
  public static assignUuid(product: Product) {
    product.id = nanoid() // Tạo id duy nhất
  }
}
