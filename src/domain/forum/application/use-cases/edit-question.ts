import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'

interface Request {
  authorId: string
  questionId: string
  title: string
  content: string
}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({ questionId, authorId, content, title }: Request) {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return { question }
  }
}
