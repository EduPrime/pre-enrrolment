<template>
  <!-- <pre>
    studentList: {{ studentList }}
  </pre> -->
  <ion-grid class="ion-padding">
    <ion-row v-if="!next">
      <ion-col size="12">
        <ion-item>
          <ion-input v-model="student.name" type="text" label="Nome Completo" label-placement="floating" ></ion-input>
        </ion-item>
      </ion-col>


      <ion-col size="12" size-md="6">
        <ion-item>
          <ion-select v-model="student.gender" label="Genero de nascimento" label-placement="floating">
            <ion-select-option v-for="gender in genders" :key="gender" :value="gender">{{ gender }}</ion-select-option>
           
          </ion-select>
        </ion-item>
      </ion-col>

      <ion-col size="12" size-md="6">
        <ion-item>
          <ion-select v-model="student.ethnicity" label="Raça" label-placement="floating">
            <ion-select-option v-for="race in races" :key="race" :value="race">{{ race }}</ion-select-option>
             
          </ion-select>
        </ion-item>
      </ion-col>

      <ion-col size="12" size-md="6">
        <ion-item>
          <ion-select v-model="student.deficiency" label="Necessidade especial" label-placement="floating">
            <ion-select-option v-for="deficiency in deficiencies" :key="deficiency" :value="deficiency">{{ deficiency }}</ion-select-option>
           
          </ion-select>
        </ion-item>
      </ion-col>

      <ion-col size="12" size-md="6">
        <ion-item>
          <ion-select v-model="student.responsibleType" label="Responsável" label-placement="floating">
            <ion-select-option v-for="r in responsibles" :key="r" :value="r">{{ r }}</ion-select-option>
           
          </ion-select>
        </ion-item>
      </ion-col>


      <ion-col size="12" size-md="6">
        <ion-item>
          <ion-input v-model="student.birthdate" type="date" label="Data de nascimento" label-placement="floating"></ion-input>
        </ion-item>
      </ion-col>

      <ion-col size="12" size-md="6">
        <ion-item>
          <ion-select label="Preferência de turno" label-placement="floating">
            <ion-select-option value="manha">Manhã</ion-select-option>
            <ion-select-option value="tarde">Tarde</ion-select-option>
            <ion-select-option value="noite">Noite</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-col>

      <ion-item>
      <div >
        <div class="file-upload-container">
          <FileUpload
            :bucket-name="'ged'"
            :max-file-size="960"
            @upload-success="handleUploadSuccess"
          />
        </div>
        <FilesList :files="documentFiles" />
      </div>
    </ion-item>

      <ion-col>
        <ion-button expand="full" color="tertiary" @click="next = true">Continuar</ion-button>
      </ion-col>
  
      <!-- <ion-col size="12" size-md="6">
        <ion-item>
          <ion-select label="Documentos Selecionados" label-placement="floating">
            <ion-select-option value="rg">RG</ion-select-option>
            <ion-select-option value="cpf">CPF</ion-select-option>
            <ion-select-option value="certidao">Certidão de Nascimento</ion-select-option>
          </ion-select>
        </ion-item>
       
      </ion-col> -->

    </ion-row>


    <ion-row v-else>
    <ion-col size="12" size-md="6">
      <ion-item>
        <ion-input v-model="student.phone" type="text" label="Telefone" label-placement="floating" v-mask="'(##) #####-####'"></ion-input>
      </ion-item>
    </ion-col>

    <ion-col size="12" size-md="6">
      <ion-item>
        <ion-input v-model="student.email" type="email" label="E-Mail" label-placement="floating"></ion-input>
      </ion-item>
    </ion-col>

    <ion-col size="12" size-md="6">
      <ion-item>
        <ion-input v-model="student.postalcode" type="text" label="CEP" label-placement="floating" v-mask="'#####-###'"></ion-input>
      </ion-item>
    </ion-col>


    <ion-col size="12" size-md="6">
        <ion-item>
          <ion-select v-model="student.residence_zone" label="Zona Residencial" label-placement="floating">
            <ion-select-option v-for="zone in residence_zone" :key="zone" :value="zone">{{ zone }}</ion-select-option>
            
          </ion-select>
        </ion-item>
      </ion-col>




    <ion-col size="8" size-md="10">
      <ion-item>
        <ion-input v-model="student.city" label="Cidade" label-placement="floating"></ion-input>
      </ion-item>
    </ion-col>


    <ion-col size="4" size-md="2">
        <ion-item>
          <ion-select v-model="student.state" label="Estado" label-placement="floating">
            <ion-select-option v-for="state in states" :key="state" :value="state">{{ state }}</ion-select-option>
            
          </ion-select>
        </ion-item>
      </ion-col>


    

    <ion-col size="12">
      <ion-item>
        <ion-input v-model="student.address" label="Endereço" label-placement="floating"></ion-input>
      </ion-item>
    </ion-col>
 

    <ion-col size="12">
        <ion-button expand="full" color="primary" @click="next = false">Voltar</ion-button>
        <ion-button expand="full" color="tertiary" @click="submitForm">Salvar</ion-button>
      </ion-col>
  </ion-row>
  </ion-grid>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import GedService from '@/modules/ged/services/GedService'
