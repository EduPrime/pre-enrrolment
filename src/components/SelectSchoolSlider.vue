<template>
  
  <div :style="pageWidth?.pageWidth > 992 ? 'max-width: 992px' : 'width: 100vw;'">

  <!-- @swiper="onSwiper" @slideChange="onSlideChange" -->
  <swiper :modules="modules" :slides-per-view=" pageWidth?.pageWidth > 800? 3 : schoolList?.length === 1 ? 1 :  1.2" :space-between="20" :scrollbar="{ draggable: true }"
   >
    <swiper-slide v-for="school in schoolList" :key="school.id"  @click="emits('update:modelValue', school)">
      <ion-card style="min-height: 100%;" :style="schoolList?.length === 1? '' : 'width: 100%;'">

      
          <ion-card-header class="ion-padding-top">
            <ion-card-title style="font-size: 1.2rem; line-height: 110%;">{{ school.name }}</ion-card-title>
            <ion-card-subtitle>{{ school.address }}, {{ school.city }} - {{ school.state }}</ion-card-subtitle>
          </ion-card-header>
 
        <ion-card-content>
          <ion-item>
            <ion-text color="primary" class="flex" style="width: 100%">
                Telefone: 
                <span class="ml-auto">
                  {{ school.phone }}
                </span>
              </ion-text>
          </ion-item>

          <ion-item>
            <div>
              <p v-if="school.open">Matriculas abertas</p>
              <p v-else>Matriculas encerradas</p>
            </div>
            <div style="height: 16px; width: 16px; border-radius: 100%; margin-left: auto"
              :style="school.open ? ' background-color:chartreuse;' : ' background-color: orange;'"></div>
          </ion-item>
          
        </ion-card-content>
      </ion-card>
    </swiper-slide>

  </swiper>
</div>

</template>
<script setup lang="ts">
import { IonItem, IonText, IonCardContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';

import { defineEmits, onMounted, ref, watch } from 'vue';
import {catchPageWidth} from '@/utils/useUtils';
import useSupabase from '@/composables/useSupabase';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// const onSwiper = (swiper) => {
//   console.log(swiper);
// };

// const onSlideChange = () => {
//   console.log('slide change');
// };

interface Props {
  query: string
}

const modules = [Navigation, Pagination, Scrollbar, A11y];
const props = defineProps<Props>()

// 

const pageWidth = ref()
const emits = defineEmits(['update:modelValue']);

const supabase = new useSupabase()
const schoolList = ref()

watch( ()=> props.query, async (qValue: string) => {
  if (qValue && qValue.length > 2) {
    schoolList.value = schoolList.value = await supabase.searchSchools(qValue)
  } else {
    schoolList.value = await supabase.getSchools()
  }
})

onMounted(async () => {
  schoolList.value = await supabase.getSchools()
  pageWidth.value =  catchPageWidth()
})

</script>

<!-- <script>
    // import Swiper core and required modules
    import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
  
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from 'swiper/vue';
  
    // Import Swiper styles
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';
    import 'swiper/css/scrollbar';
  
    // Import Swiper styles
    export default {
      components: {
        Swiper,
        SwiperSlide,
      },
      setup() {
        const onSwiper = (swiper) => {
          console.log(swiper);
        };
        const onSlideChange = () => {
          console.log('slide change');
        };
        return {
          onSwiper,
          onSlideChange,
          modules: [Navigation, Pagination, Scrollbar, A11y],
        };
      },
    };
  </script> -->