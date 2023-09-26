import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'

interface ChooseQuestionBestAnswerRequest {
  answerId: string
  authorId: string
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private questionsRepository: QuestionsRepository,
  ) {}

  async execute({ answerId, authorId }: ChooseQuestionBestAnswerRequest) {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toValue(),
    )

    if (!question) {
      throw new Error('Question not found')
    }

    if (question.authorId.toValue() !== authorId) {
      throw new Error('Not allowed')
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return { question }
  }
}
