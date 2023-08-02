import { hash } from 'bcryptjs'
import { beforeEach, it, describe, expect } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('Should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123123', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123123',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
