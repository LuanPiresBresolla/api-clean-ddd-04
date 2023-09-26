import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { InMemoryQuestionsRepository } from 'tests/repositoires/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able create a new question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Teste',
      content: 'Nova pergunta',
    })

    expect(question.id).toBeTruthy()
    expect(question.content).toEqual('Nova pergunta')
  })
})
