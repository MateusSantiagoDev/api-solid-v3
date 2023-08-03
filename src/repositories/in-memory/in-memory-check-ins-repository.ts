import { Prisma, CheckIn } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'
import { CheckInsRepository } from '../check-ins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public itens: CheckIn[] = []
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }
    this.itens.push(checkIn)
    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    // primeiro instante do dia
    const startOfTheDay = dayjs(date).startOf('date')
    //ultimo instante do dia
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.itens.find((checkIn) => {
      // verificando o momento da data de criação do ckeckIn
      const checkInDate = dayjs(checkIn.created_at)
      // validando se a data da criação do checkin
      // esta depois do inicio do dia e anted o final do dia
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }
    return checkInOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    return this.itens
      .filter((item) => item.id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string) {
    return this.itens.filter((item) => item.id === userId).length
  }
}
