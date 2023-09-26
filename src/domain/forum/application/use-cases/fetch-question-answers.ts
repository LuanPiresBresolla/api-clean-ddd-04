import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'

interface Request {
  page: number
  questionId: string
}

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({ page, questionId }: Request) {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return { answers }
  }
}
