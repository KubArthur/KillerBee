<template>
  <div class="container">
    <div class="ingredient-list">
      <!-- Changement de nom pour correspondre au CSS -->
      <div class="header">
        <h2>Liste des Processus</h2>
        <div class="button-group">
          <button @click="fetchProcesses">Actualiser</button>
          <button @click="showCreateForm">Créer un Processus</button>
        </div>
      </div>
      <ul>
        <li
          class="ingredient-item"
          v-for="process in processes"
          :key="process.id_process"
          @click="selectProcess(process)"
        >
          {{ process.id_process }} - {{ process.name }} :
          {{ process.description }}
        </li>
      </ul>
    </div>

    <div class="red-box">
      <h2 v-if="!isCreating">Détails</h2>
      <h2 v-else>Créer un Nouveau Processus</h2>

      <form v-if="!isCreating" @submit.prevent>
        <label for="name">Nom :</label>
        <input
          type="text"
          v-model="selectedProcess.name"
          id="name"
          :disabled="!isEditing || !selectedProcess.id_process"
        />

        <label for="description">Description :</label>
        <input
          type="text"
          v-model="selectedProcess.description"
          id="description"
          :disabled="!isEditing || !selectedProcess.id_process"
        />

        <label for="model">Modèle :</label>
        <input
          type="number"
          v-model="selectedProcess.model"
          id="model"
          required
          :disabled="!isEditing || !selectedProcess.id_process"
        />

        <label for="steps">Étapes et Tests :</label>
        <input
          type="text"
          v-model="selectedProcess.steps_and_descriptions_of_validation_tests"
          id="steps"
          :disabled="!isEditing || !selectedProcess.id_process"
        />

        <button
          v-if="!isEditing"
          :disabled="
            !selectedProcess.id_process ||
            !selectedProcess.name ||
            !selectedProcess.description
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
          :disabled="!selectedProcess.name || !selectedProcess.description"
        >
          Confirmer
        </button>
        <button v-if="isEditing" class="cancel-button" @click="cancelUpdate">
          Annuler
        </button>

        <button
          :disabled="!selectedProcess.id_process"
          class="delete-button"
          @click="deleteSelectedProcess(selectedProcess.id_process)"
        >
          Supprimer
        </button>
      </form>

      <form v-if="isCreating" @submit.prevent="createNewProcess">
        <label for="new-name">Nom :</label>
        <input type="text" v-model="newProcess.name" id="new-name" required />

        <label for="new-description">Description :</label>
        <input
          type="text"
          v-model="newProcess.description"
          id="new-description"
          required
        />

        <label for="new-model">Modèle :</label>
        <input
          type="number"
          v-model="newProcess.model"
          id="new-model"
          required
        />

        <label for="new-steps">Étapes et Tests :</label>
        <input
          type="text"
          v-model="newProcess.steps_and_descriptions_of_validation_tests"
          id="new-steps"
        />

        <button
          class="create-button"
          type="submit"
          :disabled="
            !newProcess.name || !newProcess.description || !newProcess.model
          "
        >
          Créer
        </button>
        <button class="cancel-button" @click="cancelCreate">Annuler</button>
      </form>
    </div>
  </div>
</template>

<script src="../components/scripts/Process.js"></script>
<style src="../components/styles/Process.css"></style>
