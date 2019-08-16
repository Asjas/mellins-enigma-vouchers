import * as dotenv from 'dotenv';
import * as nodemailer from 'nodemailer';
import mjml2html from 'mjml';

dotenv.config();

const { MAIL_SMTP, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

interface Options {
  host: any;
  port: any;
  auth: { user: any; pass: any };
}

export async function sendMail(email: string, voucher: string): Promise<void> {
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
  } as Options);

  await transporter.verify(function(error) {
    if (error) {
      throw error;
    }
  });

  const parsedEmail = mjml2html(`
    <mjml>
      <mj-head>
        <mj-title>Mellins iStyle Voucher</mj-title>
        <mj-font name="raleway" href="https://fonts.googleapis.com/css?family=Raleway" />
        <mj-font name="roboto" href="https://fonts.googleapis.com/css?family=Roboto" />
      </mj-head>
      <mj-body>

        <mj-section>
          <mj-column>
            <mj-image width="240px" height="40px" src="https://cdn.shopify.com/s/files/1/0045/5632/4936/files/Mellins_top_logo.png?10964"></mj-image>
            <mj-divider border-color="#445a6a"></mj-divider>
            <mj-text font-size="20px" color="#445a6a" font-family="roboto">Voucher</mj-text>
            <mj-text font-size="14px" color="#445a6a" padding-bottom="25px" font-family="raleway">Here is your voucher number.</mj-text>
            <mj-text font-size="30px" align="center" padding="20px" font-family="roboto" container-background-color="#445a6a" >#${voucher}</mj-text>
          </mj-column>
        </mj-section>

        <mj-section background-color="#e7e7e7">
          <mj-column>
            <mj-text font-size="16px" align="center" padding-bottom="5px" font-family="roboto">Mellins iStyle</mj-text>
            <mj-text align="center" padding-bottom="0" font-family="raleway">Phone: (010) 100 3310</mj-text>
            <mj-text align="center" padding-bottom="0" font-family="raleway"> Email: info@mellins.co.za</mj-text>
          </mj-column>
          <mj-column>
            <mj-text font-size="16px" align="center" font-family="roboto">Follow us:</mj-text>
            <mj-social>
              <mj-social-element name="facebook" href="https://www.facebook.com/mellinsistyle/" alt="facebook" />
              <mj-social-element name="twitter" href="https://twitter.com/MellinsiStyle" alt="twitter" />
              <mj-social-element name="instagram" href="https://www.instagram.com/mellinsistyle/?hl=en" alt="instagram" />
            </mj-social>
          </mj-column>
        </mj-section>

      </mj-body>
    </mjml>`);

  const message = {
    from: 'vouchers@mellins.co.za',
    replyTo: 'vouchers@mellins.co.za',
    to: email,
    subject: 'Mellins iStyle Voucher',
    html: parsedEmail.html,
  };

  await transporter.sendMail(message, function(error, info) {
    if (error) {
      throw error;
    }

    console.log(info.response);
  });
}
