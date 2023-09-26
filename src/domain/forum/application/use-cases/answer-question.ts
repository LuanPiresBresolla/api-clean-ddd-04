import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface AnswerQuestionRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({ instructorId, questionId, content }: AnswerQuestionRequest) {
    const answer = Answer.create({
      content,
      questionId: new UniqueEntityID(questionId),
      authorId: new UniqueEntityID(instructorId),
    })

    await this.answersRepository.create(answer)

    return { answer }
  }
}
