/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
// router.on('/').renderInertia('home', { version: 6 })
import { middleware } from '#start/kernel'
import HomeController from '#controllers/home_controller'
import RegisterController from '#controllers/auth/register_controller'
import LoginController from '#controllers/auth/login_controller'
import LogoutController from '#controllers/auth/logout_controller'
import ProfileController from '#controllers/profile_controller'
import DashboardController from '#controllers/admin/dashboard_controller'
import UserController from '#controllers/admin/user_controller'
import ProductController from '#controllers/product_controller'
import CategoryController from '#controllers/category_controller'

router.get('/', [HomeController, 'index'])
// router.get('/', [HomeController, 'index'])

router.get('/profile', [ProfileController, 'index']).use(middleware.auth())
router.put('/update-profile', [ProfileController, 'update']).use(middleware.auth())
router.delete('/delete-profile', [ProfileController, 'delete']).use(middleware.auth())

router.get('/register', [RegisterController, 'show'])
router.post('/register', [RegisterController, 'store'])

router.get('/login', [LoginController, 'show'])
router.post('/login', [LoginController, 'store'])

router.get('/logout', [LogoutController, 'handle'])

router.get('/', [DashboardController, 'index']).use(middleware.admin()).prefix('/admin').as('admin')

router
  .get('/users', [UserController, 'index'])
  .use(middleware.admin())
  .prefix('/admin')
  .as('admin.users')
router.put('/users/update-role', [UserController, 'updateRole']).prefix('/admin')

router.get('/product', [ProductController,'index']).use(middleware.admin()).prefix('/admin')
router.get('/product/create', [ProductController,'showCreate']).use(middleware.admin()).prefix('/admin')
router.get('/product/update/:id', [ProductController,'showUpdate']).use(middleware.admin()).prefix('/admin')
router.post('/product/create', [ProductController,'createProduct']).use(middleware.admin()).prefix('/admin')
router.put('/product/update', [ProductController,'updateProduct']).use(middleware.admin()).prefix('/admin')
router.delete('/products/delete', [ProductController,'deleteProduct']).use(middleware.admin()).prefix('/admin')

router.get('/categories', [CategoryController,'index']).use(middleware.admin()).prefix('/admin')
router.post('/categories/create', [CategoryController,'create']).use(middleware.admin()).prefix('/admin')
router.put('/categories/update', [CategoryController,'update']).use(middleware.admin()).prefix('/admin')
router.delete('/categories/delete', [CategoryController,'delete']).use(middleware.admin()).prefix('/admin')
router.get('/categories/search', [CategoryController,'searchCategory']).use(middleware.admin()).prefix('/admin')

router.get('/product', [ProductController, 'showProducts'])
router.get('/product/:id', [ProductController, 'showProductDetail'])
