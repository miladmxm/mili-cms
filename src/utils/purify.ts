import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const purify = (html: string) => DOMPurify(new JSDOM("").window).sanitize(html);

export default purify;
