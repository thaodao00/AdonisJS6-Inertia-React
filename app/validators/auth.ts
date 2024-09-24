import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    username: vine
      .string()
      .trim()
      .minLength(5)
      .unique(async (db, value) => {
        const user = await db.from('users').where('username', value).first()
        return !user
      }),
    password: vine.string().trim().minLength(6),
    password_confirmation: vine.string().trim().sameAs(
      /// <reference path="" />
      'password'
    ),
  })
)
export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(6),
  })
)
export const updateUserValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value, field) => {
        const user = await db
          .from('users')
          .whereNot('id', field.meta.userId)
          .where('email', value)
          .first()
        return !user
      }),
    username: vine
      .string()
      .trim()
      .minLength(6)
      .unique(async (db, value, field) => {
        const user = await db
          .from('users')
          .whereNot('id', field.meta.userId)
          .where('username', value)
          .first()
        return !user
      }),
    password: vine.string().trim().minLength(6).optional(),
  })
)
