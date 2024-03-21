const API_URL = "https://api.github.com/users/";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(username) {
  try {
    const { data } = await axios(API_URL + username);
    createUserCard(data);
  } catch (error) {
    const message = error.response && error.response.status === 404 ? "No profile with this username" : "An error occurred while fetching data";
    createErrorCard(message);
  }
}

function createUserCard(user) {
  const { name, login, bio, location, twitter_username, avatar_url, followers, following, public_repos } = user;
  const userID = name || login;
  const userBio = bio ? `<p>${bio}</p>` : "";
  const locationHTML = location ? `<p><strong>Location:</strong> ${location}</p>` : "";
  const twitterHTML = twitter_username ? `<p><strong>Twitter:</strong> <a href="https://twitter.com/${twitter_username}" target="_blank">${twitter_username}</a></p>` : "";
  const cardHTML = `
    <div class="card">
      <div>
        <img src="${avatar_url}" alt="${userID}" class="avatar">
      </div>
      <div class="user-info">
        <h2>${userID}</h2>
        ${userBio}
        <ul>
          <li>${followers} <strong>Followers </strong></li>
          <li>${following} <strong>Following </strong></li>
          <li>${public_repos} <strong>Repos </strong></li>
        </ul>
        ${locationHTML}
        ${twitterHTML}
      </div>
    </div>
  `;
  main.innerHTML = cardHTML;
}

function createErrorCard(message) {
  main.innerHTML = `<div class="card"><h1>${message}</h1></div>`;
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  const username = search.value.trim();
  if (username) {
    await getUser(username);
    search.value = "";
  }
});
