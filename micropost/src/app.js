import { http } from './http';
import { ui } from './ui';

document.addEventListener('DOMContentLoaded', getPosts);

document.querySelector('#submitPost').addEventListener('click', submitPost);
document.querySelector('#posts').addEventListener('click', deletePost);

document.querySelector('#posts').addEventListener('click', goToEditState);
document.querySelector('.card-form').addEventListener('click', goToAddState);

function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

function submitPost() {
  const id = document.querySelector('#id').value;
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const data = { title, body };

  if(title === '' || body === '') {
    ui.showAlert('Please fill in all inputs.', 'alert alert-danger');
  }
  else {
    if(id === '') {
      http.post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Post added succesfully!', 'alert alert-success');
          ui.clearInputs();
          getPosts();
        })
        .catch(err => console.log(err));
    }
    else {
      http.put(`http://localhost:3000/posts/${id}`, data)
      .then(data => {
        ui.showAlert('Post updated succesfully!', 'alert alert-success');
        ui.changeState('add');
        getPosts();
      })
      .catch(err => console.log(err));
    }
  }
}

function deletePost(e) {
  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;

    if(confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post deleted succesfully.', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}

function goToEditState(e) {
  if(e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const data = {
      id,
      title,
      body
    };

    ui.populateForm(data);
  }

  e.preventDefault();
}

function goToAddState(e) {
  if(e.target.classList.contains('post-cancel')) {
    ui.changeState('add');

    e.preventDefault();
  }
}