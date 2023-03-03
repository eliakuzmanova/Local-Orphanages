import { html, render } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";
import { logout } from "../api/user.js";
import { getUserData } from "../api/util.js";

const header = document.querySelector("header")

export function updateNav() {
    const user = getUserData()
    render(navTemplate(user,onLogout), header)
    

    function onLogout(ev) {
        ev.preventDefault()
        logout();
        updateNav()
       page.redirect("/")
    }
}

function navTemplate(user,onLogout) {
    return html`
       <h1><a href="/">Orphelp</a></h1>
<nav>
                <a href="/">Dashboard</a>

                ${user
                ? html`
                 <div id="user">
                    <a href="/myposts">My Posts</a>
                    <a href="/create">Create Post</a>
                    <a @click = ${onLogout} href="javascript:void(0)">Logout</a>
                </div>
                `
                : html`
                 <div id="guest">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>
                `
            }
            </nav>
`
}