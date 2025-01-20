import express from 'express';
import { fetchBlogs, createBlog, updateBlog, deleteBlog,addComment} from '../controller/blogController.js';
const router = express.Router();


router.get('/blogs', fetchBlogs);
router.post('/blogs', createBlog);
router.put('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);
router.post('/blogs/:blogId/comments', addComment)

export default router;
