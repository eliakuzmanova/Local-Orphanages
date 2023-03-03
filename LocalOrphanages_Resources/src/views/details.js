import {html, nothing} from "../../node_modules/lit-html/lit-html.js";
import { deleteById, getById, getDonations, getUserDonation, makeDonations } from "../api/data.js";
import { getUserData } from "../api/util.js";

export async function showDetailsView(ctx) {
    
    const id = ctx.params.id
    const data = await getById(id)
    
    const user = getUserData()
    let isUser = Boolean(user)
    let isOwner = isUser && user._id == data._ownerId
    let donations = await getDonations(id) 
    let canDonate = await getUserDonation(id, user._id)

    ctx.render(detailsTemplate(data, isOwner, onEdit, onDelete , onDonation, donations, canDonate, isUser)) // add params <<< -------------

    async function onDelete(ev) {
       const isConfirm = confirm("Are you sure you want to delete")

       if (isConfirm) {
        await deleteById(id)
        ctx.page.redirect(`/catalog`)
       } else {
        return
       }
        
    }

    async function onEdit(ev) {
        
        ctx.page.redirect(`/edit/${id}`)
    }

    async function onDonation(ev) {
        await makeDonations(id)
        donations++
        canDonate = await getUserDonation(id, user._id)
        ctx.render(detailsTemplate(data, isOwner, onEdit, onDelete , onDonation, donations, canDonate, isUser))
    }
}



function detailsTemplate(data, isOwner, onEdit, onDelete, onDonation, donations, canDonate, isUser) {  // add params <<< ----------------------
return html`
 <section id="details-page">
            <h1 class="title">Post Details</h1>

            <div id="container">
                <div id="details">
                    <div class="image-wrapper">
                        <img src="${data.imageUrl}" alt="Material Image" class="post-image">
                    </div>
                    <div class="info">
                        <h2 class="title post-title">${data.title}</h2>
                        <p class="post-description">Description: ${data.description}</p>
                        <p class="post-address">Address: ${data.address}</p>
                        <p class="post-number">Phone number: ${data.phone}</p>
                        <p class="donate-Item">Donate Materials: ${donations}</p>
                            ${isOwner
                            ? html `
                                <div class="btns">
                                    <a @click = ${onEdit} href="/edit/${data._id}" class="edit-btn btn">Edit</a>
                                    <a @click = ${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>
                                  
                                </div>
                            `
                            : donationBtn(canDonate, onDonation, isUser)
                            } 
                            
                    </div>
                </div>
            </div>
        </section>
        `
}

function donationBtn(canDonate ,onDonation, isUser) {
    return html`
    ${canDonate == 0 && isUser
    ? html`
    <a @click = ${onDonation} href="javascript:void(0)" class="donate-btn btn">Donate</a>
    `
    : nothing
    }
    
    `
}