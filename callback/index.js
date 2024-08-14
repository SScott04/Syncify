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
      document.getElementById("username").innerText = data.user.name;
      localStorage.setItem('id_token', token);
      localStorage.setItem('name', data.user.name)
      window.location.href = '/home/index.html';
    } else {
      console.error('Login failed:', data.error);
    }
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
}


window.onload = function () {
  console.log('called onload')
  google.accounts.id.initialize({
    client_id: '1096784729428-j2cqlt3vorsfqjjooubgogikbak4fnoj.apps.googleusercontent.com',
    callback: handleCredentialResponse,
  });
  google.accounts.id.renderButton(
    document.getElementById('buttonDiv'),
    { theme: 'outline', size: 'large' }
  );

  username.innerText = localStorage.getItem('name');

  const token = localStorage.getItem('id_token'); //Takes the token from local storage
  //Doesnt redirect on these pages
  const mainPage = window.location.pathname === '/index.html';
  const loginPage = window.location.pathname === '/login/index.html'
  const registerPage = window.location.pathname === '/register/index.html'
  const homePage = window.location.pathname === '/home/index.html'

  if (!token && !(mainPage || loginPage || registerPage || homePage)) {
    window.location.href = '/index.html'
  } else if (token && mainPage) {
    window.location.href = '/home/index.html'
  }

  
};

const button = document.getElementById('signout_button');
button.onclick = () => {
  google.accounts.id.disableAutoSelect();
  document.getElementById('username').innerText = 'No User';
  console.log("User signed out")
  localStorage.removeItem('id_token');
  localStorage.removeItem('name');
  window.location.href = '/index.html';
}

const filterButton = document.getElementById('filterButton')
const filterPage = document.getElementById('filterBackground')

function openFilter() {
  filterPage.style.display = 'flex';
}


//The following code listens for clicks on the background and close button to close the pop up. The last one listens for clicks on the filter page to prevent anything from occuring
document.getElementById("filterBackground").addEventListener("click", function() {
  this.style.display = "none";
});

document.getElementById("filterCloseButton").addEventListener("click", function() {
  document.getElementById("filterBackground").style.display = "none";
});

document.getElementById("filterPage").addEventListener("click", function(event) {
  event.stopPropagation();
})