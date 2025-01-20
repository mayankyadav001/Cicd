import Blog from '../model/blogModel.js';

export const fetchBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();

        if (blogs.length === 0) {
            return res.status(404).json({ message: 'No blogs.' });
        }
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
};

export const createBlog = async (req, res) => {
    const { title, description, postedBy } = req.body;

    if (!title || !description || !postedBy) {
        return res.status(400).json({ message: 'Missing required fields (title, description, postedBy).' });
    }
    try {
        const newBlog = new Blog({
            title,
            description,
            date: new Date(),
            postedBy
        });
        await newBlog.save();

        res.status(201).json({ message: 'Blog post successfully.', blog: newBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
};

export const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, description, postedBy } = req.body;

    if (!title || !description || !postedBy) {
        return res.status(400).json({ message: 'Missing required fields (title, description, postedBy).' });
    }
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, description, postedBy, date: new Date() },
            { new: true }
        );
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }
        res.status(200).json({ message: 'Blog updated successfully.', blog: updatedBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
};

export const deleteBlog = async (req, res) => {
    const { id } = req.params; 
    try { 
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }
        res.status(200).json({ message: 'Blog deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
};

export const addComment = async (req, res) => {
    const { blogId } = req.params;
    const { text, postedBy } = req.body;


    if (!text || !postedBy) {
        return res.status(400).json({ message: 'Comment text and postedBy are required.' });
    }

    try {

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }
        const newComment = { text, postedBy, date: new Date() };
        blog.comments.push(newComment);
        await blog.save();

        res.status(201).json({ message: 'Comment added successfully.', comment: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
};
