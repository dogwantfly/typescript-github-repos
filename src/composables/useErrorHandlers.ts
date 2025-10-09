import notFoundImage from '../assets/notFound.jpg';
import { getElement } from './useUiManager';

export const showRateLimitMessage = () => {
	const { avatar, title_name, loading } = getElement();
	avatar.src = notFoundImage;
	title_name.innerText = "已達到 GitHub API 速率限制，請稍後再試或設定 Token";
	loading.classList.add('hide');
};

export const isRateLimitError = (error: any): boolean => {
	const status = error?.response?.status;
	const remaining = error?.response?.headers?.['x-ratelimit-remaining'];
	const message: string | undefined = error?.response?.data?.message || error?.message;
	return (
		status === 403 && (
			remaining === '0' || (typeof message === 'string' && message.toLowerCase().includes('rate limit'))
		)
	);
};


