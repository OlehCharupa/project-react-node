import sgMail from "@sendgrid/mail";
export default function (email, tokenId) {
  sgMail.setApiKey(process.env.KEY_SEND_GRID);
  const msg = {
    to: email,
    from: process.env.EMAIL,
    subject: "Аккаунт создан",
    text: "verificationToken email",
    html: `
           <h1>вы успешно создали аккаунт </h1>
           <p>ваш email - ${email}</p>
           <p>для верификации перейдите по ссылке <a href='${process.env.BASE_URL}/api/authent/${tokenId}'>активировать</p>
        `,
  };

  async function main() {
    const [response] = await sgMail.send(msg);

    console.log(response);
  }

  main();
}
