import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary()
      table.string('email').notNullable().unique()
      table.string('username').notNullable().unique()
      table.string('password').notNullable()
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('SET NULL')
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
