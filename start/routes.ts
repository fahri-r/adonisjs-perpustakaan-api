/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})


Route.group(() => {
  
  Route.group(() => {
    
    Route.group(() => {
      Route.resource('categories', 'CategoriesController').apiOnly()
      Route.resource('publishers', 'PublishersController').apiOnly()
      Route.resource('members', 'MembersController').apiOnly().only(['update', 'index', 'destroy'])
      Route.resource('books', 'BooksController').apiOnly().only(['store', 'update', 'destroy'])
      Route.resource('borrows', 'BorrowsController').apiOnly().only(['store', 'update', 'index', 'destroy'])
    }).middleware(['role:employee,admin'])

    Route.group(() => {
      Route.resource('books', 'BooksController').apiOnly().only(['index', 'show'])
      Route.resource('members', 'MembersController').apiOnly().only(['show'])
      Route.resource('members.borrows', 'MembersBorrowsController').only(['index'])
      Route.resource('borrows', 'BorrowsController').apiOnly().only(['show'])
    }).middleware(['role:member,employee,admin'])

    Route.group(() => {
      Route.resource('employees', 'EmployeesController').apiOnly()
    }).middleware(['role:admin'])
  
  }).middleware(['auth', 'verified'])

  Route.resource('members', 'MembersController').apiOnly().only(['store'])
  Route.post('login/web', 'AuthController.webLogin').as('auth.webLogin')
  Route.post('login/telegram', 'AuthController.telegramLogin').as('auth.telegramLogin')
  Route.post('verification', 'AuthController.emailVerification').as('auth.emailVerification')

}).prefix('/api/v1')