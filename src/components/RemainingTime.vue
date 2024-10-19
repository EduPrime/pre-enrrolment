<template>
    <div style="display: flex; zoom: 0.70; margin-left: -6px;">
      <ion-card style="width: 75px;">
        <ion-card-header>
          <ion-card-title :class="animateClass" class="ion-text-center ion-font-weight-bold card-time-title">{{ months }}</ion-card-title>
        </ion-card-header>
        <ion-card-content class="card-time-subtitle ion-text-center">
          <ion-label class="">Meses</ion-label>
        </ion-card-content>
      </ion-card>
      <ion-card style="width: 75px;">
        <ion-card-header>
          <ion-card-title :class="animateClass" class="ion-text-center ion-font-weight-bold card-time-title">{{ days }}</ion-card-title>
        </ion-card-header>
        <ion-card-content class="card-time-subtitle ion-text-center">
          <ion-label class="ion-text-center">Dias</ion-label>
        </ion-card-content>
      </ion-card>
      <ion-card style="width: 75px;">
        <ion-card-header>
          <ion-card-title :class="animateClass" class="ion-text-center ion-font-weight-bold card-time-title">{{ hours }}</ion-card-title>
        </ion-card-header>
        <ion-card-content class="card-time-subtitle ion-text-center">
          <ion-label class="ion-text-center">Horas</ion-label>
        </ion-card-content>
      </ion-card>
      <ion-card style="width: 75px;">
        <ion-card-header>
          <ion-card-title :class="animateClass" class="ion-text-center ion-font-weight-bold card-time-title">{{ minutes }}</ion-card-title>
        </ion-card-header>
        <ion-card-content class="card-time-subtitle ion-text-center">
          <ion-label class="ion-text-center">Min</ion-label>
        </ion-card-content>
      </ion-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted, watch } from 'vue';
  
  const targetDate = new Date('2024-12-31T23:59:59'); // Defina a data alvo aqui
  
  const months = ref(0);
  const days = ref(0);
  const hours = ref(0);
  const minutes = ref(0);
  const animateClass = ref('');
  
  function updateCountdown() {
    const now = new Date();
    const timeDifference = targetDate.getTime() - now.getTime();
  
    const totalMinutes = Math.floor(timeDifference / (1000 * 60));
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalMonths = Math.floor(totalDays / 30);
  
    months.value = totalMonths;
    days.value = totalDays % 30;
    hours.value = totalHours % 24;
    minutes.value = totalMinutes % 60;
  }
  
  let intervalId: number;
  
  onMounted(() => {
    updateCountdown();
    intervalId = setInterval(updateCountdown, 60000); // Atualiza a cada minuto
  });
  
  onUnmounted(() => {
    clearInterval(intervalId);
  });
  
  watch([months, days, hours, minutes], () => {
    animateClass.value = 'animate';
    setTimeout(() => {
      animateClass.value = '';
    }, 500); // Duração da animação
  });
  </script>
  
  <style scoped>
  .card-time-title {
    transition: all 0.5s ease;
  }
  
  .animate {
    animation: fadeInOut 0.5s;
  }
  
  @keyframes fadeInOut {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    50% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(10px);
    }
  }

  .card-time-title {
    font-size: 1.8rem;
    font-weight: 900;
    margin-bottom: -5px;
    color: #EE7889;
}

.card-time-subtitle {
    font-size: 1rem;
    margin-top: -5px;
    font-weight: lighter;
    color: #EE7889;
}
  </style>