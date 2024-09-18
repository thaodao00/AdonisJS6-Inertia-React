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
import UsersController from '#controllers/users_controller'
import RegisterController from '#controllers/auth/register_controller'
import LoginController from '#controllers/auth/login_controller'
import LogoutController from '#controllers/auth/logout_controller'

router.get('/', [UsersController, 'index'])
// router.get('/', [UsersController, 'index'])

router.get('/register', [RegisterController, 'show'])
router.post('/register', [RegisterController, 'store'])

router.get('/login', [LoginController, 'show'])
router.post('/login', [LoginController, 'store'])

router.post('/logout', [LogoutController, 'handle'])
