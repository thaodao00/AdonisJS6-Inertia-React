import vine from '@vinejs/vine'

export const createOrderValidator = vine.compile(
  vine.object({
    address: vine.string().trim(),
    phone: vine.number().min(10),
    status: vine.enum(['pending', 'processing', 'completed', 'canceled'])
  })
)
