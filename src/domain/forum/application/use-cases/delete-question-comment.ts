import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'

interface Request {
  questionCommentId: string
  authorId: string
}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({ questionCommentId, authorId }: Request) {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Question Comment not found')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.questionCommentsRepository.delete(questionComment)

    return {}
  }
}
