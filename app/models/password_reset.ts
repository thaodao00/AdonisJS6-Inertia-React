import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { nanoid } from 'nanoid'
export default class PasswordReset extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare email: string

  @column()
  declare token: string

  @column()
  declare expiresAt: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  
  @beforeCreate()
  public static assignUuid(product: PasswordReset) {
    product.id = nanoid() // Tạo id duy nhất
  }
}
