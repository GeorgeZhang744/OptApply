import { Router } from 'express';
import { handleSignup } from '../logic/signUpLogic';

const router = Router();

router.post('/signup', handleSignup);

export default router;
