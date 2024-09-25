import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddRoleIdToUsers extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      // Add a new column `role_id` to the `users` table
      table.increments('id')
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('username', 80).notNullable().unique()
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('SET NULL')
      table.timestamps(true, true)

    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      // Remove the `role_id` column if rolling back
      table.dropColumn('role_id')
    })
  }
}
