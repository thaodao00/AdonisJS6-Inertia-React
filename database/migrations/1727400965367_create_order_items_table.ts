import { BaseSchema } from '@adonisjs/lucid/schema'

export default class OrderItems extends BaseSchema {
  protected tableName = 'order_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('order_id').notNullable()
      table.string('product_id').notNullable()
      table.integer('quantity').unsigned().notNullable()
      table.timestamps(true, true)

      // Đặt khóa ngoại
      table.foreign('order_id').references('orders.id').onDelete('CASCADE')
      table.foreign('product_id').references('products.id').onDelete('RESTRICT')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}