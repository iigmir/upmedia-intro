import { writeFileSync, mkdirSync } from "fs";
import Papa from "papaparse";

/**
 * @see <https://a498390344.medium.com/javascript%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98-%E4%BD%A0%E9%81%B2%E6%97%A9%E9%83%BD%E8%A6%81%E6%87%82%E5%BE%8C%E7%AB%AF%E7%9A%84-node-js-%E7%9A%84%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98vol-2-module-%E7%AF%87-a98db0677a3f>
 * @see <https://blog.logrocket.com/using-writefilesync-node-js>
 * @param {String} path 
 * @param {String} content 
 */
export const write_file = (path = "", content = "") => {
    try {
        writeFileSync(path, content, {});
    } catch (up) {
        console.error(up);
        throw up;
    }
};

export const create_dir = (path = "result/test") => {
    try {
        mkdirSync(path);
    } catch (up) {
        // file already exists is not a big deal for me
        if( up.code === "EEXIST" ) {
            console.warn("We have fetched the news before");
            return;
        } else {
            console.error(up);
            throw up;
        }
    }
};

export const json_to_csv = (input = [{}]) => {
    return Papa.unparse(input, {});
};

export const content_to_html = (content = "<article></article>", title = "News") => {
    const html_head = `<head><title>${title}</title><meta charset="utf-8" /><meta http-equiv="Content-type" content="text/html; charset=utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>`;
    const html_body = `<body>${content}</body>`;
    return `<!doctype html><html>
${html_head}
${html_body}
</html>`;
};
