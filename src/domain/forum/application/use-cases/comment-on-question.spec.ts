import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'
import { makeQuestion } from 'tests/factories/make-question'
import { InMemoryQuestionCommentsRepository } from 'tests/repositoires/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from 'tests/repositoires/in-memory-questions-repository'

let questionsRepository: InMemoryQuestionsRepository
let questionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment On Question', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      questionsRepository,
      questionCommentsRepository,
    )
  })

  it('should be able create a new comment for a question', async () => {
    const question = makeQuestion()
    await questionsRepository.create(question)

    const { questionComment } = await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: 'Novo Comentário',
    })

    expect(questionComment.id).toBeTruthy()
    expect(questionComment.content).toEqual('Novo Comentário')
  })
})
