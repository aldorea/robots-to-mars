import { Router } from 'express';
import InputRoute from './inputs/routes/input.routes';
import RobotRoute from './robots/router/robot.route';
import OutputRoute from './outputs/routes/output.routes';

const router = Router();

router.use('/inputs', InputRoute);
router.use('/robots', RobotRoute);
router.use('/outputs', OutputRoute);

export default router;
