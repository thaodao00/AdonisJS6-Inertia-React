
export function handleError(error: any): string {
  let errorMessage = ''

  switch (error.code) {
    case 'E_INVALID_CREDENTIALS':
      errorMessage = 'The email or password is incorrect.'
      break
    case 'E_USER_NOT_FOUND':
      errorMessage = 'The user does not exist.'
      break
    case 'E_UNVERIFIED_ACCOUNT':
      errorMessage = 'Your account is not verified yet.'
      break
    case 'E_ROW_NOT_FOUND':
      errorMessage = 'The requested data was not found.'
      break
    case 'E_VALIDATION_FAILURE':
      errorMessage = 'Invalid input data.'
      break
    case 'E_AUTHORIZATION_FAILURE':
      errorMessage = 'You are not authorized to access this resource.'
      break
    case 'E_DATABASE_ERROR':
      errorMessage = 'A database connection error occurred.'
      break
    case 'E_ROUTE_NOT_FOUND':
      errorMessage = 'The page you are looking for does not exist.'
      break
    default:
      if (error.messages) {
        errorMessage = Array.isArray(error.messages)
          ? error.messages.join(', ')
          : error.messages
      } else if (error.message) {
        errorMessage = error.message
      }
  }

  return errorMessage
}
