import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAll } from "../api/data.js";


export async function showCatalogView(ctx) {
    const data = await getAll()
    ctx.render(catalogTemplate(data))
}

function catalogTemplate(data) {
    return html`
    <section id="dashboard-page">
        <h1 class="title">All Posts</h1>
        ${data.length !== 0
                ? html`
        <div class="all-posts">
            ${data.map(el => elemTemplate(el))}
        </div>
        `
                : html`
        <h1 class="title no-posts-title">No posts yet!</h1>
        `}
    </section>

`}

function elemTemplate(elem) {
    return html`
    <div class="post">
        <h2 class="post-title">${elem.title}</h2>
        <img class="post-image" src="${elem.imageUrl}" alt="Kids clothes">
        <div class="btn-wrapper">
            <a href= "/details/${elem._id}" class="details-btn btn">Details</a>
        </div>
    </div>

`}