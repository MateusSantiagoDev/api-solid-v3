import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { UsersRepository } from '../users-repository'

export class PrismaUserRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = prisma.user.create({
      data,
    })
    return user
  }
}
