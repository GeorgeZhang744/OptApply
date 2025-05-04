import { Router } from 'express';
import { handleSignup } from '../logic/signUpLogic';
import { handleSignin } from '../logic/signInLogic';
import { handleValidate } from '../logic/validateLogic';

const router = Router();

router.get('/', (_req, res) => {
    res.send('Auth routes root hit');
  });

router.post('/signup', handleSignup);
router.post('/signin', handleSignin);
router.post('/validate', handleValidate);

export default router;
