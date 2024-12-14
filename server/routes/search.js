import express from 'express'
import { addSearch, searchController } from '../controllers/search.controller.js';

const gentoSearch = express.Router();

gentoSearch.get('/search', searchController)
gentoSearch.post('addSearch', addSearch)

export default gentoRouter;