import { JSDOM } from "jsdom";

export const get_page = (url = "") => {
    return new Promise( (resolve, reject) => {
        const ajax = fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 Takami/1.0"
            },
        }).then( t => t.text() );
        ajax.then( (page) => {
            const doc = new JSDOM(page);
            resolve( doc.window.document );
        }).catch( e => reject(e) );
    });
};

export const get_landing_page = () => {
    return get_page("https://www.upmedia.mg");
};

export const get_news_by_id = (SerialNo = "1") => {
    return get_page(`https://www.upmedia.mg/news_info.php?SerialNo=${SerialNo}`);
};

export const get_news_forum_info_id = (SerialNo = "1") => {
    return get_page(`https://www.upmedia.mg/forum_info.php?SerialNo=${SerialNo}`);
};

export const get_news_by_type = (Type = "latest", currentPage = "1") => {
    const params = new URLSearchParams({ Type, currentPage });
    return get_page(`https://www.upmedia.mg/news_list.php?${params.toString()}`);
};
