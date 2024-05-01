import { get_landing_page_info, get_links_from_news, get_links_from_type } from "./app/index.js";

// land 12 3
function main() {
    const [request_type, id, page] = process.argv.slice(2);
    switch (request_type) {
        case "news":
            if( !id ) {
                throw new ReferenceError("No ID given");
            }
            get_links_from_news(id);
            break;
        case "list":
        case "type":
            if( !id ) {
                throw new ReferenceError("No ID given");
            }
            get_links_from_type(id, page ?? "1");
            break;
        case "landing":
        default:
            get_landing_page_info();
            break;
    }
}

main();

