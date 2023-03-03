import { html } from "../../node_modules/lit-html/lit-html.js";
import { create } from "../api/data.js";
import { createSubmitHandler } from "../api/util.js";

export function showCreateView(ctx) {

    ctx.render(createTemplate(createSubmitHandler(onSubmit)))

    async function onSubmit({title,description,imageUrl,address,phone}) { //add params <<<-----------------

        if (!title || !description || !imageUrl || !address || !phone) {  //add params <<<-----------------
            alert("All fields are required")
            return
        }

        await create({title,description,imageUrl,address,phone})  //add params <<<-----------------

        ctx.page.redirect(`/`) // check if redirect is correct
    }

}

function createTemplate(onSubmit) {
    return html`
 <section id="create-page" class="auth">
            <form @submit = ${onSubmit} id="create">
                <h1 class="title">Create Post</h1>

                <article class="input-group">
                    <label for="title">Post Title</label>
                    <input type="title" name="title" id="title">
                </article>

                <article class="input-group">
                    <label for="description">Description of the needs </label>
                    <input type="text" name="description" id="description">
                </article>

                <article class="input-group">
                    <label for="imageUrl"> Needed materials image </label>
                    <input type="text" name="imageUrl" id="imageUrl">
                </article>

                <article class="input-group">
                    <label for="address">Address of the orphanage</label>
                    <input type="text" name="address" id="address">
                </article>

                <article class="input-group">
                    <label for="phone">Phone number of orphanage employee</label>
                    <input type="text" name="phone" id="phone">
                </article>

                <input type="submit" class="btn submit" value="Create Post">
            </form>
        </section>
`
}