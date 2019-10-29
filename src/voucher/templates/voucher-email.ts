import mjml2html from 'mjml';

export const mjmlEmail: any = (voucher: string) => {
  return mjml2html(`<mjml>
    <mj-head>
      <mj-title>Mellins iStyle Voucher</mj-title>
      <mj-font name="Raleway" href="https://fonts.googleapis.com/css?family=Raleway" />
      <mj-font name="Roboto" href="https://fonts.googleapis.com/css?family=Roboto" />
    </mj-head>
    <mj-body background-color="#ffffff">
      <mj-section>
        <mj-column padding-bottom="40px">
          <mj-image padding-bottom="15px" width="420px" src="https://cdn.shopify.com/s/files/1/0045/5632/4936/files/Mellins_top_logo.png?10964"></mj-image>
          <mj-divider border-color="#445a6a"></mj-divider>
          <mj-text padding-bottom="10px" font-size="24px" color="#445a6a" font-family="Roboto">Voucher</mj-text>
          <mj-text padding-bottom="40px" font-size="14px" color="#445a6a" padding-bottom="25px" font-family="Raleway">Please find your voucher number here.</mj-text>
          <mj-text font-size="28px" align="center" padding="20px" font-family="Roboto" color="#ffffff" container-background-color="#445a6a">${voucher}</mj-text>
        </mj-column>
      </mj-section>
      <mj-section background-color="#e7e7e7">
        <mj-column padding-left="50px" padding-bottom="15px">
          <mj-text font-size="18px" align="left" padding-bottom="5px" font-family="Roboto">Mellins iStyle</mj-text>
          <mj-text align="left" padding-bottom="0" font-family="Raleway">Phone: (010) 100 3310</mj-text>
          <mj-text align="left" padding-bottom="0" font-family="Raleway"> Email: info@mellins.co.za</mj-text>
        </mj-column>
        <mj-column padding-left="50px">
          <mj-text font-size="18px" align="left" padding-bottom="5px" font-family="Roboto">Follow us</mj-text>
          <mj-social align="left">
            <mj-social-element name="twitter" href="https://twitter.com/MellinsiStyle" alt="twitter" />
            <mj-social-element name="facebook" href="https://www.facebook.com/mellinsistyle/" alt="facebook" />
            <mj-social-element name="instagram" href="https://www.instagram.com/mellinsistyle/?hl=en" alt="instagram" />
          </mj-social>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>`);
};
