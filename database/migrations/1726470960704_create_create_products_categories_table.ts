import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ProductsCategories extends BaseSchema {
  protected tableName = 'products_categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary()
      table.integer('product_id').unsigned().notNullable()
      table.integer('category_id').unsigned().notNullable()
      table.timestamps(true, true)

      // Đặt khóa ngoại
      table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE')
      table.foreign('category_id').references('id').inTable('categories').onDelete('CASCADE')

      // Đảm bảo sự kết hợp duy nhất giữa product_id và category_id
      table.unique(['product_id', 'category_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
