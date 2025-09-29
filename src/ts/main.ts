import "../assets/css/style.css";
import { apiGetUserData, apiGetRepos } from '../api';
import notFoundImage from '../assets/notFound.jpg';

const avatar = document.querySelector('.avatar') as HTMLImageElement;
const title_name = document.querySelector('.title_name') as HTMLDivElement;
const title_input = document.querySelector('.title_input') as HTMLInputElement;
const edit_pen_btn = document.querySelector('.edit_pen_btn') as HTMLAnchorElement;
const edit_box_content = document.querySelector('.edit_box_btn') as HTMLDivElement;
const search_btn = document.querySelector('.search_btn') as HTMLAnchorElement;
const close_btn = document.querySelector('.close_btn') as HTMLAnchorElement;
const card_box = document.querySelector('.card_box') as HTMLUListElement;

let gitHubName = "dogwantfly";
const userInfo: TfetchUserDataType = {
  userName: "dogwantfly",
  avatarUrl: '',
  updatedAt: '',
  publicRepos: 0,
  allPage: 0
}
const limit = 10;
const page = 1;
let reposArr: TApiReopsRes[] = [];
const handEditNameFn = () => {
  edit_pen_btn.classList.add('hide');
  title_input.classList.remove('hide');
  title_name.classList.add('hide');
  edit_box_content.classList.remove('hide');
  edit_box_content.classList.add('show-flex');
  title_input.value = gitHubName;
}
const handSeachTextFn = () => {
  edit_pen_btn.classList.remove('hide');
  title_input.classList.add('hide');
  title_name.classList.remove('hide');
  edit_box_content.classList.add('hide');
  gitHubName = title_input.value;
  edit_box_content.classList.remove('show-flex');
  fetchUserData(title_input.value);
}
const closeEditFn = () => {
  edit_pen_btn.classList.remove('hide');
  title_input.classList.add('hide');
  title_name.classList.remove('hide');
  edit_box_content.classList.add('hide');
  edit_box_content.classList.remove('show-flex');
}
edit_pen_btn.addEventListener('click', handEditNameFn);
search_btn.addEventListener('click', handSeachTextFn);
close_btn.addEventListener('click', closeEditFn);



const setUserDataDOM = () => {
  avatar.src = userInfo.avatarUrl;
  title_name.innerText = userInfo.userName;
}
const renderList = () => {
  card_box.innerHTML = '';
  let html = '';
  reposArr.forEach((repo) => {

    html += `
      <li>
      <h1 class="title">${repo.name}</h1>
      <h2 class="description">${repo.description}</h2>
      <a class="url" href="${repo.html_url}" target="_blank">${repo.html_url}</a>
      <div class="star_box">
        <img class="star_icon" src="../assets/star.svg" alt="" />
        <span>${repo.stargazers_count}</span>
      </div>
    </li>
      `;

  });
  card_box.innerHTML = html;
}
const fetchUserData = async (name: string) => {
  try {
    const userData = await apiGetUserData(name);
    const { login, avatar_url, public_repos, updated_at }: TApiUserDataRes = userData.data;
    userInfo.userName = login;
    userInfo.avatarUrl = avatar_url;
    userInfo.updatedAt = updated_at;
    userInfo.publicRepos = public_repos;
    userInfo.allPage = Math.ceil(public_repos / limit);
    fetchRepos(gitHubName, page, limit);
    setUserDataDOM();

  } catch (error) {
    console.error(error);
    avatar.src = notFoundImage;
    title_name.innerText = "查無使用者";
    title_input.value = '';
    gitHubName = '';
  }

}

const fetchRepos = async (name: string,
  page = 1,
  per_page: number = limit) => {
  try {
    const response = await apiGetRepos(name,
      page,
      per_page);
    reposArr = response.data;
    renderList();
  } catch (error) {
    console.error(error);
  }
}

fetchUserData(gitHubName);
