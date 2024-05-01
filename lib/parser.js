function get_links(document) {
    const selector = "a";
    return [...document.querySelectorAll(selector)];
}

export function get_news_links(document) {
    const links = get_links(document).filter( (its) => {
        const is_news_info = its.href.includes("news_info.php");
        const has_text = its.textContent.trim();
        return is_news_info && has_text;
    });
    return links.map((dom) => {
        const link = dom.href;
        const text = dom.textContent.trim().replace(/(\n|\t)/g, " ");
        const params = new URLSearchParams(link);
        const id = params.get("SerialNo");
        // link, 
        return { id, text, };
    });
}

// News
export function get_news_content(document) {
    const selector = "#news-info";
    const dom = document.querySelector(selector);
    if( !dom ) {
        console.log(dom);
        throw Error("No news!");
    }
    const scripts = [...dom.querySelectorAll("script")];
    if( scripts ) {
        scripts.forEach( script => { script.remove() });
    }
    return dom.innerHTML;
}
export function get_news_paragraphs(document) {
    const selector = "#news-info .title, #news-info p";
    return [...document.querySelectorAll(selector)].map( dom => dom.textContent.trim() );
}

// Images
export function get_images(document) {
    const selector = "img";
    return [...document.querySelectorAll(selector)].filter( img => img.src );
}
export function get_news_images(document) {
    return get_images(document).filter( img => img.src.includes("upload/article") );
}

// Metadata
export function get_metadata_list(document) {
    return [...document.querySelectorAll("meta")].filter(
        (dom) => dom.attributes.name || dom.attributes.itemprop
    ).map((dom) => ({
        name: dom.attributes.name?.value ?? "",
        itemprop: dom.attributes.itemprop?.value ?? "",
        value: dom.attributes.content.value ?? "",
    }));
}
