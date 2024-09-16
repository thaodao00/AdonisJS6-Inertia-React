import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary()
      table.integer('user_id').unsigned().notNullable()
      table
        .enum('status', ['pending', 'processing', 'completed', 'canceled'])
        .notNullable()
        .defaultTo('pending')
      table.decimal('total_amount', 10, 2).notNullable()
      table.timestamps(true, true)

      // Đặt khóa ngoại
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
