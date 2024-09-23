import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    description: vine.string().trim(),
    price: vine.number(),
    stock: vine.number(),
    categories: vine.array(vine.number()).minLength(1),
    image: vine.file({
      size: '2mb',
      extnames: ['jpg', 'jpeg', 'png', 'gif'],
    })
  })
)
