<template>
  <div id="app">
    <nav>
      <ul>
        <li>
          <button @click="goToPage('/ingredients')">
            Button 1 (Ingredients)
          </button>
        </li>
        <li>
          <button @click="goToPage('/modeles')">Button 2 (Modèles)</button>
        </li>
        <li>
          <button @click="goToPage('/process')">Button 3 (Process)</button>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script src="../components/scripts/App.js"></script>
<style src="../components/styles/App.css"></style>
