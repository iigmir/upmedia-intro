import { get_news_by_id, get_news_forum_info_id } from "../lib/fetch.js";
import { get_news_content, get_news_paragraphs, get_news_images, get_metadata_list } from "../lib/parser.js";
import { content_to_html, write_file, create_dir } from "../lib/fs.js";

const WEBSITE_HOST = "https://www.upmedia.mg";
const IMAGE_HOST = "https://www.upmedia.mg";

const write_file_action = (document, SerialNo) => {
    const NEWS_DIR = `result/${SerialNo}`;
    
    const get_path = (action) => {
        switch (action) {
            case "source": return `${NEWS_DIR}/source.html`;
            case "markdown": return `${NEWS_DIR}/article.md`;
            case "image_list": return `${NEWS_DIR}/images.json`;
            case "meta_info": return `${NEWS_DIR}/metainfo.json`;
            default: return `${NEWS_DIR}/unknown-file.txt`;
        }
    };

    const get_content = (document, SerialNo, action) => {
        switch (action) {
            case "source": return content_to_html(
                get_news_content(document),
                `${document.title} (id: ${SerialNo})`
            );
            case "markdown": return get_news_paragraphs(
                document,
                SerialNo
            ).join("\n\n");
            case "image_list": return JSON.stringify(
                get_news_images(document, SerialNo)
                .map((dom) => `${IMAGE_HOST}/${dom.src}`)
            );
            case "meta_info": return JSON.stringify({
                title: document.title,
                id: SerialNo,
                url: `${WEBSITE_HOST}/news_info.php?SerialNo=${SerialNo}`,
                meta: get_metadata_list(document)
            });
            default: return "";
        }
    };

    // Actions
    create_dir(NEWS_DIR);
    ["source", "markdown", "image_list", "meta_info"].forEach( (action) => {
        const path = get_path(action);
        const content = get_content(document, SerialNo, action);
        write_file( path, content );
    });
};

const get_web_document = (SerialNo = "1") => {
    return new Promise( async (resolve, reject) => {
        try {
            const document = await get_news_by_id(SerialNo);
            const FORUM_KEYWORD = "大家論壇";
            if( document.title.includes( FORUM_KEYWORD ) ) {
                const forum_document = await get_news_forum_info_id(SerialNo);
                resolve(forum_document);
            } else {
                resolve(document);
            }
        } catch (error) {
            reject(error);
        }
    });
};

export const get_links_from_news = (SerialNo = "1") => {
    get_web_document(SerialNo).then( (document) => {
        write_file_action(document, SerialNo)
    });
};



