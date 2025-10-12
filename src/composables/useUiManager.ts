export const getElement = () => {
  const avatar = document.querySelector('.avatar') as HTMLImageElement;
  const title_name = document.querySelector('.title_name') as HTMLDivElement;
  const title_input = document.querySelector('.title_input') as HTMLInputElement;
  const edit_pen_btn = document.querySelector('.edit_pen_btn') as HTMLAnchorElement;
  const edit_box_content = document.querySelector('.edit_box_btn') as HTMLDivElement;
  const search_btn = document.querySelector('.search_btn') as HTMLAnchorElement;
  const close_btn = document.querySelector('.close_btn') as HTMLAnchorElement;
  const card_box = document.querySelector('.card_box') as HTMLUListElement;
  const loading = document.querySelector('.loading') as HTMLDivElement;

  return {
      avatar,
      title_name,
      title_input,
      edit_pen_btn,
      edit_box_content,
      search_btn,
      close_btn,
      card_box,
      loading,
  }
}


export const userInfo: TfetchUserDataType = {
  userName: "dogwantfly",
  avatarUrl: '',
  updatedAt: '',
  publicRepos: 0,
  allPage: 0
}

export const useUIDOM = () => {

    const { edit_pen_btn, title_input, title_name, edit_box_content, card_box, avatar } = getElement();
    const handEditNameFn = (name: string) => {
      edit_pen_btn.classList.add('hide');
      title_input.classList.remove('hide');
      title_name.classList.add('hide');
      edit_box_content.classList.remove('hide');
      edit_box_content.classList.add('show-flex');
      title_input.value = name;
    }
    const handSeachTextFn = async () => {
      edit_pen_btn.classList.remove('hide');
      title_input.classList.add('hide');
      title_name.classList.remove('hide');
      edit_box_content.classList.add('hide');
      edit_box_content.classList.remove('show-flex');
    }
    const closeEditFn = () => {
      edit_pen_btn.classList.remove('hide');
      title_input.classList.add('hide');
      title_name.classList.remove('hide');
      edit_box_content.classList.add('hide');
      edit_box_content.classList.remove('show-flex');
    }

    const setUserDataDOM = () => {
      avatar.src = userInfo.avatarUrl;
      title_name.innerText = userInfo.userName;
    }

    const renderList = (dataArr: TApiReopsRes[]) => {
      card_box.innerHTML = '';
      let html = '';
      dataArr.forEach((repo) => {

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
    return {
      handEditNameFn,
      handSeachTextFn,
      closeEditFn,
      setUserDataDOM,
      renderList,
    }
}