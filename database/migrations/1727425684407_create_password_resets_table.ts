import { BaseSchema } from '@adonisjs/lucid/schema'

export default class PasswordResets extends BaseSchema {
  protected tableName = 'password_resets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('email').notNullable()
      table.string('token').notNullable()
      table.timestamp('expires_at').notNullable()
      table.timestamps(true, true)

      })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}