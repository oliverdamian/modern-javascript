document.getElementById('text-btn').addEventListener('click', getTextFile);
document.getElementById('json-btn').addEventListener('click', getJSON);
document.getElementById('api-btn').addEventListener('click', getAPIData);

function getTextFile() {
  fetch('test.txt')
    .then(res => res.text())
    .then(data => {
      let output = document.getElementById('output');

      output.innerHTML = '';
      output.innerHTML = data;
    })
    .catch(err => console.log(err));
}

function getJSON() {
  fetch('test.json')
    .then(res => res.json())
    .then(data => {
      let posts = '';

      data.forEach(function(post) {
        posts += `
          <h4>${post.title}</h4>
          <p>${post.body}</p>
        `;
      });
      document.getElementById('output').innerHTML = posts;
    })
    .catch(err => console.log(err));
}

function getAPIData() {
  fetch('https://api.github.com/users')
    .then(res => res.json())
    .then(data => {
      const ul = document.createElement('ul');
      let output = document.getElementById('output');
      let users = '';

      data.forEach(function(user) {
        users += `<li>${user.login}</li>`;
      });

      ul.innerHTML = users;
      output.innerHTML = '';
      output.appendChild(ul);
    })
    .catch(err => console.log(err));
}