import { Router } from 'express';
import { getInputs } from '../controllers';

const router = Router();

router.get('/', getInputs);

export default router;
