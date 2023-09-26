import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'

interface Request {
  answerId: string
  authorId: string
}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({ answerId, authorId }: Request) {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.answersRepository.delete(answer)

    return {}
  }
}
