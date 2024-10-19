<template>
     <div  :class="pageWidth?.pageWidth < 992? 'ion-padding' : ''" style="background-color: var(--ion-color-secondary); padding-bottom: 8rem;">
        <div style="max-width: 992px;"   class="ion-padding mx-auto">

        
        <div class="ion-padding-top ion-padding-bottom" style="display: flex;">
                    <img src="../../public/city_logo.png" width="30%" class="ion-padding"
                        style="background-color: white ; border-radius: 100%; max-width: 120px;" alt="">
                    <div style="margin-left: auto; margin-top: auto; margin-bottom: auto;">
                        <ion-button color="light">
                            <ion-icon :icon="logoInstagram"></ion-icon>

                        </ion-button>
                        <ion-button color="light">
                            <ion-icon :icon="logoFacebook"></ion-icon>

                        </ion-button>
                        <ion-button color="light">
                            <ion-icon :icon="globeOutline"></ion-icon>

                        </ion-button>
                    </div>
                </div>
                <ion-card-subtitle style=" color: white" class="ion-padding-top">
                <ion-text color="lightaccent">
                    Secretaria Municipal de Educação
                </ion-text>
                </ion-card-subtitle>
                <ion-card-title style=" color: white" class="ion-padding-top ion-padding-bottom">
                <ion-text color="lightaccent">
                    Araripina - PE
                </ion-text>
                </ion-card-title>
                <hr style="background-color: var(--ion-color-lightaccent);">
                <ion-card-title style=" color: white" class="ion-padding-top">
                <ion-text color="lightaccent">
                    
                    Entre em contato com um toque!
                </ion-text>
                </ion-card-title>
                <div class="ion-padding-top">
                    <ion-button href="tel:+550000000000" color="light" size="large" class="ion-padding-end">
                        <ion-icon :icon="callOutline"></ion-icon>

                    </ion-button>
                    <ion-button target="_blank" href="https://wa.me/558791189300" color="light" size="large" class="ion-padding-end">
                        <ion-icon :icon="logoWhatsapp"></ion-icon>
                        
                    </ion-button>
                    <ion-button href="mailto:fale@softagon.com.br"  color="light" size="large" class="ion-padding-end">
                        <ion-icon :icon="mailOutline"></ion-icon>
                    </ion-button>
                </div>
        </div>        

            </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { catchPageWidth } from '@/utils/useUtils';
import { IonIcon } from '@ionic/vue';
import { mailOutline, logoWhatsapp, callOutline, logoInstagram, logoFacebook, globeOutline } from 'ionicons/icons';

const pageWidth = ref()

onMounted(() => {
    pageWidth.value = catchPageWidth()
    // window.addEventListener('resize', () => {
    //     pageWidth.value = catchPageWidth()
    // })
})
</script>