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

import UsersController from '#controllers/users_controller'

router.get('/', [UsersController, 'index'])
