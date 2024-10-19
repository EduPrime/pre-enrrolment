<template>
   <ion-card>

      <div style="display: flex;">
         <img src="../../public/default_user.png" width="70px" alt="" class="ion-padding-start ion-padding-top"
            style="display: block; object-fit: contain; margin-top: auto; margin-bottom: auto;">
         <ion-card-header class="ion-padding-top">
            <ion-card-title>
               <ion-text color="primary">
                  Aluno Fulano de Tal
               </ion-text>
            </ion-card-title>
            <ion-card-subtitle>
               <ion-text color="primary">
                  Pré-Matrícula: 84653
               </ion-text>
            </ion-card-subtitle>
         </ion-card-header>
      </div>
      <ion-card-content>

         <ion-item>
            <div>
               <ion-text color="primary">
                  <p>
                     Escola Municipal ABCD
                  </p>
               </ion-text>
            </div>
         </ion-item>
         <ion-item>
            <div>
               <ion-text color="primary">
                  <p>Ensino Fundamental I - 5° Ano</p>
               </ion-text>
            </div>
         </ion-item>
         <ion-item>
            <div>
               <ion-text color="primary">
                  <p>Situação da pré-matrícula</p>
               </ion-text>
            </div>
            <span style="display: flex; margin-left: auto"> <ion-card-subtitle class="ion-padding-end">
                  <ion-text color="primary">
                     Em Analise
                  </ion-text>

               </ion-card-subtitle>
               <div
                  style="height: 16px; width: 16px; background-color:orange ; border-radius: 100%; margin-top: auto; margin-bottom: auto;">
               </div>
            </span>
         </ion-item>
      </ion-card-content>
   </ion-card>
</template>