<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonText } from '@ionic/vue'
import { computed, ref, watch } from 'vue'
import StudentService from '../services/StudentService'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

interface Props {
  query: string
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])
const query = computed(() => props.query)
const result = ref()
const postgrest = new StudentService()

const swiperModules = [Navigation, Pagination, Scrollbar, A11y]

watch(query, async (value) => {
  if (value) {
    result.value = await postgrest.getStudentByResponsible(value)
    console.log('result.value', result.value)
  } else {
    result.value = null
  }
})

watch(result, (value) => {
  if (value && value.length > 0) {
    emits('update:modelValue', true)
  } else {
    emits('update:modelValue', false)
  }
})
</script>

<template>
  <div class="swiper-container">
    <Swiper
      v-if="result && result.length > 0"
      :modules="swiperModules"
      :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
      :pagination="{ clickable: true, el: '.swiper-pagination' }"
      :scrollbar="{ draggable: true }"
      :space-between="10"
      :slides-per-view="1"
    >
      <SwiperSlide v-for="(student, index) in result" :key="index">
        <IonCard>
          <div style="display: flex;">
            <img src="../assets/images/default_user.png" width="70px" alt="" class="ion-padding-start ion-padding-top"
              style="display: block; object-fit: contain; margin-top: auto; margin-bottom: auto;">
            <IonCardHeader class="ion-padding-top">
              <IonCardTitle>
                <IonText color="primary">
                  {{ student.student }}
                </IonText>
              </IonCardTitle>
              <IonCardSubtitle>
                <IonText color="primary">
                  Pré-Matrícula:
                  <b class="ion-text-uppercase">
                    {{ student.preenrollmentcode }}
                  </b>
                </IonText>
              </IonCardSubtitle>
            </IonCardHeader>
          </div>
          <IonCardContent>
            <IonItem>
              <div>
                <IonText color="primary">
                  <p>
                    {{ student.school.name }}
                  </p>
                </IonText>
              </div>
            </IonItem>
            <IonItem>
              <div>
                <IonText color="primary">
                  <p>
                    {{ student.course.name }}
                  </p>
                </IonText>
              </div>
            </IonItem>
            <IonItem>
              <div>
                <IonText color="primary">
                  <p>Situação da matrícula</p>
                </IonText>
              </div>
              <span style="display: flex; margin-left: auto">
                <IonCardSubtitle class="ion-padding-end">
                  <IonText color="primary">
                    {{ student.situation === 'PENDENTE' ? 'Em Analise' : 'Finalizado' }}
                  </IonText>
                </IonCardSubtitle>
                <div :style="student.situation === 'PENDENTE' ? 'background-color: orange' : 'background-color: gray'"
                  style="height: 16px; width: 16px; border-radius: 100%; margin-top: auto; margin-bottom: auto;" />
              </span>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </SwiperSlide>
    </Swiper>

    <div v-if="result && result.length > 1" class="swiper-button-next"></div>
    <div v-if="result && result.length > 1" class="swiper-button-prev"></div>
    <div v-if="result && result.length > 1" class="swiper-pagination"></div>
  </div>

  <div v-if="result && result.length === 0">
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Nenhum cadastro encontrado</IonCardTitle>
        <IonCardSubtitle>Não foi possível encontrar cadastro {{ props.query ? `${props.query}` : '' }}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent> Verifique se o código foi digitado corretamente ou selecione uma das opções abaixo
      </IonCardContent>
    </IonCard>
  </div>
</template>

<style scoped>
.swiper-container {
  position: relative;
  padding: 20px 0; 
}

.swiper-button-next,
.swiper-button-prev {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  color: #000; 
}

.swiper-button-next {
  right: -30px; 
}

.swiper-button-prev {
  left: -30px; 
}

.swiper-pagination {
  position: absolute;
  bottom: -5px; 
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}
</style>