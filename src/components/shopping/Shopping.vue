<template>
    <div class="border border-black relative size-96 flex flex-col ">
        <div v-for="(materiel, id) in shopping" :key="id">
            <span>{{ materiel.name }}</span>
            <span>{{ materiel.state }}</span>
            <span>{{ materiel.category }}</span>
            <span>{{ materiel.price }}</span>
            <span>{{ materiel.quantite }}</span>
            <img :src="materiel.url" alt="">
        </div>

        <div class="h-full z-1 overflow-y-auto  ">
            <div class="p-2 flex border-b-2 border-gray-300 h-full relative">
                <img class="size-44"
                    src="https://img01.ztat.net/article/spp-media-p1/8455593e3f5d4a3db5d378de79037909/055c57069f9b4942911dadff4d04341a.jpg?imwidth=300&filter=packshot"
                    alt="">
                <div class="flex flex-col pl-5 pt-5 relative w-full">
                    <span class="italic pl-2">{{ name }}</span>
                    <span class="pl-2">{{ category }}</span>
                    <span class="font-bold p-2">{{ price }}</span>
                    <span class="text-gray-500 p-2 text-sm	">{{ state }}</span>
                    <span class="text-red-500 p-2 text-xs	">{{ isAvailable }}</span>
                    <button
                        class="text-gray-400 absolute bottom-5 right-10 hover:ease-in-out hover:text-red-500 duration-300 size-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div
            class="h-full flex flex-col items-center justify-center shadow-inner border-t-2 bg-white z-0  border-slate-500">
            <div class="w-11/12 flex justify-between p-2  ">
                <span>TVA</span>
                <span>{{ priceTVA }}€</span>
            </div>
            <div class="w-11/12 flex justify-between p-2">
                <span class="font-bold">Total</span>
                <span class="font-bold">{{ totalPrice }}€</span>
            </div>
            <button
                class="text-white w-11/12 h-14 bg-black p-2 mt-1 font-bold hover:ease-in-out hover:opacity-75 duration-300">Mon
                panier</button>
        </div>

    </div>
</template>

<script>

export default {
    data() {
        return {
            name: "Chaise",
            price: "10,50€",
            state: "Satisfaisant",
            category: "Equipement Plein air",
            isAvailable: true === true ? "Disponible" : "Insdisponible",
            totalPrice: 10.50,
            priceTVA: 4.50,
            shoppings: [],
        }
    },
    methods: {
        getItemsShopping() {
            const items = localStorage.get
        }
    }
}

</script>