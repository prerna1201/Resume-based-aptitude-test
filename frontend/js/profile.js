// =========================================
// Load User Data
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    // Profile

    document.getElementById("profileName").textContent = user.name;
    document.getElementById("profileEmail").textContent = user.email;

    document.getElementById("fullName").value = user.name;
    document.getElementById("email").value = user.email;

    document.getElementById("college").value = user.college || "";
    document.getElementById("branch").value = user.branch || "";
    document.getElementById("year").value = user.year || "";

    // Load Profile Image

    const savedImage = localStorage.getItem("profileImage");

    if(savedImage){

        document.getElementById("profileImage").src = savedImage;

    }

});

// =========================================
// Save Profile
// =========================================

document.getElementById("saveProfile").addEventListener("click",()=>{

    const user = JSON.parse(localStorage.getItem("user"));

    user.name = document.getElementById("fullName").value;
    user.college = document.getElementById("college").value;
    user.branch = document.getElementById("branch").value;
    user.year = document.getElementById("year").value;

    localStorage.setItem("user",JSON.stringify(user));

    alert("Profile Updated Successfully!");

    location.reload();

});

// =========================================
// Change Profile Photo
// =========================================

document.getElementById("changePhoto").addEventListener("click",()=>{

    document.getElementById("imageInput").click();

});

document.getElementById("imageInput").addEventListener("change",(event)=>{

    const file = event.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload=function(e){

        document.getElementById("profileImage").src=e.target.result;

        localStorage.setItem("profileImage",e.target.result);

    };

    reader.readAsDataURL(file);

});