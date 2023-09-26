import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'

interface Request {
  slug: string
}

export class GetQuestionBySlug {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({ slug }: Request) {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found')
    }

    return { question }
  }
}
