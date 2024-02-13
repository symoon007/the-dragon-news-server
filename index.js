const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware"); // Import the proxy middleware
const app = express();
const port = process.env.PORT || 5000;
const categories = require("./data/categories");
const news = require("./data/news");

// Define the target server URL (replace with your actual server URL)
const targetServer =
  "https://the-dragon-news-server-a2s4uzvr5-symoon007s-projects.vercel.app";

// Set up the proxy middleware to forward requests to the target server
app.use(
  "/api",
  createProxyMiddleware({
    target: targetServer, // Target server URL
    changeOrigin: true, // Change the origin of the host header to the target URL
    pathRewrite: {
      "^/api": "/", // Replace "/api" in the request URL with "/"
    },
  })
);

app.get("/", (req, res) => {
  res.send("Dragon news is coming soooon...");
});
app.get("/categories", (req, res) => {
  res.send(categories);
});
app.get("/news", (req, res) => {
  res.send(news);
});
app.get("/news/:id", (req, res) => {
  const id = req.params.id;

  const selectedId = news.find((n) => n._id === id);
  res.send(selectedId);
});
app.get("/categories/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  if (id === 0) {
    res.send(news);
  } else {
    const categoryNews = news.filter((n) => parseInt(n.category_id) === id);
    res.send(categoryNews);
  }
});

app.listen(port, () => {
  console.log(`Dragon is running on port: ${port}`);
});
