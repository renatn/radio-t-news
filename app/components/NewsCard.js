import React from 'react';

export default class NewsCard extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    handleExpand = (e) => {
        e.preventDefault();               
        this.setState({expanded: !this.state.expanded});
    }

    handleMakeActive = (e) => {        
        e.preventDefault();                       
        this.props.onMakeNewsActive(this.props.news.id);
    }

    handleToggleGeek = (e) => {
        e.preventDefault();               
        this.props.onToggleNewsGeek(this.props.news.id, this.props.news.geek);
    }

    render() {
        let cardClass = 'news-card mdl-card mdl-cell mdl-cell--12-col mdl-shadow--2dp';
        if (this.props.news.active) {
            cardClass += ' mdl-color--orange-100';
        }

        return (
            <div className={cardClass} id={this.props.news.active ? 'current' : ''}>
                <div className="mdl-card__title">
                    <h2 className="mdl-card__title-text">{this.props.news.title}</h2>
                    <a className="news-card__title-link mdl-color-text--primary" href={this.props.news.link} target="_blank">{this.props.news.source}</a>
                    <div className="mdl-layout-spacer"></div>
                    <div className="news-card__ts mdl-color-text--grey-600">{this.props.news.datetime}</div>
                </div>
                <div className={this.state.expanded ? 'mdl-card__supporting-text news-card__content--expanded' : 'mdl-card__supporting-text'}>
                    <div className={!!this.props.news.pic ? 'news-card__image' : 'hidden'}>
                        <img src={this.props.news.pic} width="128"/>
                    </div>
                    <div className="news_card__details">{this.props.news.snippet}</div>
                    <div className="news-card__links">
                        <a className="mdl-color-text--grey-700" href="" onClick={this.handleExpand}>
                            <i className="material-icons news-card__expand-icon" role="presentation">expand_more</i>    
                        </a>
                    </div>
                    {this.state.expanded ? <div className="news-card__content"><div dangerouslySetInnerHTML={{__html: this.props.news.content}}/></div> : ''}
                </div>
                 <div className="news_card__actions mdl-card__actions mdl-card--border">
                    <div>
                        <a className={this.props.news.geek ? 'mdl-button mdl-button--colored mdl-button--raised mdl-js-button mdl-js-ripple-effect' : 'mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored'} onClick={this.handleToggleGeek}>
                            {this.props.news.geek ? 'Убрать из гиковский выпуска' : 'В гиковский выпуск'}
                        </a>
                        <div className="mdl-tooltip">Follow</div>
                        <a className={this.props.news.active ? 'hidden' : 'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-color-text--accent'} onClick={this.handleMakeActive}>
                            Сделать текущей
                        </a>
                    </div>
                    <div className="mdl-layout-spacer"></div>
                    <div>
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                            <i className="material-icons" role="presentation">delete</i>    
                        </button>                                    
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                            <i className="material-icons" role="presentation">arrow_upward</i>
                        </button>
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                            <i className="material-icons" role="presentation">arrow_downward</i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
