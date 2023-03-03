import {html} from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/user.js";
import { createSubmitHandler } from "../api/util.js";

export function showRegisterView(ctx) {
ctx.render(registerTemplate(createSubmitHandler(onSubmit)))

async function onSubmit({email, password, "repeatPassword": repassword}) { // check if repass is with that name <-------
    if (!email || !password) {
        alert("All fields are required")
        return
    } 
     if(password !== repassword){
        alert("Password don\`t match")
        return
    } 
        await register(email, password)
        ctx.page.redirect("/") // check if redirect id correct
    
}
}

function registerTemplate(onSubmit) {
return html`

<section id="register-page" class="auth">
            <form @submit = ${onSubmit} id="register">
                <h1 class="title">Register</h1>

                <article class="input-group">
                    <label for="register-email">Email: </label>
                    <input type="email" id="register-email" name="email">
                </article>

                <article class="input-group">
                    <label for="register-password">Password: </label>
                    <input type="password" id="register-password" name="password">
                </article>

                <article class="input-group">
                    <label for="repeat-password">Repeat Password: </label>
                    <input type="password" id="repeat-password" name="repeatPassword">
                </article>

                <input type="submit" class="btn submit-btn" value="Register">
            </form>
        </section>
`
}