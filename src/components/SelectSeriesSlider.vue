<template>
    <div 
    :style="pageWidth?.pageWidth > 992 ? 'max-width: 992px' : 'width: 100vw;'">
     <swiper
         :modules="modules" 
         :slides-per-view="pageWidth?.pageWidth > 992 ? 2 : 1.4" 
         :space-between="5" 
         :scrollbar="{ draggable: true }"
         @swiper="onSwiper" 
         @slideChange="onSlideChange">
             <swiper-slide 
                 v-for="series in boundledSeries" 
                 :key="series">
                     <div>
                        <ion-card style=" margin-bottom: 25px; background-image: linear-gradient(to  right, var(--ion-color-tertiary) -50%, #fff 60%  );" @click="emits('update:modelValue', serie)" v-for="serie in series.items" :key="serie">
                             <ion-card-header>
                                <div class="flex" style="height: 90px;">

                                    <span class="my-auto mx-auto" style="font-size: 22pt;">
                                        <ion-text color="primary" :style="serie.name.length < 8 ? 'font-weight: 700;' : 'font-weight: 500;'">
                                          {{ serie.name }}
                                        </ion-text>
                                    </span>
                                </div>
                             </ion-card-header>
                        
                        </ion-card>
                     </div>
             </swiper-slide>
 
     </swiper>
    </div>
 </template>
 <script setup lang="ts">
 import useSupabase from '@/composables/useSupabase';
 import { catchPageWidth } from '@/utils/useUtils';
 import { defineEmits, ref, onMounted, defineProps } from 'vue';
 // import Swiper core and required modules
 import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
 
 // Import Swiper Vue.js components
 import { Swiper, SwiperSlide } from 'swiper/vue';
 
 // Import Swiper styles
 import 'swiper/css';
 import 'swiper/css/navigation';
 import 'swiper/css/pagination';
 import 'swiper/css/scrollbar';
 
 const onSwiper = (swiper) => {
     console.log(swiper);
 };
 
 const onSlideChange = () => {
     console.log('slide change');
 };
 
 const modules = [Navigation, Pagination, Scrollbar, A11y];
 
 
 // 

 interface Props {
    course: string
 }

 const emits = defineEmits(['update:modelValue']);
 const props = defineProps<Props>()
 const supabase = new useSupabase();

const pageWidth = catchPageWidth()
const gSeries = ref()
const boundledSeries = ref()


function groupCourses(courses: any[]): any[] {
    const boundled = [];
    for (let i = 0; i < courses.length; i += 2) {
        boundled.push({ items: courses.slice(i, i + 2) });
    }
    return boundled;
}

 onMounted( async() => {
    gSeries.value = await  supabase.getSeries(props.course)
    boundledSeries.value = groupCourses(gSeries.value)
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