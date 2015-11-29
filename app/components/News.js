import React from 'react';
import NewsCard from './NewsCard';
import API from '../utils/API';

export default class News extends React.Component {  
    
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            loading: true
        }

        API.news('admin', 'admin').then((news) => this.setState({news: news, loading: false}));
    }

    render() {
        const news = this.state.news.map(n => <NewsCard news={n} key={n.id}/>);
        return (
            <div className="mdl-grid">
                {this.state.loading ? <div className="mdl-cell mdl-cell--12-col"><div className="mdl-spinner mdl-js-spinner is-active"></div></div> : news }
            </div>
        );
    }
}
