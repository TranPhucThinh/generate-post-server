import { Request, Response } from 'express'
import { Op } from 'sequelize'

import Domain from '@/database/models/Domain'
import Post from '@/database/models/Post'
import { fetchPostInfo } from '@/services/scrapeService'

const savePostManually = async (
  title: string,
  content: string,
  image: string,
  originalLink: string,
  domain: string,
  favicon: string
) => {
  try {
    await Post.create({
      title,
      content,
      image,
      original_link: originalLink,
      domain,
      favicon
    })
  } catch (error) {
    console.error('Error saving post manually:', error)
  }
}

const extractDomain = (url: string) => {
  try {
    const { hostname } = new URL(url)
    return hostname
  } catch (error) {
    console.error('Invalid URL:', url)
    return null
  }
}

export const scrapePost = async (req: Request, res: Response): Promise<void> => {
  const url = req.query.url as string

  if (!url) {
    res.status(400).json({ error: 'URL is required' })

    return
  }

  const domainName = extractDomain(url)

  if (!domainName) {
    res.status(400).json({ error: 'Invalid URL' })
    return
  }

  try {
    const existingDomain = await Domain.findOne({
      where: { domain: domainName }
    })

    if (!existingDomain) {
      await Domain.create({ domain: domainName })
    }

    const infoPost = await fetchPostInfo(url)

    const title = infoPost.mainTitle
    const content = infoPost.mainContent
    const image = infoPost.mainImage
    const originalLink = req.query.url
    const domain = domainName
    const favicon = infoPost.favicon

    await savePostManually(title, content, image, originalLink as string, domain, favicon)

    res.status(200).json({
      data: infoPost
    })
  } catch (error) {
    console.log('scrapePost ~ error:', error)
    res.status(500).json({
      message: 'Error scraping data'
    })
  }
}

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 10
    const page = parseInt(req.query.page as string) || 1
    const offset = (page - 1) * limit

    const { count: total, rows: results } = await Post.findAndCountAll({
      order: [['created_at', 'DESC']],
      limit,
      offset
    })

    res.status(200).json({
      data: results,
      pagination: {
        total,
        limit,
        currentPage: page,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Error from the server'
    })
  }
}

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id

  if (!id) {
    res.status(400).json({ error: 'Post ID is required' })

    return
  }

  try {
    const post = await Post.findByPk(id) // Use Sequelize's findByPk to find by primary key

    if (!post) {
      res.status(404).json({ error: 'Post not found' })

      return
    }

    res.status(200).json({
      data: post
    })
  } catch (err) {
    console.log('getPostById ~ error:', err)
    res.status(500).json({
      message: 'Error from the server'
    })
  }
}

export const getPostsByDomain = async (req: Request, res: Response): Promise<void> => {
  const domain = req.query.domain as string

  if (!domain) {
    res.status(400).json({ error: 'Domain is required' })
    return
  }

  try {
    const domainEntry = await Domain.findOne({
      where: { domain }
    })

    if (!domainEntry) {
      res.status(404).json({ error: 'Domain not found' })
      return
    }

    const posts = await Post.findAll({
      where: {
        original_link: {
          [Op.like]: `%${domainEntry.domain}%`
        }
      }
    })

    if (posts.length === 0) {
      res.status(404).json({ message: 'No posts found for this domain.' })
      return
    }

    res.status(200).json({ data: posts })
  } catch (error) {
    console.error('getPostsByDomain ~ error:', error)
    res.status(500).json({ message: 'Error retrieving posts' })
  }
}
