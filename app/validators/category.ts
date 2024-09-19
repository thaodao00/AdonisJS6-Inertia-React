import vine from '@vinejs/vine'

export const createCategoryValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const category = await db.from('categories').where('name', value).first()
        return !category
      }),
    description: vine.string().trim().optional(),
  })
)
export const updateCategoryValidator = vine.compile(
  vine.object({
    id: vine.number(),
    name: vine
      .string()
      .trim()
      .unique(async (db, value, field) => {
        const category = await db
          .from('categories')
          .whereNot('id', field.meta.categoryId)
          .where('name', value)
          .first()
        return !category
      }),
    description: vine.string().trim().optional(),
  })
)
