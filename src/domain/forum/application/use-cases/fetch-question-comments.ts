import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'

interface Request {
  page: number
  questionId: string
}

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({ page, questionId }: Request) {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return { questionComments }
  }
}
