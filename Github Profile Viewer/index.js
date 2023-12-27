const url = "https://api.github.com/users";
const searchButtonEl= document.getElementById("searchButton");
const profileContainer= document.getElementById("profileContainer");
const usernameEl= document.getElementById("username");
const loadingEl= document.getElementById("loading");

const generateProfile= (profile)=> {
    return `
    <div id="card" class="card">
        <div class="profile">
            <div class="left">
                <img src="${profile.avatar_url}" alt="Profile Picture"> 
                <div class="user-data">
                    <h5>${profile.name}</h5>
                    <h5>${profile.login}</h5>
                </div>
            </div>
            <a href="${profile.html_url}" target="_black"><button>Check Profile</button></a>
        </div>
        <div class="about">
            <h2>About</h2>
            <p>${profile.bio}</p>
        </div>
        <div class="status">
            <div class="followers status-item">
                <h4>Followers</h4>
                <h4>${profile.followers}</h4>
            </div>
            <div class="followings status-item">
                <h4>Followings</h4>
                <h4>${profile.following}</h4>
            </div>
            <div class="repos status-item">
                <h4>Repos</h4>
                <h4>${profile.public_repos}</h4>
            </div>
        </div>
    </div>
    `;
};

const showProfile =async ()=>{
    const name= usernameEl.value;
    loadingEl.innerText = "loading.....";
    loadingEl.style.color = "black";
    try{
        const res= await fetch(`${url}/${name}`);
        const data= await res.json();
        if(data.bio){
            loadingEl.innerText= "";
            profileContainer.innerHTML= generateProfile(data);
        }else{
            loadingEl.innerHTML= data.message;
            loadingEl.style.color= "red";
            profileContainer.innerText= "";
        }
        console.log("data",data);
    }catch(error){
        console.log({error});
        loadingEl.innerText="";
    }
}
searchButtonEl.addEventListener('click',showProfile);
