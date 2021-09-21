import request from 'supertest'
import { app } from './app'

describe('test root path', () => {
  it('should return an html page', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toMatch(/text\/html/)
  })

  it('should contain some text', async () => {
    const response = await request(app).get('/')
    expect(response.text).toMatch(/Placeholder API/)
  })

  it('should return 404 page', async () => {
    const response = await request(app).get('/a-non-existent-page')
    expect(response.text).toMatch(/Wrong URL/i)
  })
})
