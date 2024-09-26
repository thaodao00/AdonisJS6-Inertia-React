import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Carts extends BaseSchema {
  protected tableName = 'carts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // ID của giỏ hàng
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('RESTRICT') // ID người dùng
      table.decimal('total_price', 12, 2).notNullable() // Giá sản phẩm tại thời điểm thêm vào giỏ
      table.timestamps(true, true) // Thời gian tạo và cập nhật giỏ hàng
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
