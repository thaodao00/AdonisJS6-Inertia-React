import vine from '@vinejs/vine'

export const createOrderValidator = vine.compile(
  vine.object({
    address: vine.string().trim(),
    phone: vine.string().trim(),
    status: vine.enum(['pending', 'processing', 'completed', 'canceled'])
  })
)
