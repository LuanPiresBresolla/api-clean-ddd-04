import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'

interface Request {
  questionId: string
  authorId: string
}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({ questionId, authorId }: Request) {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.questionsRepository.delete(question)

    return {}
  }
}
