import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Payments extends BaseSchema {
  protected tableName = 'payments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary()
      table.integer('order_id').unsigned().notNullable()
      table.decimal('amount', 10, 2).notNullable()
      table.enum('payment_method', ['credit_card', 'paypal', 'bank_transfer']).notNullable()
      table.string('transaction_id').nullable()
      table.timestamp('paid_at', { useTz: true }).nullable()
      table.timestamps(true, true)

      // Đặt khóa ngoại

      table.foreign('order_id').references('orders.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
