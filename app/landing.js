import { get_landing_page } from "../lib/fetch.js";
import { get_news_links } from "../lib/parser.js";
import { json_to_csv, write_file } from "../lib/fs.js";

export const get_landing_page_info = () => {
    const FILE = "./result/landing.csv";
    get_landing_page().then( (document) => {
        const formatted_links = get_news_links(document);
        write_file( FILE, json_to_csv(formatted_links) );
    } );
};

// get_landing_page_info();
