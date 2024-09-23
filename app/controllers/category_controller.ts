import Category from '#models/category'
import { createCategoryValidator, updateCategoryValidator } from '#validators/category'
import { HttpContext } from '@adonisjs/core/http'
export default class CategoryController {
  public async index({ inertia, auth, request }: HttpContext) {
    // const categories = await Category.all()
    const page = request.input('page', 1)
    const limit = 10
    const categories = await Category.query().paginate(page, limit)
    return inertia.render('admin/categories/list', { user: auth.user, categories })
  }

  public async create({ request, response }: HttpContext) {
    const data = await request.validateUsing(createCategoryValidator)
    try {
      await Category.create({
        name: data.name,
        description: data.description,
      })

      return response.redirect().back()
    } catch (error) {
      console.error('Error creating category:', error)
    }
  }

  public async update({ request, response }: HttpContext) {
    const id = request.input('id')
    console.log('id:', id)

    const { name, description } = await request.validateUsing(updateCategoryValidator, {
      meta: {
        categoryId: Number(id),
      },
    })
    const category = await Category.findOrFail(id)
    try {
      category.name = name
      category.description = description || ''
      await category.save()
      return response.redirect().back()
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }

  public async delete({ request, response }: HttpContext) {
    const id = request.input('id')
    const category = await Category.findOrFail(id)
    try {
      await category.delete()
      return response.redirect().back()
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  public searchCategory = async ({ request, inertia }: HttpContext) => {
    const search = request.input('search', '')
    const page = request.input('page', 1)
    const limit = 10
    const categories = await Category.query()
      .where('name', 'like', `%${search}%`)
      .paginate(page, limit)
    return inertia.render('admin/categories/list', { categories, search })
  }
}
