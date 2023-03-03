import { del, get, post, put } from "./api.js";

    export async function getAll() {
      return await get("/data/posts?sortBy=_createdOn%20desc")
    }

export async function getById(id) {
    return await get(`/data/posts/${id}`) 
}

export async function deleteById(id) {
    return await del(`/data/posts/${id}`)
}

export async function create(data) {
    return await post("/data/posts", data)
}

export async function editById(id, data) {
     return await put(`/data/posts/${id}`, data)
}

export async function getMyItemsById(userId) {
 return await get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function makeDonations(postId) {
    return await post(`/data/donations`, {postId})
}

export async function getDonations(postId) {
    return await get(`/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`)
}

export async function getUserDonation(postId, userId) {
    return await get(`/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}