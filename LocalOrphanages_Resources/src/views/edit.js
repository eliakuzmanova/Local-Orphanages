import {html} from "../../node_modules/lit-html/lit-html.js"
import { editById, getById } from "../api/data.js"
import { createSubmitHandler } from "../api/util.js"

export async function showEditView(ctx) {
    const id = ctx.params.id
    const data = await getById(id)
    ctx.render(editTemplate(data, createSubmitHandler(onSubmit)))

   async function onSubmit({title,description,imageUrl,address,phone}) { 
        
    if (!title || !description || !imageUrl || !address || !phone) { //add params <<<----------------
            alert("All fields are required")
            return
        }

       await editById(id,{title,
        description,
        imageUrl,
        address,
        phone
      }) //add params <<<----------------

        ctx.page.redirect(`/details/${id}`) // check if redirect is correct 
    }
}

function editTemplate(data, onSubmit) {
return html`
<section id="edit-page" class="auth">
            <form @submit = ${onSubmit} id="edit">
                <h1 class="title">Edit Post</h1>

                <article class="input-group">
                    <label for="title">Post Title</label>
                    <input type="title" name="title" id="title" value="${data.title}">
                </article>

                <article class="input-group">
                    <label for="description">Description of the needs </label>
                    <input type="text" name="description" id="description" value="${data.description}">
                </article>

                <article class="input-group">
                    <label for="imageUrl"> Needed materials image </label>
                    <input type="text" name="imageUrl" id="imageUrl" value="${data.imageUrl}">
                </article>

                <article class="input-group">
                    <label for="address">Address of the orphanage</label>
                    <input type="text" name="address" id="address" value="${data.address}">
                </article>

                <article class="input-group">
                    <label for="phone">Phone number of orphanage employee</label>
                    <input type="text" name="phone" id="phone" value="${data.phone}">
                </article>

                <input type="submit" class="btn submit" value="Edit Post">
            </form>
        </section>
`
}