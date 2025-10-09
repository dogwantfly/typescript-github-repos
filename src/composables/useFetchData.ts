import { apiGetUserData, apiGetRepos } from "../api";
import notFoundImage from '../assets/notFound.jpg';
import { limit, page, incrementPage, appendRepos, reposArr, resetRepos } from './useStateManager';
import { getElement, userInfo, useUIDOM } from './useUiManager';
import { isRateLimitError, showRateLimitMessage } from './useErrorHandlers';
export const fetchUserData = async (name: string) => {
  try {
    const userData = await apiGetUserData(name);
    const { login, avatar_url, public_repos, updated_at }: TApiUserDataRes = userData.data;

    return {
      userName: login,
      avatarUrl: avatar_url,
      updatedAt: updated_at,
      publicRepos: public_repos,
      allPage: Math.ceil(public_repos / limit),
    };

  } catch (error) {
    return {
      userName: "查無使用者",
      avatarUrl: notFoundImage,
    };
  }
}

export const fetchRepos = async (name: string,
  pageIdx: number = page,
  per_page = 10) => {
  try {
    const response = await apiGetRepos(name,
      pageIdx,
      per_page);
    appendRepos(response.data);
    incrementPage();
    const { loading } = getElement();
    if (response.data.length < 10) {
      loading.classList.add('hide');
    } else {
      loading.classList.remove('hide');
    }
    const { renderList } = useUIDOM();
    renderList(reposArr);
  } catch (error: any) {
    console.error(error);
    if (isRateLimitError(error)) {
      showRateLimitMessage();
      // 停止後續載入
      userInfo.allPage = 0;
      return;
    }
    resetRepos();
    const { renderList } = useUIDOM();
    renderList(reposArr);
    const { loading } = getElement();
    loading.classList.add('hide');
  }
}