import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'order_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE')
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE')
      table.integer('quantity').unsigned().notNullable().defaultTo(1)
      table.decimal('price', 12, 2).notNullable()
      table.timestamps(true, true) 
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}