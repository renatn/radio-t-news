import request from 'superagent';


const hostname = (url) => {
    const parser = document.createElement('a');
    parser.href = url;
    return parser.hostname;
};

const pad0 = (value) => {
	return value < 10 ? '0' + value : value;
}

const datetime = (ts) => {
	const dt = new Date(ts);
	return dt.getFullYear() + '-' + pad0(dt.getMonth()) + '-' + pad0(dt.getDate()) + ' ' + pad0(dt.getHours()) + ':'+pad0(dt.getMinutes());
};

export default class API {

	static news(username, password) {
  		return new Promise((resolve, reject) => {
	        request
	            .get('http://master.radio-t.com:8778/api/v1/news')
	            .end((err, res) => {
	                const news = res.body.map(n => {
	                    return {
	                        ...n,
	                        source: hostname(n.link),
	                        datetime: datetime(n.ts)
	                    }
	                });
	                resolve(news);
	            });
    	})
    }


}
