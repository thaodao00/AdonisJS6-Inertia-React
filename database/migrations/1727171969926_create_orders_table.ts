import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // ID của đơn hàng
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE') // ID người dùng
      table.decimal('total_price', 12, 2).notNullable() // Tổng giá trị đơn hàng
      table.string('payment_method').notNullable() // Phương thức thanh toán
      table.string('status').defaultTo('pending') // Trạng thái đơn hàng (pending, completed, canceled, etc.)
      table.string('shipping_address').notNullable() // Địa chỉ giao hàng
      table.string('shipping_status').defaultTo('not shipped') // Trạng thái giao hàng
      table.timestamps(true, true) // Thời gian tạo và cập nhật đơn hàng
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
