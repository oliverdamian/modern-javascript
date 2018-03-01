const posts = [
  {title: 'Post One', body: 'This is post one.'},
  {title: 'Post Two', body: 'This is post two.'},
  {title: 'Post Three', body: 'This is post three.'},
];

// SYNCHRONOUS (NO CALLBACK)

function createPost() {
  setTimeout(function() {
    posts.push(post);
  }, 2000);
}

function getPosts() {
  setTimeout(function() {
    let output = '';

    posts.forEach(function(post) {
      output += `<li>${post.title}</li>`;
    });

    document.body.innerHTML = output;
  }, 1000);
}

createPost({
  title: 'Post Four',
  body: 'This is post four.'
});

getPosts(); // Issue: getPosts() is called before create post (1 second before).


// ASYNCHRONOUS (WITH CALLBACK)

function createPost(post, callback) {
  setTimeout(function() {
    posts.push(post);
    callback();
  }, 2000);
}

function getPosts() {
  setTimeout(function() {
    let output = '';

    posts.forEach(function(post) {
      output += `<li>${post.title}</li>`;
    });

    document.body.innerHTML = output;
  }, 1000);
}

createPost({
  title: 'Post Four',
  body: 'This is post four.'
}, getPosts);


// ASYNCHRONOUS (WITH PROMISES)

function createPost(post) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      const err = true;
      posts.push(post);

      if(!err) {
        resolve();
      }
      else {
        reject('Error: Something went wrong.');
      }

    }, 2000);
  });
}

function getPosts() {
  setTimeout(function() {
    let output = '';

    posts.forEach(function(post) {
      output += `<li>${post.title}</li>`;
    });

    document.body.innerHTML = output;
  }, 1000);
}

createPost({
  title: 'Post Four',
  body: 'This is post four.'
})
.then(getPosts)
.catch(function(err) {
  console.log(err);
});