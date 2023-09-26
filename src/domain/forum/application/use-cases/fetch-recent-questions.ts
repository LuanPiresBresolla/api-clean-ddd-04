import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'

interface Request {
  page: number
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({ page }: Request) {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return { questions }
  }
}
