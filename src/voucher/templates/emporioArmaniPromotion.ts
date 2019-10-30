import mjml2html from 'mjml';

export const emporioArmaniPromotion: any = (voucher: string) =>
  mjml2html(`<mjml>
  <mj-head>
    <mj-title>Mellins iStyle Voucher</mj-title>
    <mj-font name="Raleway" href="https://fonts.googleapis.com/css?family=Raleway" />
    <mj-font name="Roboto" href="https://fonts.googleapis.com/css?family=Roboto" />
  </mj-head>
  <mj-body background-color="#ffffff" width="800px">
    <mj-section>
      <mj-column>
        <mj-image padding-bottom="15px" width="400px" src="https://cdn.shopify.com/s/files/1/0045/5632/4936/files/Mellins_top_logo.png?10964"></mj-image>
        <mj-divider border-color="#445a6a"></mj-divider>
        <mj-text padding-bottom="10px" font-size="28px" font-family="Roboto">Voucher</mj-text>
        <mj-text padding-bottom="40px" font-size="16px" padding-bottom="25px" font-family="Raleway">Please find your voucher number here.</mj-text>
        <mj-text font-size="30px" align="center" padding="20px" font-family="Roboto" color="#ffffff" container-background-color="#445a6a">${voucher}</mj-text>
      </mj-column>
    </mj-section>

    <mj-section padding-bottom="10px">
      <mj-column>
        <mj-image src="http://mellins.co.za/wp-content/uploads/2019/10/eaimage1.jpg" width="300px"></mj-image>
      </mj-column>
      <mj-column width="300px">
        <mj-text font-size="36px" font-weight="700" align="center" padding-top="20px">R 500 OFF<br /></mj-text>
        <mj-text font-size="26px" font-weight="700" align="center" padding-top="0">&<br /></mj-text>
        <mj-text font-size="22px" font-weight="700" align="center" padding-top="0">FREE ZEISS LENS WIPES<br /></mj-text>
        <mj-text font-size="16px" align="center" padding-top="20px">when purchasing an optical frame with ZEISS lenses<br /></mj-text>
        <mj-text font-size="16px" align="center" padding-top="120px" vertical-align="bottom">Available until 31 October 2019</mj-text>
      </mj-column>
    </mj-section>

    <mj-section padding-top="0">
      <mj-column>
        <mj-text font-size="14px" line-height="22px" color="#8a8a8a">
          <ul>
            Terms and Conditions
            <li>This offer is only valid if a customer buys a new Emporio Armani optical frame with ZEISS lenses
            </li>
            <li>In order to qualify, your unique promotional code has to be presented in-store
            </li>
            <li>This offer is valid until 30 November 2019
            </li>
            <li>This offer cannot be combined with other offers
            </li>
            <li>Only one offer per customer
            </li>
          </ul>
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#e7e7e7">
      <mj-column padding-left="50px" padding-bottom="15px">
        <mj-text font-size="18px" align="left" padding-bottom="5px" font-family="Roboto">Mellins iStyle</mj-text>
        <mj-text align="left" padding-bottom="0" font-family="Raleway">Phone: (010) 100 3310</mj-text>
        <mj-text align="left" padding-bottom="0" font-family="Raleway">Email: info@mellins.co.za</mj-text>
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
