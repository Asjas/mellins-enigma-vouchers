import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { sendMail } from '../services/nodemailer';

// Validate `body` passed to /voucher route
export function validateVoucher(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  next();
}

export async function voucher(req: Request, res: Response): Promise<void> {
  const { email, param } = req.body as { email: string; param: string };
  console.log(email);
  console.log(param);
  const voucherId = '2000';

  if (email) {
    res.status(200).send('Success. Sending email containing the voucher code.');

    await sendMail(email, voucherId);
  }
}
