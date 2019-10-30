import mjml2html from 'mjml';

export const summerSalePromotion: any = (voucher: string) =>
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
        <mj-text padding-bottom="40px" font-size="16px" padding-bottom="25px" font-family="Raleway">Please find your voucher number here:</mj-text>
        <mj-text font-size="30px" align="center" padding="20px" font-family="Roboto" color="#ffffff" container-background-color="#445a6a">${voucher}</mj-text>
      </mj-column>
    </mj-section>

    <mj-section padding-bottom="10px">
      <mj-column>
        <mj-image src="http://mellins.co.za/wp-content/uploads/2019/10/Landscape-google-1080-x-1920-px-2.jpg" width="700px"></mj-image>
      </mj-column>
    </mj-section>

    <mj-section padding-top="0">
      <mj-column>
        <mj-text font-size="14px" line-height="22px" color="#8a8a8a">
          <ul>
            Terms and Conditions
            <li>This promotion applies to unscripted sunglasses <strong>frames only</strong>. If sunglasses are scripted, the discount will only apply to the sunglasses frame (and not the lenses).
            </li>
            <li>The discount will be applied to the cheaper pair of sunglasses.
            </li>
            <li>This promotion is only valid if both pairs of sunglasses are purchased simultaneously.
            </li>
            <li>This promotion is only valid for cash/card purchases.  No medical aid claims or debit orders.
            </li>
            <li>The discount on a second pair of sunglasses is valid either in-store or online.
            </li>
            <li>Customers with a valid unique code will qualify for free ZEISS lens wipes when purchasing a second pair of sunglasses.  This will only be available for use in-store and not online.</li>
            <li>This offer cannot be combined with other offers.</li>
            <li>This offer is valid until 31 December 2019.</li>
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
          <mj-social-element name="facebook" href="https://www.facebook.com/mellinsistyle/" alt="facebook" />
          <mj-social-element name="instagram" href="https://www.instagram.com/mellinsistyle/?hl=en" alt="instagram" />
        </mj-social>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`);
