import { get_news_by_id, get_news_forum_info_id } from "../lib/fetch.js";
import { get_news_content, get_news_paragraphs, get_news_images, get_metadata_list } from "../lib/parser.js";
import { content_to_html, write_file, create_dir } from "../lib/fs.js";

const WEBSITE_HOST = "https://www.upmedia.mg";
const IMAGE_HOST = "https://www.upmedia.mg";

const main = (document, SerialNo) => {
    const news_dir = `result/${SerialNo}`;
    const create_source = (document, SerialNo) => {
        const source_page = content_to_html(
            get_news_content(document),
            `${document.title} (id: ${SerialNo})`
        );
        const path = `${news_dir}/source.html`;
        write_file(path, source_page);
    };
    const create_markdown = (document, SerialNo) => {
        const source_page = get_news_paragraphs(document, SerialNo).join("\n\n");
        const path = `${news_dir}/article.md`;
        write_file(path, source_page);
    };
    const create_image_list = (document, SerialNo) => {
        const imgs = get_news_images(document, SerialNo).map((dom) => `${IMAGE_HOST}/${dom.src}`);
        const path = `${news_dir}/images.json`;
        write_file(path, JSON.stringify(imgs));
    };
    const create_meta_info = (document, SerialNo) => {
        const metainfo = {
            title: document.title,
            id: SerialNo,
            url: `${WEBSITE_HOST}/news_info.php?SerialNo=${SerialNo}`,
            meta: get_metadata_list(document)
        };
        const path = `${news_dir}/metainfo.json`;
        write_file(path, JSON.stringify(metainfo));
    };
    create_dir(news_dir);
    create_source(document, SerialNo);
    create_markdown(document, SerialNo);
    create_image_list(document, SerialNo);
    create_meta_info(document, SerialNo);
};

export const get_links_from_news = (SerialNo = "1") => {
    get_news_by_id(SerialNo).then( (document) => {
        const is_forum = document.title.includes("大家論壇");
        if( is_forum ) {
            get_news_forum_info_id(SerialNo).then( (forum) => main(forum, SerialNo) );
        } else {
            main(document, SerialNo);
        }
    });
};



