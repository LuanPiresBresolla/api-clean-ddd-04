import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'

interface Request {
  authorId: string
  answerId: string
  content: string
}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({ answerId, authorId, content }: Request) {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return { answer }
  }
}
