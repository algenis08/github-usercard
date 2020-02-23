/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ['tetondan','dustinmyers','justsml','luishrd','bigknell'];
axios.get('https://api.github.com/users/algenis08/followers').then(response => {
  console.log(response.data);
  for (info of response.data) {
    axios.get('https://api.github.com/users/' + info.login).then(response => {
      const followerCard = userCard(response.data)
      addCard.appendChild(followerCard)
    })
  }
})
.catch(err => {
  console.log(err);
})

  
/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

function githubCard (object){
  const gitCard = document.createElement('div');
  const gitImg = document.createElement('img' );
  const gitCardInfo = document.createElement('div');
  const gitName = document.createElement('h3');
  const gitUserName = document.createElement('p');
  const gitLocation = document.createElement('p');
  const gitProfile = document.createElement('p');
  const gitProfileLink = document.createElement('a');
  const gitFollowers = document.createElement('p');
  const gitFollowing = document.createElement('p');
  const gitBio = document.createElement('p');


// 
  gitCard.classList.add('card');
  gitCardInfo.classList.add('card-info');
  gitName.classList.add('name');
  gitUserName.classList.add('username');

  // 
  gitCard.append(gitImg);
  gitCard.append(gitCardInfo);
  gitCardInfo.append(gitName);
  gitCardInfo.append(gitUserName);
  gitCardInfo.append(gitLocation);
  gitCardInfo.append(gitProfile);
  gitProfile.append(gitProfileLink);
  gitCardInfo.append(gitFollowers);
  gitCardInfo.append(gitFollowing);
  gitCardInfo.append(gitBio);

// 
gitImg.src = object.avatar_url;
gitName.textContent = object.name;
gitUserName.textContent = object.login;
gitLocation.textContent = `Location: ${object.location}`;
gitProfileLink.href = object.html_url;
gitProfileLink.textContent = object.html_url;
gitProfile.textContent = "Profile:";
gitFollowers.textContent = `Followers: ${object.followers}`;
gitFollowing.textContent = `Following: ${object.following}`;
gitBio.textContent = `Bio: ${object.bio}`;


// 
return gitCard;
}


const gitCards = document.querySelector('.cards');

axios.get('https://api.github.com/users/algenis08')
.then(response => {
  gitCards.append(githubCard(response.data))
  })
  .catch(error => {
    console.log('NO NO NO!', error)
  })


  
 