import puppeteer from 'puppeteer'
import path from 'path'
import multer from 'multer'

import { IPostInfo } from '@/types/post.type'
import { fillMissingInfo } from './aiService'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../screenshots'))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, 'main-image-' + uniqueSuffix + '.png')
  }
})
const upload = multer({ storage })

export const fetchPostInfo = async (url: string): Promise<IPostInfo> => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle2' })

  let favicon

  const infoPost = await page.evaluate(() => {
    const titles = Array.from(document.querySelectorAll('h1'))
      .map((title) => title.textContent?.trim() || '')
      .filter((title) => title)

    const contents = Array.from(document.querySelectorAll('p'))
      .map((content) => content.textContent?.trim() || '')
      .filter((content) => content)

    const ogImage = document.querySelector('meta[property="og:image"]')
    const ogImageSrc = ogImage ? ogImage.content : null

    const faviconLink = document.querySelector("link[rel*='icon']") as HTMLLinkElement
    favicon = faviconLink ? faviconLink.href : ''

    const mainTitle = titles.join(' ')
    const mainContent = contents.join(' ')
    const mainImage = ogImageSrc || ''

    return { mainTitle, mainContent, mainImage, favicon }
  })

  if (!infoPost.mainImage) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const screenshotFileName = `main-image-${uniqueSuffix}.png`
    const screenshotPath = path.join(__dirname, './../screenshots', screenshotFileName)

    await page.screenshot({ path: screenshotPath })
    infoPost.mainImage = `/screenshots/${screenshotFileName}`
  }

  if (!infoPost.favicon) {
    infoPost.favicon = ''
  }

  await browser.close()

  await fillMissingInfo(infoPost)

  return infoPost
}
