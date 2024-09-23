import { BaseModel, column, manyToMany } from "@adonisjs/lucid/orm"
import { DateTime } from "luxon"
import Category from "./category.js"
import type { ManyToMany } from "@adonisjs/lucid/types/relations"

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
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
}
