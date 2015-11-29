import request from 'superagent';

const PREFIX_API = 'http://master.radio-t.com:8778/api/v1';

const hostname = (url) => {
    const parser = document.createElement('a');
    parser.href = url;
    return parser.hostname;
};

const pad0 = value => value < 10 ? '0' + value : value;

const datetime = (ts) => {
	const dt = new Date(ts);
	return dt.getFullYear() + '-' + pad0(dt.getMonth()+1) + '-' + pad0(dt.getDate()) + ' ' + pad0(dt.getHours()) + ':'+pad0(dt.getMinutes());
};

export default class API {

	static news(username, password) {
  		return new Promise((resolve, reject) => {
	        request
	            .get(PREFIX_API+'/news')
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
    	});
    }

    static makeNewsActive(id) {
  		return new Promise((resolve, reject) => {
	        request
	            .put(PREFIX_API+'/news/active/'+id)
	            .end((err, res) => {
	                resolve(res.body);
	            });
    	});
    }

    static toggleNewsGeekFlag(id, isGeek) {
    	const endpoint = isGeek ? 'nogeek' : 'geek';
  		return new Promise((resolve, reject) => {
	        request
	            .put(PREFIX_API+'/news/'+endpoint+'/'+id)
	            .end((err, res) => {
	                resolve(res.body);
	            });
    	});
    }

    static toggleNewsDeletedFlag(id, isDeleted) {
  		return new Promise((resolve, reject) => {
			if (isDeleted) {
		        request
		            .put(PREFIX_API+'/news/undelete/'+id)
		            .end((err, res) => {
		                resolve(res.body);
		            });
	 		} else {
		        request
		            .del(PREFIX_API+'/news/'+id)
		            .end((err, res) => {
		                resolve(res.body);
		            });
			} 
    	});    	
	 
    }

}
