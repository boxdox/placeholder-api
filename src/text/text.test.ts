import request from 'supertest'
import { app } from '../app'

jest.setTimeout(10000)

describe('text api route', () => {
  describe('test working of api', () => {
    it('should return some text', async () => {
      const response = await request(app).get('/text')
      expect(response.statusCode).toBe(200)
      expect(response.text.split('\n').length).toBe(3)
    })

    it('should return 5 sentences in raw text', async () => {
      const response = await request(app).get(
        '/text?type=sentence&amount=5&format=raw'
      )
      expect(response.statusCode).toBe(200)
      expect(JSON.parse(response.text).length).toBe(5)
    })

    it('should return 3 paragraphs in json', async () => {
      const response = await request(app).get(
        '/text?type=paragraph&format=json'
      )
      expect(response.statusCode).toBe(200)
      expect(response.body.text.split('\n').length).toBe(3)
    })

    it('should return 100 words in html format', async () => {
      const response = await request(app).get(
        '/text?type=word&amount=100&format=html'
      )
      expect(response.text).toMatch(/<p>|<\/p>/g)
      expect(response.text.replace(/<p>|<\/p>/g, '').split(' ').length).toBe(
        100
      )
    })
  })

  describe('test error messages', () => {
    it('wrong type parameter', async () => {
      const response = await request(app).get('/text?type=paragraphs')
      expect(response.statusCode).toBe(400)
      expect(response.text).toMatch(/Wrong type specified/i)
    })

    it('wrong format parameter', async () => {
      const response = await request(app).get('/text?format=text')
      expect(response.statusCode).toBe(400)
      expect(response.text).toMatch(/Wrong type specified/i)
    })

    it('throw error for amount > 1000', async () => {
      const response = await request(app).get('/text?amount=5000')
      expect(response.statusCode).toBe(400)
      expect(response.text).toMatch(/too large/i)
    })
  })
})
