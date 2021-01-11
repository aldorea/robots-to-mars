import { Router } from 'express';
import {
  createExploration,
  getLostRobots
} from '../controllers/robot.controller';

const router = Router();

router.get('/', createExploration);
router.get('/lost', getLostRobots);

export default router;
