const username = document.getElementById("username");

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
  .then(response => {
    console.log('Response status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('Received data from backend:', data);
    if (data.success) {
      console.log('Login successful:', data.user);
    } else {
      console.error('Login failed:', data.error);
    }
  })
  .catch(error => {
    console.error('Fetch error:', error);
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

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log(profile.getName());
  username.innerText = profile.getName();
}