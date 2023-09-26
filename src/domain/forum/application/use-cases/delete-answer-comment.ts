import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'

interface Request {
  answerCommentId: string
  authorId: string
}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({ answerCommentId, authorId }: Request) {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Answer Comment not found')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return {}
  }
}
