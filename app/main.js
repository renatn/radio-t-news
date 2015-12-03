import React from 'react';
import {render} from 'react-dom';
import News from './components/News';
import API from './utils/API';

const spinner = <div className="mdl-cell mdl-cell--12-col"><div className="mdl-spinner mdl-js-spinner is-active"></div></div>;
const DELETED = true;

render(spinner, document.getElementById('news'));
render(spinner, document.getElementById('deletedNews'));
render(spinner, document.getElementById('geekNews'));

API.news()
	.then((news) => {
		render(<News news={news}/>, document.getElementById('news'))
		return news;
	})
	.then((news) => render(<News news={news.filter((n) => n.geek)}/>, document.getElementById('geekNews')))
	.then(() => API.news(DELETED).then((news) => render(<News news={news}/>, document.getElementById('deletedNews'))));





