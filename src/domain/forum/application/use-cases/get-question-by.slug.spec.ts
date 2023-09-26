import { GetQuestionBySlug } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { makeQuestion } from 'tests/factories/make-question'
import { InMemoryQuestionsRepository } from 'tests/repositoires/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlug

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlug(inMemoryQuestionsRepository)
  })

  it('should be able get question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-test-slug'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'example-test-slug',
    })

    expect(question.id).toBeTruthy()
    expect(question.slug.value).toEqual(newQuestion.slug.value)
  })
})
