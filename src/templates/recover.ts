export const recoverTemplate = (pass: string) => `<div>
  <div>
    Hasło zosatło zresetowane.
  </div>
  <p>
    Twoje nowe hasło to ${pass}
  </p>
  <p>
    Zmień swoje hasło zaraz po zalogowaniu.
  </p>
  <div>
    Wiadomość wysłana automatycznie
  </div>
</div>`;
