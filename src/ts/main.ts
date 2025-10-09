import "../assets/css/style.css";
import { getElement, userInfo, useUIDOM } from '../composables/useUiManager';
import { gitHubName, page } from '../composables/useStateManager';
import { fetchUserData, fetchRepos } from '../composables/useFetchData';



const { edit_pen_btn, search_btn, close_btn, loading } = getElement();




const { handEditNameFn, handSeachTextFn, closeEditFn, setUserDataDOM } = useUIDOM();
edit_pen_btn.addEventListener('click', handEditNameFn);
search_btn.addEventListener('click', handSeachTextFn);
close_btn.addEventListener('click', closeEditFn);





// 錯誤處理已在 fetch 模組中處理




const init = async() => {
  try {
      const response = await fetchUserData(gitHubName);
      const { userName, avatarUrl, updatedAt, publicRepos, allPage } = response;
      userInfo.userName = userName;
      userInfo.avatarUrl = avatarUrl;
      userInfo.updatedAt = updatedAt as string;
      userInfo.publicRepos = publicRepos as number;
      userInfo.allPage = allPage as number;
      setUserDataDOM();
  } catch (error) {
    if (typeof error === 'object') {
      const err = error as TfetchUserDataType
      userInfo.userName = err.userName;
      userInfo.avatarUrl = err.avatarUrl;
      userInfo.updatedAt = err.updatedAt as string;
      userInfo.publicRepos = err.publicRepos as number;
      userInfo.allPage = err.allPage as number;
      setUserDataDOM();
    }
  }

}
init();
fetchRepos(userInfo.userName, page)
const intersectionObserver = new IntersectionObserver((entries) => {
  if (page > userInfo.allPage) return;
  if (entries[0].intersectionRatio <= 0) return;

  loading.classList.remove('hide');
  fetchRepos(gitHubName);
  console.log("Loaded new items");
});

intersectionObserver.observe(loading);  