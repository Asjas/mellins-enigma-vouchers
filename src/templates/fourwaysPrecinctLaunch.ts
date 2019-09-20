import mjml2html from 'mjml';

export const mjmlEmail: any = (voucher: string) => {
  return mjml2html(`<mjml>
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
        <mj-text align="center" font-size="18px" line-height="34px">
          <mj-text>Receive a <strong>FREE SECOND PAIR</strong> valued between<br /></mj-text>
          <mj-text><strong>R 7000 and R 17000</strong><br /></mj-text>
          <mj-text>if you test your eyes and buy new spectacles with ZEISS i.Scription lenses.</mj-text>
        </mj-text>
        <mj-text font-size="16px" line-height="24px">
          <ul>
            <li>Your free second pair includes the same lenses as your initial pair. Your lens choice will determine the value of the offering.
            </li>
            <li>The lenses can be tinted free of charge to create a pair of prescription sunglasses or sport sunglasses.
            </li>
            <li>You can choose any frame up to the value of R 2000 (excess for your own account)
            </li>
            Available 20 September 2019 – 31 December 2019
          </ul>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding-top="0">
      <mj-column>
        <mj-text font-size="14px" line-height="22px" color="#8a8a8a">
          <ul>
            Terms and Conditions
            <li>This offer is subject to a purchase of an eye test, new prescription frame and ZEISS i.Scription lenses.
            </li>
            <li>The offer will not be available for the following lenses: ZEISS Stock lenses; ZEISS Conventional lenses; ZEISS EnergizeMe lenses; ZEISS Light lenses; Photofusion, AdaptiveSun and Polarized lenses.
            </li>
            <li>The offer is only available at Mellins i.Style in Fourways Precinct.
            </li>
            <li>The value of the offer will vary based on the initial lens choice.
            </li>
            <li>The frame for the free second pair will be limited to a value of R2000. If the cost of the second frame is less than R2000 – the balance will be forfeited. If the cost of the second frame is more than R2000, the balance will need to be paid
              in by the customer.
            </li>
            <li>This offer may not be used in conjunction with any other offers.
            </li>
            <li>Only one offer per customer.
            </li>
            <li>This offer is valid for orders placed between 20 September 2019 – 31 December 2019.
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
};
