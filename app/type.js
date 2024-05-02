import { get_news_by_type } from "../lib/fetch.js";
import { get_news_links } from "../lib/parser.js";
import { json_to_csv, write_file } from "../lib/fs.js";

export const get_links_from_type = (Type = "latest", currentPage = "1") => {
    const write_file_action = (document) => {
        const FILE = `./result/type-${Type}-at-page-${currentPage}.csv`;
        write_file(FILE, json_to_csv(get_news_links(document)));
    };
    get_news_by_type( Type, currentPage ).then( write_file_action );
};
