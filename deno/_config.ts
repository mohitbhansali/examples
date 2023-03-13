import lume from "lume/mod.ts";
import not_found from "lume/middlewares/not_found.ts";
import postcss from "lume/plugins/postcss.ts";
import date from "lume/plugins/date.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import basePath from "lume/plugins/base_path.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import pagefind from "lume/plugins/pagefind.ts";
import sitemap from "lume/plugins/sitemap.ts";
import toc from "https://deno.land/x/lume_markdown_plugins@v0.1.0/toc/mod.ts";
import codecopy from "./codecopy.ts";

const markdown = {
    plugins: [toc],
    keepDefaultPlugins: true,
};

const site = lume({
    location: new URL("https://exploit-notes.hdks.org"),
    src: "./src",
    dest: "./_site",
    emptyDest: true,
    prettyUrls: true,
    server: {
        port: 3000,
        page404: "/404",
        open: false,
    },
    watcher: {
        debounce: 1000,
    },
},
{ markdown });

site
.ignore("README.md")
.copy("assets", ".")
.use(postcss())
.use(date())
.use(codeHighlight())
.use(basePath())
.use(slugifyUrls({ alphanumeric: false }))
.use(resolveUrls())
.use(pagefind({
    ui: {
        containerId: "search",
        showImages: false,
        showEmptyFilters: true,
        resetStyles: true,
    },
}))
.use(sitemap())
.use(codecopy());

site.helper("titlize", (text) => {
    const tSplit = text.split(/[\-\_]/g);
    return tSplit.map((t: string) => {
        const newT = [...t];
        newT[0] = newT[0].toUpperCase();
        return newT.join("");
    }).join(" ");
}, { type: "filter" });

export default site;
