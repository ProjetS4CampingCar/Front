<template>
    <div class="bg-tertiary grid grid-flow-rows grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-2">
        <div class="flex flex-row relative" :class="{ 'col-span-2': clickedElement === id }"
            v-for="(material, id) in materials" :key="id">

            <!-- Main content -->
            <div class="max-w-64 px-4 border-l-4 border-buttonColor box-content text-black  relative flex-col duration-500"
                :class="{ 'hover:scale-95': clickedElement !== id, 'sm:border-l-0 sm:px-0 sm:pr-4': clickedElement === id }"
                @click="toggleDescription(id)">

                <img class="rounded max-w-40 sm:max-w-48 z-10"
                    src="https://previews.123rf.com/images/druzhinina/druzhinina1802/druzhinina180200056/95918689-ensemble-d-%C3%A9quipement-de-voyage-accessoires-pour-camping-et-camps-illustration-de-dessin-anim%C3%A9-de.jpg"
                    alt="test" />

                <div v-if="clickedElement != id"
                    class="font-medium text-textColor1 hover:text-hoverColor cursor-pointer ">
                    {{ material.name }}
                </div>
                <div v-if="clickedElement != id" class="text-textColor2">
                    {{ material.price }}€/j
                </div>
            </div>

            <!-- Description content -->
            <div>
                <div v-if="clickedElement === id"
                    class="font-medium text-textColor1 hover:text-hoverColor cursor-pointer">
                    {{ material.name }}
                </div>
                <div v-if="clickedElement === id" class="text-textColor2">
                    {{ material.price }}€/j
                </div>

                <div v-if="clickedElement === id" class="text-textColor1">
                    Description :
                    {{ material.description }}
                </div>
            </div>

            <!-- Texte en position absolue à droite -->
            <div v-if="(id + 2) % getNbCols() === 0 && id !== materials.length - 1"
                class="absolute top-[60px] -right-40 text-sm text-gray-500 px-2">
                <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20 7V8.2C20 9.88016 20 10.7202 19.673 11.362C19.3854 11.9265 18.9265 12.3854 18.362 12.673C17.7202 13 16.8802 13 15.2 13H4M4 13L8 9M4 13L8 17"
                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {

    name: 'afficheMateriaux',
    data() {
        return {
            materials: [],
            clickedElement: null,
        };
    },
    mounted() {
        console.log("ca passe")

        axios.get("http://localhost:3008/api/materials")
            .then(response => {
                this.materials = response.data["test"];
            })
            .catch(error => {
                console.error('Error fetching materials:', error);
            });
    },
    methods: {
        toggleDescription(id) {
            this.clickedElement = this.clickedElement === id ? null : id;
        },
        isEndOfRow(id) {
            var numCols = getNbCols(); // Change this to match your number of columns
            return (id + 1) % numCols === 0;
        },
        getNbCols() {
            // Logique pour déterminer le nombre de colonnes en fonction de la largeur de l'écran
            const screenWidth = window.innerWidth;
            if (screenWidth < 640) {
                console.log("2");
                return 2;

            } else if (screenWidth < 1024) {
                console.log("3");
                return 3;
            } else if (screenWidth < 1280) {
                console.log("4");
                return 4;
            } else {
                console.log("5");
                return 5;
            }
        },
    },
};
</script>