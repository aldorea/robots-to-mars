import { Router } from 'express';
import { getOutputs } from '../controllers';

const router = Router();

router.get('/', getOutputs);

export default router;
