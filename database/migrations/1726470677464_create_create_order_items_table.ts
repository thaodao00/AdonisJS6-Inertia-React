import { BaseSchema } from '@adonisjs/lucid/schema'

export default class OrderItems extends BaseSchema {
  protected tableName = 'order_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary()
      table.integer('order_id').unsigned().notNullable()
      table.integer('product_id').unsigned().notNullable()
      table.integer('quantity').unsigned().notNullable()
      table.decimal('price', 10, 2).notNullable()
      table.timestamps(true, true)

      // Đặt khóa ngoại
      table.foreign('order_id').references('orders.id').onDelete('CASCADE')
      table.foreign('product_id').references('products.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
