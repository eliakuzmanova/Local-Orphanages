import {html} from "../../node_modules/lit-html/lit-html.js";
import { updateNav } from "./nav.js";
import { login } from "../api/user.js";
import { createSubmitHandler } from "../api/util.js";

export function showLoginView(ctx) {
ctx.render(loginTemplate(createSubmitHandler(onSubmit)))

async function onSubmit({email, password}) {
    if (!email || !password) {
        alert("All fields are required")
        return
    } 
        await login(email, password)
        updateNav()
        ctx.page.redirect("/") //check if redirect is correct
    
}
}

function loginTemplate(onSubmit) {
return html`
<section id="login-page" class="auth">
            <form @submit = ${onSubmit} id="login">
                <h1 class="title">Login</h1>

                <article class="input-group">
                    <label for="login-email">Email: </label>
                    <input type="email" id="login-email" name="email">
                </article>

                <article class="input-group">
                    <label for="password">Password: </label>
                    <input type="password" id="password" name="password">
                </article>

                <input type="submit" class="btn submit-btn" value="Log In">
            </form>
        </section>
`
}