import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { makeQuestion } from 'tests/factories/make-question'
import { InMemoryQuestionsRepository } from 'tests/repositoires/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2023, 9, 24) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2023, 9, 20) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2023, 9, 26) }),
    )

    const { questions } = await sut.execute({ page: 1 })

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2023, 9, 26) }),
      expect.objectContaining({ createdAt: new Date(2023, 9, 24) }),
      expect.objectContaining({ createdAt: new Date(2023, 9, 20) }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let index = 1; index <= 22; index++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const { questions } = await sut.execute({ page: 2 })

    expect(questions).toHaveLength(2)
  })
})
