import { InMemoryQuestionsRepository } from 'tests/repositoires/in-memory-questions-repository'
import { InMemoryAnswersRepository } from 'tests/repositoires/in-memory-answers-repository'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'
import { makeQuestion } from 'tests/factories/make-question'
import { makeAnswer } from 'tests/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryQuestionsRepository,
    )
  })

  it('should be able to choose question best answer', async () => {
    const newQuestion = makeQuestion()
    const newAnswer = makeAnswer({ questionId: newQuestion.id })

    await inMemoryQuestionsRepository.create(newQuestion)
    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: newQuestion.authorId.toValue(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
      newAnswer.id,
    )
  })

  it('should not be able to choose another user question best answer ', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
    })
    const newAnswer = makeAnswer({ questionId: newQuestion.id })

    await inMemoryQuestionsRepository.create(newQuestion)
    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: new UniqueEntityID('author-2').toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should not be able to choose another best answer if answer not found', async () => {
    const result = await sut.execute({
      answerId: 'answer-not-found-1',
      authorId: 'author-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to choose another best answer if question not found', async () => {
    const newAnswer = makeAnswer({
      questionId: new UniqueEntityID('question-not-found-1'),
    })

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
