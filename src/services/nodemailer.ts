import * as dotenv from 'dotenv';
import * as nodemailer from 'nodemailer';

dotenv.config();

const { MAIL_SMTP, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

interface options {
  host: any;
  port: any;
  auth: { user: any; pass: any };
}

export async function sendMail(email: string) {
  const transporter = nodemailer.createTransport({
    host: MAIL_SMTP,
    port: MAIL_PORT,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  } as options);

  await transporter.verify(function(error) {
    if (error) {
      throw error;
    }

    return;
  });

  const message = {
    from: 'vouchers@mellins.co.za',
    replyTo: 'vouchers@mellins.co.za',
    to: email,
    subject: 'Mellins iStyle Voucher',
    html: 'voucher will be here',
  };

  await transporter.sendMail(message, function(error, info) {
    if (error) {
      throw error;
    }

    console.log(info.response);
  });
}
