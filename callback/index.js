
function handleCredentialResponse(response) {
  const token = response.credential;
  console.log('Received token:', token); // Log the token
  fetch('https://syncify-r9qvc.ondigitalocean.app/tokensignin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id_token: token }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Login successful:', data.payload);
    } else {
      console.error('Login failed:', data.error);
    }
  });
}

window.onload = function () {
  google.accounts.id.initialize({
    client_id: '1096784729428-j2cqlt3vorsfqjjooubgogikbak4fnoj.apps.googleusercontent.com',
    callback: handleCredentialResponse,
  });
  google.accounts.id.renderButton(
    document.getElementById('buttonDiv'),
    { theme: 'outline', size: 'large' }
  );
};
