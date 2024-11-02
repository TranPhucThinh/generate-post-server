import { IPostInfo } from '@/types/post.type'
import { GoogleGenerativeAI } from '@google/generative-ai'

import { config } from './../config/config'

const genAI = new GoogleGenerativeAI(config.API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export const fillMissingInfo = async (infoPost: IPostInfo): Promise<void> => {
  if (!infoPost.mainTitle) {
    const prompt =
      'Create an post title based on the following content (Always give me a short title, exclude your quote): ' +
      infoPost.mainContent
    const result = await model.generateContent(prompt)
    infoPost.mainTitle = result.response.text()
  } else {
    const prompt =
      'Create an post title based on the following content (Always give me a short title, exclude your quote):' +
      infoPost.mainTitle
    const result = await model.generateContent(prompt)
    infoPost.mainTitle = result.response.text()
  }

  if (!infoPost.mainContent) {
    const prompt =
      'Create an post summary based on the following content (Always give me post summary, exclude your quote): ' +
      infoPost.mainTitle
    const result = await model.generateContent(prompt)
    infoPost.mainContent = result.response.text()
  } else {
    const prompt =
      'Create an post summary based on the following content (Always give me post summary, exclude your quote): ' +
      infoPost.mainContent
    const result = await model.generateContent(prompt)
    infoPost.mainContent = result.response.text()
  }
}
