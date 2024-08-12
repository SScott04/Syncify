function onSignIn(googleUser) {
  // Get the Google user profile information
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());

  // Get the ID token and send it to your server
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);

  // Now, send the token to your server
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://syncify-r9qvc.ondigitalocean.app/tokensignin');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
      console.log('Signed in as: ' + xhr.responseText);
  };
  xhr.send(JSON.stringify({token: id_token}));
}
