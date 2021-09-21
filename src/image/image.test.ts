import request from 'supertest'
import { app } from '../app'
import { getImageSizeFromBuffer } from '../utils/utils'

jest.setTimeout(10000)

describe('image api route', () => {
  describe('test working of api', () => {
    it('should return a 300x300 image', async () => {
      const response = await request(app).get('/image/300')
      expect(response.statusCode).toBe(200)
      expect(response.headers['content-type']).toMatch(/image\/jpeg/)
      expect(getImageSizeFromBuffer(response.body).width).toBe(300)
      expect(getImageSizeFromBuffer(response.body).height).toBe(300)
    })

    it('should return a 500x300 image', async () => {
      const response = await request(app).get(`/image/500/300`)
      expect(response.statusCode).toBe(200)
      expect(response.headers['content-type']).toMatch(/image\/jpeg/)
      expect(getImageSizeFromBuffer(response.body).width).toBe(500)
      expect(getImageSizeFromBuffer(response.body).height).toBe(300)
    })

    it('should return a 300x150 "png" image', async () => {
      const response = await request(app).get(`/image/300/150/png`)
      expect(response.statusCode).toBe(200)
      expect(response.headers['content-type']).toMatch(/image\/png/)
      expect(getImageSizeFromBuffer(response.body).width).toBe(300)
      expect(getImageSizeFromBuffer(response.body).height).toBe(150)
    })
  })

  describe('test error messages', () => {
    it('should throw error when no width specified', async () => {
      const response = await request(app).get('/image')
      expect(response.statusCode).toBe(400)
      expect(response.body.error).toMatch(/No width specified/i)
    })

    it('should throw error when width is 0 or negative', async () => {
      const response = await request(app).get('/image/0')
      expect(response.statusCode).toBe(400)
      expect(response.text).toMatch(/zero or negative width or height/i)
    })

    it('should throw error when width > 4000', async () => {
      const response = await request(app).get('/image/5000')
      expect(response.statusCode).toBe(400)
      expect(response.text).toMatch(/too large/i)
    })
  })
})
