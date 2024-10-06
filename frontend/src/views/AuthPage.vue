<template>
  <div class="login">
    <h2>Connection</h2>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="email">Nom :</label>
        <input id="email" v-model="loginData.email" required />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          v-model="loginData.password"
          required
        />
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <div v-if="errorMessage" class="error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script src="../components/scripts/Auth.js"></script>
<style src="../components/styles/Auth.css"></style>
