import { BaseSchema } from "@adonisjs/lucid/schema"

export default class CreateUsersTable extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Tạo cột id
      table.string('email', 255).notNullable().unique() // Tạo cột email
      table.string('password', 180).notNullable() // Tạo cột password
      table.string('username', 80).notNullable().unique() // Tạo cột username
      table.timestamps(true, true) // Tạo cột created_at và updated_at
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE') // Tạo cột role_id
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
