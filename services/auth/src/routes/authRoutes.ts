import { Router } from 'express';
import { handleSignup } from '../logic/signUpLogic';

const router = Router();

router.get('/', (_req, res) => {
    res.send('Auth routes root hit');
  });
  
router.post('/signup', handleSignup);

export default router;
