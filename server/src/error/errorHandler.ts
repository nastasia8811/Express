export class ErrorHandler extends Error {
  statusCode: number

  constructor(message: string, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.name = 'ErrorHandler'
  }
}

export class ValidationError extends ErrorHandler {
  constructor(message: string) {
    super(message, 400)
    this.name = 'ValidationError'
  }
}

export class NewspostsServiceError extends ErrorHandler {
  constructor(message: string) {
    super(message, 500)
    this.name = 'NewspostsServiceError'
  }
}
