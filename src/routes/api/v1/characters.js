import express from 'express';
import { charactersWithMultipleActors } from '../../../controllers/charactersController.js';

const charactersRouter = express.Router();

charactersRouter.get('/charactersWithMultipleActors', charactersWithMultipleActors);

export default charactersRouter;
