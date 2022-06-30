/* eslint-disable max-len */
const confirmTemplate = (name) => `<!DOCTYPE html>
    <html>
      <head><style>div {display: flex; flex-direction: column; justify-content: center} h2 {text-align: center;}</style></head>
      <body><div><h2>Dziękujemy ${name}.</h2><h2> Konto zostało potwierdzone, możesz się zalogować do aplikcji</h2></div></body>
    </html>`;

export default confirmTemplate;
