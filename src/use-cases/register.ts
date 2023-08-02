import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: password,
    })
    return { user }
  }
}
