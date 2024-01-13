//for buttons on main page

document.getElementById('login').addEventListener('click', function() {
    $(document).ready(function() {
        $("#loginModal").modal("show");
    });
});

document.getElementById('close').addEventListener('click', function() {
    $(document).ready(function() {
        $("#loginModal").modal("hide");
    });
});

document.getElementById('signup').addEventListener('click', function() {
    $(document).ready(function() {
        $("#signupModal").modal("show");
    });
});

document.getElementById('close1').addEventListener('click', function() {
    $(document).ready(function() {
        $("#signupModal").modal("hide");
    });
});

document.getElementById('createaccount').addEventListener('click', function() {
    $(document).ready(function() {
        $("#signupModal").modal("hide");
    });
});
