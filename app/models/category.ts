import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import Product from './product.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { nanoid } from 'nanoid'
export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  @manyToMany(() => Product, {
    pivotTable: 'products_categories',
  })
  declare products: ManyToMany<typeof Product>

   
  @beforeCreate()
  public static assignUuid(category: Category) {
    category.id = nanoid() // Tạo id duy nhất
  }
}
