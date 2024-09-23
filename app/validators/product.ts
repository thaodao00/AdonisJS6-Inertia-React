import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const product = await db.from('products').where('name', value).first()
        return !product
      }),
    description: vine.string().trim(),
    price: vine.number(),
    stock: vine.number(),
    categories: vine.array(vine.number()).minLength(1),
    image: vine.file({
      size: '2mb',
      extnames: ['jpg', 'jpeg', 'png', 'gif'],
    }),
  })
)
export const updateProductValidator = vine.compile(
  vine.object({
    id: vine.number(),
    name: vine
      .string()
      .trim()
      .unique(async (db, value, field) => {
        const product = await db
          .from('products')
          .whereNot('id', field.meta.productId)
          .where('name', value)
          .first()
        return !product
      }),
    description: vine.string().trim(),
    price: vine.number(),
    stock: vine.number(),
    categories: vine.array(vine.number()).minLength(1),
    image: vine.any()
  })
)
