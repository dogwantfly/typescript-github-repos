// 集中管理跨模組共享的狀態（gitHubName / page / limit / reposArr）

export let gitHubName: string = "dogwantfly";
export const setGitHubName = (name: string) => {
	gitHubName = name;
};

export const limit = 10;

export let page = 1;
export const resetPage = () => {
	page = 1;
};
export const incrementPage = () => {
	page += 1;
};

export let reposArr: TApiReopsRes[] = [];
export const resetRepos = () => {
	reposArr = [];
};
export const appendRepos = (newRepos: TApiReopsRes[]) => {
	reposArr = [...reposArr, ...newRepos];
};


