const data = [
  {
    name: 'John Doe',
    age: 32,
    gender: 'male',
    lookingFor: 'female',
    location: 'Boston, MA',
    profileImage: 'https://randomuser.me/api/portraits/men/85.jpg'
  },
  {
    name: 'Jen Smith',
    age: 26,
    gender: 'female',
    lookingFor: 'male',
    location: 'Miami, FL',
    profileImage: 'https://randomuser.me/api/portraits/women/35.jpg'
  },
  {
    name: 'William Johnson',
    age: 38,
    gender: 'male',
    lookingFor: 'male',
    location: 'Lynn, MA',
    profileImage: 'https://randomuser.me/api/portraits/men/34.jpg'
  }
];

const profiles = profileIterator(data);

nextProfile();
document.getElementById('next').addEventListener('click', nextProfile);

function nextProfile() {
  const currentProfile = profiles.next().value;

  if(currentProfile !== undefined) {
    document.getElementById('profile-display').innerHTML =
    `<ul class="list-group">
      <li class="list-group-item">Name: ${currentProfile.name}</li>
      <li class="list-group-item">Age: ${currentProfile.age}</li>
      <li class="list-group-item">Location: ${currentProfile.location}</li>
      <li class="list-group-item">Preference: ${currentProfile.gender} looking for ${currentProfile.lookingFor}</li>
    </ul>`;

    document.getElementById('image-display').innerHTML = `<img src="${currentProfile.profileImage}">`;
  }
  else {
    window.location.reload();
  }
}

function profileIterator(profiles) {
  let nextIndex = 0;

  return {
    next: function() {
      return nextIndex < profiles.length ?
        { value: profiles[nextIndex++], done: false } :
        { done: true };
    }
  };
}