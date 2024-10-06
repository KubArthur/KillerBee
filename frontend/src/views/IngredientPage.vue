<template>
  <div class="container">
    <div class="ingredient-list">
      <div class="header">
        <h2>Liste des Ingrédients</h2>
        <div class="button-group">
          <button @click="fetchIngredients">Actualiser</button>
          <button @click="showCreateForm">Créer un Ingrédient</button>
        </div>
      </div>
      <ul>
        <li
          class="ingredient-item"
          v-for="ingredient in ingredients"
          :key="ingredient.id_ingredient"
          @click="selectIngredient(ingredient)"
        >
          {{ ingredient.id_ingredient }} - {{ ingredient.name }} :
          {{ ingredient.description }}
        </li>
      </ul>
    </div>

    <div class="red-box">
      <h2 v-if="!isCreating">Détails</h2>
      <h2 v-else>Créer un Nouvel Ingrédient</h2>

      <form v-if="!isCreating" @submit.prevent>
        <label for="name">Nom :</label>
        <input
          type="text"
          v-model="selectedIngredient.name"
          id="name"
          :disabled="!isEditing || !selectedIngredient.id_ingredient"
        />

        <label for="description">Description :</label>
        <input
          type="text"
          v-model="selectedIngredient.description"
          id="description"
          :disabled="!isEditing || !selectedIngredient.id_ingredient"
        />

        <!-- Le bouton "Modifier" est désactivé si aucun ingrédient n'est sélectionné ou si les champs sont vides -->
        <button
          v-if="!isEditing"
          :disabled="
            !selectedIngredient.id_ingredient ||
            !selectedIngredient.name ||
            !selectedIngredient.description
          "
          class="update-button"
          @click="isEditing = true"
        >
          Modifier
        </button>

        <!-- Les boutons "Confirmer" et "Annuler" ne s'affichent que si on modifie -->
        <button
          v-if="isEditing"
          class="confirm-button"
          @click="confirmUpdate"
          :disabled="
            !selectedIngredient.name || !selectedIngredient.description
          "
        >
          Confirmer
        </button>
        <button v-if="isEditing" class="cancel-button" @click="cancelUpdate">
          Annuler
        </button>

        <!-- Le bouton "Supprimer" est désactivé si aucun ingrédient n'est sélectionné -->
        <button
          :disabled="!selectedIngredient.id_ingredient"
          class="delete-button"
          @click="deleteSelectedIngredient(selectedIngredient.id_ingredient)"
        >
          Supprimer
        </button>
      </form>

      <form v-if="isCreating" @submit.prevent="createNewIngredient">
        <label for="new-name">Nom :</label>
        <input type="text" v-model="newIngredient.name" id="new-name" />

        <label for="new-description">Description :</label>
        <input
          type="text"
          v-model="newIngredient.description"
          id="new-description"
        />

        <!-- Désactive le bouton "Créer" si les champs sont vides -->
        <button
          class="create-button"
          type="submit"
          :disabled="!newIngredient.name || !newIngredient.description"
        >
          Créer
        </button>
        <button class="cancel-button" @click="cancelCreate">Annuler</button>
      </form>
    </div>
  </div>
</template>

<script src="../components/scripts/Ingredient.js"></script>
<style src="../components/styles/Ingredient.css"></style>
