class UI {
  constructor() {
    this.posts = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('#submitPost');
    this.formState = 'add';
  }

  showPosts(posts) {
    let output = '';

    posts.forEach((post) => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fas fa-pencil-alt text-dark"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fas fa-times text-danger"></i>
            </a>
          </div>
        </div>`;
    });

    this.posts.innerHTML = output;
  }

  showAlert(message, classNames) {
    const div = document.createElement('div');
    const container = document.querySelector('.postsContainer');
    const posts = document.querySelector('#posts');

    this.clearAlert();

    div.className = classNames;
    div.appendChild(document.createTextNode(message));
    container.insertBefore(div, posts);

    setTimeout(() => {
      this.clearAlert();
    }, 2000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if(currentAlert) {
      currentAlert.remove();
    }
  }

  clearInputs() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  populateForm(data) {
    this.idInput.value = data.id;
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;

    this.changeState('edit');
  }

  changeState(type) {
    if(type === 'edit') {
      const card = document.querySelector('.card-form');
      const button = document.createElement('button');

      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      button.className = 'post-cancel btn btn-light btn-block mt-1';
      button.appendChild(document.createTextNode('Cancel'));

      card.insertAdjacentElement('beforeEnd', button);
    }
    else {
      this.postSubmit.textContent = 'Post It!';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';

      if(document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }

      ui.clearInputs();
    }
  }
}

export const ui = new UI();