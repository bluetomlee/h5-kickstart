export const preload = (assets, cb) => {
        let result = deepCopy(assets);
        let percent;
        return new Promise( resolve => {
            result.map((j, index) => {
                let img = new Image();
                img.src = j;
                img.onload = () => {
                    result.shift();
                    percent = parseInt(assets.length / result.length) || 100;
                    cb( percent + '%', j);
                    if (!result.length) {
                        resolve(true);
                    }
                    setTimeout(()=> {
                        resolve(true);
                    }, 8000)
                }
            });
        })
}

export const getQueryString = (key) => {
    let regex = new RegExp("[\\?&]" + key + "=([^&#]*)", "i");
    let matches = regex.exec(location.href);

    return matches ? matches[1] : '';
}

export const isBaidu = () => {
    return /baidubrowser/i.test(navigator.userAgent) || /baiduboxapp/i.test(navigator.userAgent);
}

export const isWeixin = () => {
    return (/MicroMessenger/ig).test(navigator.userAgent);
}

export const isQQ = () => {
    return /QQ\//i.test(navigator.userAgent);
}
export const deepCopy = (arr) => {
    return JSON.parse(JSON.stringify(arr));
}
export const isIphone = () => {
    return (/iphone/gi).test(navigator.appVersion);
};
export const isAndroid = () => {
    return (/android/gi).test(navigator.userAgent);
}
export const json2Query = (json) => {
    if (json == null || typeof json != 'object') return json;
    let query = [];
    for (let i in json) {
        query[query.length] = i + '=' + json[i];
    }
    return query.join('&');
}
export const extend = (target, options) => {
    for (name in options) {
        target[name] = options[name];
    }
    return target;
}
export const log = (obj) => {
    let os = isAndroid() ? "android" : (isIphone() ? "iphone" : "");
    let img = new Image();
    let urlJson = extend({
        'app': 'wise',
        'etype': 'h5',
        'tn': 'h5',
        'os': os,
        'page': location.hash.slice(1)
    }, obj);
    img.src = '//baidu.com/7.gif?' + json2Query(urlJson) + '&_=' + (+new Date);
}