import FileUpload from '@/modules/ged/components/FileUpload.vue'

import type { Tables } from '@/types/database.types'

import { IonItem, IonInput, IonSelect, IonSelectOption, IonButton, IonGrid, IonRow, IonCol } from '@ionic/vue';
import useSupabase from '@/composables/useSupabase';

 
const gedService = new GedService()
const documentFiles = ref<Tables<'document'>[]>([])



const next = ref(false)

const states = [
  'AC', // Acre
  'AL', // Alagoas
  'AP', // Amapá
  'AM', // Amazonas
  'BA', // Bahia
  'CE', // Ceará
  'DF', // Distrito Federal
  'ES', // Espírito Santo
  'GO', // Goiás
  'MA', // Maranhão
  'MT', // Mato Grosso
  'MS', // Mato Grosso do Sul
  'MG', // Minas Gerais
  'PA', // Pará
  'PB', // Paraíba
  'PR', // Paraná
  'PE', // Pernambuco
  'PI', // Piauí
  'RJ', // Rio de Janeiro
  'RN', // Rio Grande do Norte
  'RS', // Rio Grande do Sul
  'RO', // Rondônia
  'RR', // Roraima
  'SC', // Santa Catarina
  'SP', // São Paulo
  'SE', // Sergipe
  'TO', // Tocantins
]
const genders = ['Masculino', 'Feminino']

const responsibles = ['Pai', 'Mãe', 'Ambos', 'Outro']

// const status = ['ACTIVE', 'INACTIVE', 'GRADUATED', 'SUSPENDED', 'TRANSFERRED']
const residence_zone = ['Urbana', 'Rural']
const races = ['Branca', 'Preta', 'Parda', 'Amarela', 'Indígena', 'Não declarada']
const deficiencies = ['Visual', 'Auditiva', 'Física', 'Intelectual', 'Mental', 'Múltipla', 'Outros', 'Não possui']

const student = ref(
  {
      name: '',
      birthdate: '',
      phone: '',
      email: '',
      city: '',
      state: '',
      address: '',
      postalcode: '',
      deficiency: '',
      ethnicity: '',
      gender: '',
      residence_zone: '',
      responsibleType: ''
    }
)


const supabase = new useSupabase()
const studentList = ref()
const submitForm = async () => {
  await postStudent(student.value)
};




function handleUploadSuccess(file: any) {
  if (file && file.storage_path) {
    gedService.create(file)
    documentFiles.value.push(file)
  }
}

async function loadDocumentFiles() {
  documentFiles.value = await gedService.getAll() as Tables<'document'>[]
}

async function postStudent(studentObject: any) {
  try {
    const data = await supabase.insertStudent(studentObject)

    return data
  } catch (error) {
    console.error(error)
  }
}
onMounted(async () => {
  studentList.value = await supabase.getStudents()
  await loadDocumentFiles()
})
</script>

<style scoped>
ion-content {
  --padding-start: 16px;
  --padding-end: 16px;
}
</style>