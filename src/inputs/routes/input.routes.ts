import { Router } from 'express';
import { createInput } from '../controllers';

const router = Router();

router.post('/create', createInput);

export default router;
