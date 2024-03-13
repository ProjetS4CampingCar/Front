<template>
    <div class='w-full flex flex-col items-center justify-center bg-white text-black shadow-md rounded-md p-5'>
      <h3 class="mb-4 text-3xl font-medium m-10">Modifier un objet</h3>
      <div class="flex flex-col items-start w-full">
        <label class="mb-2 text-black-400"> Nom de l'objet : </label>
        <input class="tshadow-inner border-b-2 w-full mb-1 text-black rounded-md h-8 px-4" v-model='name' type='text' />
  
        <label class="mb-2 text-black-400"> Description de l'objet : </label>
        <input class="shadow-inner border-b-2 w-full mb-1 text-black rounded-md h-8 px-4" v-model='description' />
  
        <label class="mb-2 text-black-400"> Image de l'objet : </label>
        <input class="w-full mb-1 text-black rounded-md h-8 px-4" ref="file" type='file' :name="lastid" />
  
        <label class="mb-2 text-black-400"> Prix de la réservation à la journée : </label>
        <input class="shadow-inner border-b-2 w-full mb-1 text-black rounded-md h-8 px-4" type='number' v-model='price' />
  
        <label class="mb-2 text-black-400"> Catégorie : </label>
        <select class="shadow-inner border-b-2 w-full mb-1 text-black rounded-md h-8 px-4" v-model='cat'>
          <option value="Equipement Camping">Equipement Camping</option>
          <option value="Equipement Tente">Equipement Tente</option>
          <option value="Equipement Divertissement">Equipement Divertissement</option>
          <option value="Equipement Plein air">Equipement Plein air</option>
          <option value="Equipement Sécurité">Equipement Sécurité</option>
        </select>
  
        <label class="mb-2 text-black-400"> Etat de l'objet : </label>
        <select class="shadow-inner border-b-2 w-full mb-1 text-black rounded-md h-8 px-4" v-model='state'>
          <option value="Neuf">Neuf</option>
          <option value="Très Bon Etat">Très bon état</option>
          <option value="Bon Etat">Bon état</option>
          <option value="Satisfaisant">Satisfaisant</option>
        </select>
        <p>{{ errorMessage }}</p>
      </div>
      <input type='submit' @click='add()' value='Ajouter cet objet'
        class="w-80 bg-purple-500 mt-2 mb-2 rounded-md text-white h-8" />
    </div>
  </template>