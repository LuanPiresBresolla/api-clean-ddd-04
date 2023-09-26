import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'

interface Request {
  page: number
  answerId: string
}

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({ page, answerId }: Request) {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      })

    return { answerComments }
  }
}
