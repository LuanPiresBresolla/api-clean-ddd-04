import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

interface Request {
  authorId: string
  title: string
  content: string
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({ authorId, content, title }: Request) {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      content,
      title,
    })

    await this.questionsRepository.create(question)

    return { question }
  }
}
