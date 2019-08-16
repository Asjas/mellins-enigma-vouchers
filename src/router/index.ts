import express from 'express';
import { check } from 'express-validator';

import { validateVoucher, voucher } from '../controllers/voucher';
import { catchErrors } from '../utils';

export const router = express.Router();
const validBody = ['eyetest', '2459'];

router.get('/', (req, res) => {
  res.status(200).json({ status: '🚀' });
});

router.post(
  '/voucher',
  [
    check('email')
      .exists()
      .normalizeEmail()
      .isEmail(),
    check('param')
      .escape()
      .isString()
      .isIn(validBody),
  ],
  validateVoucher,
  catchErrors(voucher),
);
