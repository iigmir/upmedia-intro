import { get_news_by_id, get_news_forum_info_id } from "../lib/fetch.js";
import { get_news_content, get_news_paragraphs, get_news_images, get_metadata_list } from "../lib/parser.js";
import { content_to_html, write_file, create_dir } from "../lib/fs.js";

const WEBSITE_HOST = "https://www.upmedia.mg";
const IMAGE_HOST = "https://www.upmedia.mg";

const write_file_action = (document, SerialNo) => {
    const news_dir = `result/${SerialNo}`;
    const create_source = (document, SerialNo) => {
        const source_content = content_to_html(
            get_news_content(document),
            `${document.title} (id: ${SerialNo})`
        );
        const path = `${news_dir}/source.html`;
        // Write file
        write_file(path, source_content);
    };
    const create_markdown = (document, SerialNo) => {
        const source_content = get_news_paragraphs(document, SerialNo).join("\n\n");
        const path = `${news_dir}/article.md`;
        // Write file
        write_file(path, source_content);
    };
    const create_image_list = (document, SerialNo) => {
        const imgs = get_news_images(document, SerialNo).map((dom) => `${IMAGE_HOST}/${dom.src}`);
        const source_content = JSON.stringify(imgs);
        const path = `${news_dir}/images.json`;
        // Write file
        write_file(path, source_content);
    };
    const create_meta_info = (document, SerialNo) => {
        const metainfo = {
            title: document.title,
            id: SerialNo,
            url: `${WEBSITE_HOST}/news_info.php?SerialNo=${SerialNo}`,
            meta: get_metadata_list(document)
        };
        const source_content  = JSON.stringify(metainfo);
        const path = `${news_dir}/metainfo.json`;
        // Write file
        write_file(path, source_content);
    };
    create_dir(news_dir);
    create_source(document, SerialNo);
    create_markdown(document, SerialNo);
    create_image_list(document, SerialNo);
    create_meta_info(document, SerialNo);
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



