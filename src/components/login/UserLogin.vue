<template>
    <div class="w-full flex flex-col items-center justify-center bg-white text-black shadow-md rounded-md ">
        <span class="mb-4 text-3xl font-medium m-10 ">Connexion</span>
        <div class="w-full max-w-xs">
            <form class="flex flex-col items-start">
                <label for="email" class="mb-2 text-gray-400">Adresse Mail</label>
                <input type="text" name="email" id="email"
                    class="shadow-inner border-b-2 w-full mb-2 text-black rounded-md h-12 px-4" v-model="email"
                    placeholder="email@gmail.com" autocomplete="current-password">


                <label for="password" class="mb-2 text-gray-400">Mot de passe</label>
                <input type="password" name="password" id="password"
                    class="shadow-inner border-b-2 w-full mb-2 text-black rounded-md h-12 px-4" v-model="password"
                    placeholder="*****************" autocomplete="current-password">
                <span v-if="error">Mot de passe/Adresse mail Incorrecte</span>
            </form>
        </div>

        <div class="w-full max-w-xs flex justify-between m-2">
            <div class="flex justify-between space-x-2">
                <span>Se Souvenir</span>
                <input type="checkbox" id="cookie" name="cookie" value="cookie" v-model="rememberMe">
            </div>

            <p class="text-indigo-600 font-medium">Mot de passe oublié?</p>
        </div>

        <div class="w-full flex justify-center h-12">
            <button class="w-80 bg-purple-500 mb-2 rounded-md text-white h-8" @click="sendConnexion">Se
                Connecter</button>
        </div>

        <p class="border-solid  ">Ou Continuer Avec</p>

        <a href="" class="flex items-center justify-center">
            <svg class="nz sb" aria-hidden="true" viewBox="0 0 24 24" width="24px" height="48px">
                <path
                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                    fill="#EA4335"></path>
                <path
                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                    fill="#4285F4"></path>
                <path
                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                    fill="#FBBC05"></path>
                <path
                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                    fill="#34A853"></path>
            </svg>
            <span>Google</span>
        </a>
    </div>


    <!-- <div class="flex flex-col lg:flex-row">
        <div class="w-full lg:w-1/2">Contenu de gauche</div>
        <div class="w-full lg:w-1/2">Contenu de droite</div>
    </div> -->
</template>


<script>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { verifConnect } from '@/js/utils.js';
import { tokenValid } from '@/js/utils.js'

export default {
    name: "UserConnexion",
    data() {
        return {
            email: "",
            password: "",
            rememberMe: false,
            error: false
        }
    },
    methods: {
        validateEmail() {
            // Expression régulière pour vérifier une adresse e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(this.email);
        },
        async sendConnexion() {
            // console.log(data)
            // axios.get("http://localhost:3008").then(response => console.log(response.data))

            if (this.validateEmail() && this.password) {
                const data = new FormData();
                data.append('email', this.email);
                data.append('password', this.password);

                try {
                    axios.post("http://localhost:3008/api/login", data).then(async response => {

                        if (response.data) {
                            if (this.rememberMe) {
                                // console.log(this.rememberMe)
                                const res = await axios.post("http://localhost:3008/api/encryptCookie", data)
                                const encryptemail = res.data
                                this.setCookie('rememberMe', encryptemail, 30);
                            }

                            const { token, userId } = response.data;
                            // Stocke le token JWT et l'ID de l'utilisateur localement
                            localStorage.setItem('token', token);
                            window.location.reload();
                        } else {
                            this.error = true
                            setTimeout(() => {
                                this.error = false
                            }, 3000)
                        }
                    })
                } catch (e) {
                    this.error = true
                    setTimeout(() => {
                        this.error = false
                    }, 3000)
                    console.log('ca passe')
                }
            } else {
                this.error = true
                setTimeout(() => {
                    this.error = false
                }, 3000)
            }
        },

        setCookie(name, value, days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = "expires=" + date.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + ";path=/";
        },
        isCookiePresent(cookieName) {
            return document.cookie.split(';').some(cookie => {
                return cookie.trim().startsWith(cookieName + '=');
            });
        },
        getCookie(name) {
            // Prépare le nom du cookie à rechercher dans la chaîne de cookies
            const cookieName = name + "=";
            // Décode la chaîne de cookies pour prendre en compte les caractères spéciaux
            const decodedCookie = decodeURIComponent(document.cookie);
            // Divise la chaîne de cookies en un tableau de cookies individuels
            const cookieArray = decodedCookie.split(';');

            // Parcourt tous les cookies dans le tableau
            for (let i = 0; i < cookieArray.length; i++) {
                let cookie = cookieArray[i];
                // Supprime les espaces au début du cookie
                while (cookie.charAt(0) === ' ') {
                    cookie = cookie.substring(1);
                }
                // Vérifie si le cookie actuel commence par le nom du cookie recherché
                if (cookie.indexOf(cookieName) === 0) {
                    // Si oui, retourne la valeur du cookie en supprimant le nom du cookie
                    return cookie.substring(cookieName.length, cookie.length);
                }
            }
            // Si aucun cookie correspondant n'est trouvé, retourne une chaîne vide
            return "";
        },
        async decryptCookie(cookie) {
            const data = new FormData();
            data.append('email', cookie);
            const response = await axios.post("http://localhost:3008/api/decryptCookie", data)
            const decryptemail = response.data
            if (decryptemail) {
                this.email = decryptemail
                // console.log(this.email)
            }
        }
    },
    async mounted() {
        const router = useRouter()

        const token = await tokenValid();
        await verifConnect(router, token);


        const rememberMeCookieName = 'rememberMe';
        if (this.isCookiePresent(rememberMeCookieName)) {
            const cookie = this.getCookie('rememberMe')
            this.decryptCookie(cookie)
        }
    },
}


</script>