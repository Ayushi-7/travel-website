document.getElementById('create').addEventListener('click', function() {
    $(document).ready(function() {
        $("#create-post-modal").modal("show");
    });
});

const baseUrl = "http://localhost:5501";
// Define a function to fetch the list of posts
async function getPost(id) {
  let obj = {
    id: id
  };
  // Make a GET request to the posts endpoint
  const response = await fetch(`${baseUrl}/getPost`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(obj),
  });
  console.log(response);
  return response.json();
}

// Define a function to create a new post
async function createPost(name, description, imageurl) {
  // Make a POST request to the posts endpoint with the post data
  let obj = {
    name: name,
    description: description,
    imageurl: imageurl
    };
    console.log(obj);
  const response = await fetch(`${baseUrl}/createPost`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(obj),
  });
  console.log(response);
  return response.json();
    // .then((response) => {
    //   if (!response.ok) {
    //     throw new Error("Error creating post");
    //   }
    //   // Parse the JSON response
    //   return response.json();
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
}

// Define a function to update an existing post
async function updatePost(id, name, description, imageurl) {
  let obj = {
    id: id,
    name: name,
    description: description,
    imageurl: imageurl
    };
  // Make a PUT request to the posts endpoint with the post data
  const response = await fetch(`${baseUrl}/updatePost`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(obj),
  });
  console.log(response);
  return response.json();
}

// Define a function to delete an existing post
async function deletePost(id) {
  let obj = {
    id: id
  };
  // Make a DELETE request to the posts endpoint with the post ID
  const response = await fetch(`${baseUrl}/deletePost`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(obj),
  });
  console.log(response);
  return response.json();
}


document.getElementById("create-in-modal").onclick = function() {
    var name = document.getElementById("postTitle").value;
    var description = document.getElementById("postContent").value;
    var imageURL = document.getElementById("postImage").value;
    createPost(name, description, imageURL);};

document.getElementById('close-in-modal').addEventListener('click', function() {
    $(document).ready(function() {
        $("#create-post-modal").modal("hide");
    });
});

document.getElementById('create-in-modal').addEventListener('click', function() {
    $(document).ready(function() {
        $("#create-post-modal").modal("hide");
    });
});

window.addEventListener("load", function() {
  displayPosts();
})

async function displayPosts() {
  let response = await fetch(`${baseUrl}/displayPosts`).then(resp => resp.json());
  console.log(response);
  const posts = document.getElementById("posts");
  posts.innerHTML = ""; // Clear previous posts
  response.forEach((post) => { 
    const name = post.name;
    const description = post.description;
    const imageurl = post.imageurl;

    const postElement = document.createElement("div");
    postElement.className = "col-sm-6 mx-auto";
    postElement.innerHTML = `
    <div class="card">
    <img src="${imageurl}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">Upvote/Downvote</p>
      <p class="card-text">${description}</p>
      <a href="#" class="btn btn-primary">Read More</a>
      <a href="#" class="btn btn-primary" id="update">Update</a>
      <a href="#" class="btn btn-primary" id="delete">Delete</a>
      <!-- Code for the Create New Post modal --> 
      <div class="modal fade" id="update-modal" tabindex="-1" role="dialog" aria-labelledby="update-modal-label" aria-hidden="true">
         <div class="modal-dialog">
           <div class="modal-content">
             <div class="modal-header">
             </div>
             <!-- Modal body -->
             <div class="modal-body">
               <form>
                 <div class="mb-3">
                   <label for="postTitle" class="form-label">Update Post Title</label>
                   <input type="text" class="form-control" id="newpostTitle">
                 </div>
                 <div class="mb-3">
                   <label for="postContent" class="form-label">Update Post Content</label>
                   <textarea class="form-control" id="newpostContent" rows="3"></textarea>
                 </div>
                 <div class="mb-3">
                   <label for="imageURL" class="form-label">Update Post Image URL</label>
                   <input type="text" class="form-control" id="newpostImage">
                 </div>
               </form>
             </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="close-update">Close</button>
               <button type="button" class="btn btn-primary" id="update-in-modal">Update Post</button>
             </div>
           </div>
        </div>
    </div>
    </div>

        `;

    posts.appendChild(postElement);

    document.getElementById('update').addEventListener('click', function() {
      $(document).ready(function() {
          $("#update-modal").modal("show");
      });
    });

    document.getElementById('delete').addEventListener('click', function() {
      deletePost(post._id);
    });

    document.getElementById("update-in-modal").onclick = function() {
    var name = document.getElementById("newpostTitle").value;
    var description = document.getElementById("newpostContent").value;
    var image = document.getElementById("newpostImage").value;
    console.log(post._id);
    updatePost(post._id, name, description, image);};
    
    document.getElementById('close-update').addEventListener('click', function() {
        $(document).ready(function() {
            $("#update-modal").modal("hide");
        });
    });
    
    document.getElementById('update-in-modal').addEventListener('click', function() {
        $(document).ready(function() {
            $("#update-modal").modal("hide");
        });
    });
  });
  
  return response;
}