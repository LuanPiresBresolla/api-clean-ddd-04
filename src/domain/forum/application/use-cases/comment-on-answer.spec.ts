import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'
import { makeAnswer } from 'tests/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from 'tests/repositoires/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from 'tests/repositoires/in-memory-answers-repository'

let answersRepository: InMemoryAnswersRepository
let answerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment On Answer', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswerUseCase(
      answersRepository,
      answerCommentsRepository,
    )
  })

  it('should be able create a new comment for a answer', async () => {
    const answer = makeAnswer()
    await answersRepository.create(answer)

    const { answerComment } = await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: 'Novo Comentário',
    })

    expect(answerComment.id).toBeTruthy()
    expect(answerComment.content).toEqual('Novo Comentário')
  })
})
