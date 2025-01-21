
<template>
      <div class="dashboard">
      <router-view/>
      </div>
</template>

<script setup></script>


<style>
.dashboard {
  min-height: 100vh;
  /* Garante que o fundo cubra a altura completa da janela */
  padding: 10px;
  background-image: url(./assets/background.png);
  background-repeat: repeat;
  /* Repetir em ambas direções */
  background-size: cover;
  /* O fundo cobre a área visível */
  background-attachment: fixed;
  /* Mantém o fundo fixo enquanto o conteúdo rola */
}
</style>