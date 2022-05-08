import express from 'express';
import { getArticles, addArticles, getArticleById, editArticle, deleteArticle } from '../controller/article-controller.js';


const route_article= express.Router();







route_article.get('/all-articles', getArticles)
route_article.post('/add-article', addArticles)
route_article.get('/all-articles/:id', getArticleById)
route_article.put('/:id', editArticle)
route_article.delete('/:id', deleteArticle)






export default route_article ;