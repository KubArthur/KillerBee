<template>
  <div class="container">
    <div class="model-list">
      <div class="header">
        <h2>Liste des Modèles</h2>
        <div class="button-group">
          <button @click="fetchModels">Actualiser</button>
          <button @click="showCreateForm">Créer un Modèle</button>
        </div>
      </div>
      <ul>
        <li
          class="model-item"
          v-for="model in models"
          :key="model.id"
          @click="selectModel(model)"
        >
          {{ model.id }} - {{ model.name }} : {{ model.description }}
        </li>
      </ul>
    </div>

    <div class="red-box">
      <h2 v-if="!isCreating">Détails</h2>
      <h2 v-else>Créer un Nouveau Modèle</h2>

      <form v-if="!isCreating" @submit.prevent>
        <label for="name">Nom :</label>
        <input
          type="text"
          v-model="selectedModel.name"
          id="name"
          :disabled="!isEditing || !selectedModel.id"
        />

        <label for="description">Description :</label>
        <input
          type="text"
          v-model="selectedModel.description"
          id="description"
          :disabled="!isEditing || !selectedModel.id"
        />

        <label for="unit_price_excluding_tax">Prix HT :</label>
        <input
          type="text"
          v-model="selectedModel.unit_price_excluding_tax"
          id="unit_price_excluding_tax"
          :disabled="!isEditing || !selectedModel.id"
        />

        <label for="range">Gamme :</label>
        <input
          type="text"
          v-model="selectedModel.range"
          id="range"
          :disabled="!isEditing || !selectedModel.id"
        />

        <label for="weights">Poids :</label>
        <input
          type="text"
          v-model="selectedModel.weights"
          id="weights"
          :disabled="!isEditing || !selectedModel.id"
        />

        <label for="ingredients">Ingrédients :</label>
        <div
          v-for="(ingredient, index) in selectedModel.ingredients"
          :key="index"
        >
          <input
            type="text"
            v-model="selectedModel.ingredients[index]"
            :disabled="!isEditing || !selectedModel.id"
          />
          <button v-if="isEditing" @click="removeIngredient(index)">
            Supprimer
          </button>
        </div>
        <button v-if="isEditing" @click="addIngredient">
          Ajouter un ingrédient
        </button>

        <button
          v-if="!isEditing"
          :disabled="
            !selectedModel.id ||
            !selectedModel.name ||
            !selectedModel.description
          "
          class="update-button"
          @click="isEditing = true"
        >
          Modifier
        </button>

        <button
          v-if="isEditing"
          class="confirm-button"
          @click="confirmUpdate"
          :disabled="!selectedModel.name || !selectedModel.description"
        >
          Confirmer
        </button>
        <button v-if="isEditing" class="cancel-button" @click="cancelUpdate">
          Annuler
        </button>

        <button
          :disabled="!selectedModel.id"
          class="delete-button"
          @click="deleteSelectedModel(selectedModel.id)"
        >
          Supprimer
        </button>
      </form>

      <form v-if="isCreating" @submit.prevent="createNewModel">
        <label for="new-name">Nom :</label>
        <input type="text" v-model="newModel.name" id="new-name" />

        <label for="new-description">Description :</label>
        <input
          type="text"
          v-model="newModel.description"
          id="new-description"
        />

        <label for="new-unit_price_excluding_tax">Prix HT :</label>
        <input
          type="text"
          v-model="newModel.unit_price_excluding_tax"
          id="new-unit_price_excluding_tax"
        />

        <label for="new-range">Gamme :</label>
        <input type="text" v-model="newModel.range" id="new-range" />

        <label for="new-weights">Poids :</label>
        <input type="text" v-model="newModel.weights" id="new-weights" />

        <label for="ingredients">Ingrédients (ID) :</label>
        <ul>
          <li
            v-for="(ingredient, index) in selectedModel.ingredients"
            :key="index"
          >
            {{ ingredient }}
          </li>
        </ul>

        <button
          class="create-button"
          type="submit"
          :disabled="
            !newModel.name ||
            !newModel.description ||
            !newModel.unit_price_excluding_tax ||
            !newModel.range ||
            !newModel.weights ||
            !newModel.ingredients
          "
        >
          Créer
        </button>
        <button class="cancel-button" @click="cancelCreate">Annuler</button>
      </form>
    </div>
  </div>
</template>

<script src="../components/scripts/Modele.js"></script>
<style src="../components/styles/Modele.css"></style>
