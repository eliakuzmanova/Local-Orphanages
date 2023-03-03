import { getUserData } from "../api/util.js";
import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyItemsById } from "../api/data.js";



export async function showMyPostsView(ctx) {

    const user = getUserData()
    const myItems = await getMyItemsById(user._id)
    ctx.render(myFurnitureTemplates(myItems))
// '    async function onClick(ev) {
//         ev.preventDefault();
//         ctx.page.redirect(`/details/${item._id}`)
        
//     }'
}

function myFurnitureTemplates(items) {
    return html`
   <section id="my-posts-page">
            <h1 class="title">My Posts</h1>

            <!-- Display a div with information about every post (if any)-->
            ${items.length !== 0
            ? html`
            <div class="my-posts">
           ${items.map(item => cardTemplate(item))}
            </div>
            `
            : html`
            <h1 class="title no-posts-title">You have no posts yet!</h1>
            `
        }
        </section>
    `
}

// function showItems(items) {
//     if (items.length > 1) {
//         return items.map(item => cardTemplate(item))
//     } else if (items.length > 0) {
//         return  cardTemplate(items[0])
//     } else {
//         return
//     }
   
// }

function cardTemplate(elem) {
    return html`
  <div class="post">
        <h2 class="post-title">${elem.title}</h2>
        <img class="post-image" src="${elem.imageUrl}" alt="Kids clothes">
        <div class="btn-wrapper">
            <a href= "/details/${elem._id}" class="details-btn btn">Details</a>
        </div>
    </div>
    `

}


