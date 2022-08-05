/* eslint-disable max-len */
export const registerTemplate = (token: string, api_address: string, email: string) => `<div>
  <div>
    Dziękujemy za zainteresowanie naszą aplikacją. Mamy nadzieję, że spełni Państwa oczekiwania.
    W celu potwierdzenia adresu e-mail i aktywacji konta w aplikacji, kliknij w poniższy link lub wklej go do przeglądarki.
  </div>
  <p>
    <a href="${api_address}/user/confirm?token=${token}&email=${email}" class="btn btn-primary" role="button" txt="${api_address}/user/confirm?token=${token}&email=${email}">Kliknij aby aktywować konto</a>
  </p>
  <div>
    Wiadomość wysłana automatycznie
  </div>
</div>`;
