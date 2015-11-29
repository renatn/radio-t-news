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

    componentDidMount() {
        componentHandler.upgradeDom();
    }

    handleMakeNewsActive = (id) => {
        API.makeNewsActive(id).then((response) => {
            this.setState({
                news: this.state.news.map((n) => {
                    return {
                        ...n,
                        active: n.id === id
                    }
                })
            });
        });
    }

    handleToggleNewsGeek = (id, isGeek) => {
        API.toggleNewsGeekFlag(id, isGeek).then((response) => {
            this.setState({
                news: this.state.news.map((n) => {
                    let geek = n.geek;
                    if (n.id === id) {
                        geek = !isGeek;
                    }

                    return {
                        ...n,
                        geek
                    }
                })
            });
        });
    }

    render() {
        const news = this.state.news.map(n => <NewsCard news={n} key={n.id} onMakeNewsActive={this.handleMakeNewsActive} onToggleNewsGeek={this.handleToggleNewsGeek}/>);
        return (
            <div className="mdl-grid">
                {this.state.loading ? <div className="mdl-cell mdl-cell--12-col"><div className="mdl-spinner mdl-js-spinner is-active"></div></div> : news }
            </div>
        );
    }
}
