import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cart_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('cart_id').unsigned().references('id').inTable('carts').onDelete('CASCADE')
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE')
      table.integer('quantity').unsigned().notNullable().defaultTo(1)
      table.timestamps(true, true) 
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}