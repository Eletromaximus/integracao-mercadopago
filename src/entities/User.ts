import { Either, left, right } from '../shared/either'
import { Email } from './Email'
import { InvalidEmailError } from './errors/InvalidEmailError'
import { InvalidNameError } from './errors/InvalidNameError'
import { Name } from './Name'

export default class User {
  constructor (
    public readonly name: Name,
    public readonly email: Email,
    public password: string
  ) {
    this.name = name
    this.email = email
    this.password = password
  }

  public static create (email: string, name: string, password: string):
    Either<InvalidNameError | InvalidEmailError | string, User> {
    const emailOrError = Email.create(email)

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError(email))
    }

    const nameOrError = Name.create(name)

    if (nameOrError.isLeft()) {
      return left(new InvalidNameError(name))
    }

    if (password === null ||
      typeof password !== 'string' ||
      password.length < 6
    ) {
      return left('Password Invalid')
    }

    const emailObject: Email = emailOrError.value as Email
    const nameObject: Name = nameOrError.value as Name

    return right(new User(nameObject, emailObject, password))
  }
}
