import { getAllPosts, getPostById, getPostsByDomain, scrapePost } from '@/controllers/postController'
import express from 'express'

const router = express.Router()

router.get('/scrape-post', scrapePost)
router.get('/posts', getAllPosts)
router.get('/posts/:id', getPostById)
router.get('/posts-same-domain', getPostsByDomain)

export default router
