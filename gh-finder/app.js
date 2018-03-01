const gh = new GitHub();
const ui = new UI();

const searchUser = document.getElementById('searchUser');

searchUser.addEventListener('keypress', (e) => {
  const searchInput = e.target.value;

  if(e.keyCode === 13) {
    gh.getUser(searchInput)
      .then(data => {
        if(data.profile.message === 'Not Found') {
          ui.showAlert('User not found', 'alert alert-danger');
        }
        else {
          searchUser.value = '';
          ui.showProfile(data.profile);
          ui.showRepos(data.repos);
        }
      });
  }
});