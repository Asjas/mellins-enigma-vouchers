import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import axios from 'axios';

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

  if (email) {
    const auth = Buffer.from('dawidp@pienaarpartners.co.za:Enigma@007').toString('base64');
    const bearer = `Basic ${auth}`;
    const tenant = 'mellins';
    const definitionId = '5c162225995900346de27ba0';

    await axios({
      method: 'post',
      baseURL: 'https://enigma-api.encentivize.co.za/',
      url: `${tenant}/definitions/${definitionId}/vouchers`,
      headers: { Authorization: bearer },
      data: {
        externalReferenceCode: email,
        definition: {
          voucherType: {
            valueAmount: 120,
          },
        },
      },
    })
      .then(response => {
        const { voucherCode } = response.data;

        console.log(response.data);
        console.log(response.data.voucherBatchId);

        res.status(201).send('Success. Sending email containing the voucher code.');
        sendMail(email, voucherCode);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('There was an error with generating the voucher.');
      });
  }
}
