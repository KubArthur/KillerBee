<template>
  <div id="app">
    <nav>
      <ul>
        <li>
          <button @click="goToPage('/ingredients')">
            Les matériaux
          </button>
        </li>
        <li>
          <button @click="goToPage('/processes')">Les processus </button>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script src="../components/scripts/App.js"></script>
<style src="../components/styles/App.css"></style>
