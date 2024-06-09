import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [currenArticleState, setCurrentArticleState] = useState(defaultArticleState);
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currenArticleState.fontFamilyOption.value,
					'--font-size': currenArticleState.fontSizeOption.value,
					'--font-color': currenArticleState.fontColor.value,
					'--container-width': currenArticleState.contentWidth.value,
					'--bg-color': currenArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm currenArticleState={currenArticleState} setCurrentArticleState={setCurrentArticleState}/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
