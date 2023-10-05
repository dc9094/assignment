const express = require('express');
const axios = require('axios');
const _ = require('lodash');
const app = express();
const port=8080
// Define the route for fetching the blog data.
app.get('/api/blog-stats', async (req, res) => {
  try {
    // Make the request to the third-party API.
    const response = await axios.get(
      'https://intent-kit-16.hasura.app/api/rest/blogs',
      {
        headers: {
          'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
        },
      }
    );
    // Check if the request was successful.
    if (response.status === 200) {
      // Parse the JSON response.
      const blogs = response.data;
      // Perform data analysis using Lodash.
      const totalBlogs = blogs.length;
      const longestBlogTitle = _.maxBy(blogs, 'title.length').title;
      const blogsWithPrivacy = _.filter(blogs, (blog) => blog.title.toLowerCase().includes('privacy'));
      const uniqueBlogTitles = _.uniqBy(blogs, 'title');
      // Respond to the client with a JSON object containing the statistics.
      res.json({
        totalBlogs,
        longestBlogTitle,
        blogsWithPrivacy: blogsWithPrivacy.length,
        uniqueBlogTitles,
      });
    } else {
      // Return an error message if the request failed.
      res.status(500).json({ error: 'An error occurred while fetching the blog data.' });
    }
  } catch (error) {
    // Return an error message if the request failed.
    res.status(500).json({ error: 'An error occurred while fetching the blog data.' });
  }
});
// Define the route for searching the blogs.
app.get('/api/blog-search', (req, res) => {
    try {
      const query = req.query.query.toLowerCase();
      const matchingBlogs = blogData.filter(blog => blog.title.toLowerCase().includes(query));
      res.json(matchingBlogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error during blog search' });
    }
  });
  
  // Error handling middleware for unhandled errors
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  });
  
  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
  


  
