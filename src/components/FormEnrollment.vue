<template>
  <ion-grid>
    <ion-row>
      <ion-col>
        <ion-item>
          <ion-input v-model="studentName" label="Nome" label-placement="floating" ></ion-input>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-item>
          <ion-input v-model="studentName" label="Sobrenome" label-placement="floating" ></ion-input>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row></ion-row>
    <ion-row>
      <ion-col>
        <ion-item>
         
          <ion-input v-model="studentAge" label="Data de nascimento" label-placement="floating"></ion-input>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-item>
          <ion-input v-model="studentEmail" label="E-Mail" label-placement="floating"></ion-input>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-item>
      <ion-select label="Preferência de turno" label-placement="floating">
        <ion-select-option value="manha">Manhã</ion-select-option>
                <ion-select-option value="tarde">Tarde</ion-select-option>
                <ion-select-option value="noite">Noite</ion-select-option>
      </ion-select>
    </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-button expand="full" color="tertiary" @click="submitForm">Enviar</ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
 
</template>

<script setup>
import { ref } from 'vue';
import { IonList, IonItem, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';

const studentName = ref('');
const studentAge = ref('');
const studentEmail = ref('');
const studentCourse = ref('');

const submitForm = () => {
    console.log('Nome:', studentName.value);
    console.log('Idade:', studentAge.value);
    console.log('Email:', studentEmail.value);
    console.log('Curso:', studentCourse.value);
};
</script>

<style scoped>
ion-content {
    --padding-start: 16px;
    --padding-end: 16px;
}
</style>