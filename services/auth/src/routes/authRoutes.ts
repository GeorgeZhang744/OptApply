import { Router } from 'express';
import { handleSignup } from '../logic/signUpLogic';
import { handleSignin } from '../logic/signInLogic';

const router = Router();

router.get('/', (_req, res) => {
    res.send('Auth routes root hit');
  });

router.post('/signup', handleSignup);
router.post('/signin', handleSignin);

export default router;
