<template>
 
  <ion-grid v-if="!finished" class="ion-padding-horizontal">
    <ion-row v-if="!next">
      <ion-col size="12">
        <ion-item>
          <ion-input v-model="student.name" type="text" label="Nome Completo*" label-placement="floating"></ion-input>
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
          <ion-select v-model="student.ethnicity" label="Etnia" label-placement="floating">
            <ion-select-option v-for="race in races" :key="race" :value="race">{{ race }}</ion-select-option>

          </ion-select>
        </ion-item>
      </ion-col>

      <ion-col size="12" size-md="6">
        <ion-item>
          <ion-select v-model="student.deficiency" label="Necessidade especial" label-placement="floating">
            <ion-select-option v-for="deficiency in deficiencies" :key="deficiency" :value="deficiency">{{ deficiency
              }}</ion-select-option>

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
          <ion-input v-model="student.birthdate" type="date" label="Data de nascimento*"
            label-placement="floating"></ion-input>
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

      <!-- <ion-item>
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
    </ion-item> -->

      <ion-col>
        <ion-button expand="full" color="tertiary" @click="nextStep()">Continuar</ion-button>
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

      <ion-col size="12" :size-md="docModel ? '6' : '12'">
        <ion-item>
          <ion-select v-model="docModel" label="Documento Selecionado" label-placement="floating">
            <ion-select-option v-for="doc in docs" :key="doc.value" :value="doc.value">{{ doc.title
              }}</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-col>

      <ion-col size="12" size-md="6" v-if="docModel">
        <ion-item>
          <ion-input v-if="docModel === 'cpf'" v-model="student.cpf" type="text" label="Numero do CPF"
            label-placement="floating"></ion-input>
          <ion-input v-else-if="docModel === 'rg'" v-model="student.rg_number" type="text" label="Numero do RG"
            label-placement="floating"></ion-input>
          <ion-input v-else-if="docModel === 'certidao'" v-model="student.birth_certificate" type="text"
            label="Certidão de Nascimento" label-placement="floating"></ion-input>
        </ion-item>
      </ion-col>

      <ion-col size="12" size-md="6">
        <ion-item>
          <ion-input v-model="student.phone" type="text" label="Telefone" label-placement="floating"
            v-mask="'(##) #####-####'"></ion-input>
        </ion-item>
      </ion-col>


      <ion-col size="12" size-md="6">
        <ion-item>
          <ion-input v-model="student.email" type="email" label="E-Mail" label-placement="floating"></ion-input>
        </ion-item>
      </ion-col>

      <ion-col size="12" size-md="6">
        <ion-item>
          <ion-input v-model="student.postalcode" type="text" label="CEP" label-placement="floating"
            v-mask="'#####-###'"></ion-input>
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
          <ion-select v-model="student.city_state" label="Estado" label-placement="floating">
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

  <ion-grid v-else class="ion-padding-horizontal">
    <ion-row>
      <ion-col size="12">
       <ion-card>
        <ion-card-header>
          <ion-card-title>Pré-Matrícula realizada com sucesso</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Os dados do aluno foram salvos com sucesso.</p>
          <p>Código de pré-matrícula: {{ codPreEnrollment }}</p>
          <div class="flex" style="min-height: 150px;">
            <ion-icon  :icon="checkmarkCircleOutline" class="my-auto mx-auto"
            style="font-size: 130px; color:lawngreen;"></ion-icon>
          </div>

        </ion-card-content>
       </ion-card>
        
      </ion-col>
      </ion-row>
  </ion-grid>
  <!-- <pre>
  incompleteStep: {{ incompleteStep }}
</pre> -->

<ion-alert :is-open="duplicated" trigger="present-alert" header="Aluno já cadastrado"
sub-header="Desculpe mas este aluno já foi cadastrado anteriormente."

    message="Caso deseje você pode clicar em 'atualizar' para atualizar os dados que já foram cadastrados anteriormente."
    :buttons="[{
        text: 'Atualizar cadastro',
        handler: () => {
          console.info('Função (Atualizar cadastro) ainda não implementada')
        }
      }, 'Fechar']" @didDismiss="duplicated = false">
  </ion-alert>


<ion-alert :is-open="someProblems" trigger="present-alert" header="Desculpe, ocorreu um erro ao salvar os dados"
    sub-header="Erro ao salvar os dados do aluno"
    message="Por favor, recarregue a página ou tente novamente mais tarde."
    :buttons="['Fechar']" @didDismiss="someProblems = false"></ion-alert>

  <ion-alert :is-open="incompleteStep" trigger="present-alert" header="Preencha os campos obrigatórios para continuar"
    sub-header="Campos obrigatórios tem um asterisco (*)"
    :message="adicionalRequired ? `Preencha também Telefone e RG, CPF ou Certidão de Nascimento para efetuar a pré-matrícula` : `Os campos Nome e Data de Nascimento são obrigatórios`"
    :buttons="['Fechar']" @didDismiss="incompleteStep = false"></ion-alert>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
// import GedService from '@/modules/ged/services/GedService'
// import FileUpload from '@/modules/ged/components/FileUpload.vue'

// import type { Tables } from '@/types/database.types'

import { IonItem, IonInput, IonSelect, IonSelectOption, IonButton, IonGrid, IonRow, IonCol, IonAlert, IonIcon } from '@ionic/vue';
import { checkmarkCircleOutline } from 'ionicons/icons';
import useSupabase from '@/composables/useSupabase';


// const gedService = new GedService()
// const documentFiles = ref<Tables<'document'>[]>([])


const next = ref(false)
const incompleteStep = ref(false)
const adicionalRequired = ref(false)
const duplicated = ref(false)
const finished = ref(false)

const codPreEnrollment = ref()

const result = ref()
const someProblems = ref(false)

const docModel = ref('')
// const status = ['ACTIVE', 'INACTIVE', 'GRADUATED', 'SUSPENDED', 'TRANSFERRED']
const docs = [{ title: 'RG', value: 'rg' }, { title: 'CPF', value: 'cpf' }, { title: 'Certidão de Nascimento', value: 'certidao' }]
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
const residence_zone = ['Urbana', 'Rural']
const races = ['Branca', 'Preta', 'Parda', 'Amarela', 'Indígena', 'Não declarada']
const deficiencies = ['Visual', 'Auditiva', 'Física', 'Intelectual', 'Mental', 'Múltipla', 'Outros', 'Não possui']

const student = ref(
  {
    name: undefined as string | undefined,
    birthdate: undefined as string | number | undefined,
    phone: undefined as string | number | undefined,
    email: undefined as string | undefined,
    city: undefined as string | undefined,
    city_state: undefined as string | undefined,
    address: undefined as string | undefined,
    postalcode: undefined as string | number | undefined,
    deficiency: undefined as string | undefined,
    ethnicity: undefined as string | undefined,
    gender: undefined as string | undefined,
    residence_zone: undefined as string | undefined,
    responsibleType: undefined as string | undefined,
    birth_certificate: undefined as string | number | undefined,
    rg_number: undefined as string | number | undefined,
    cpf: undefined as string | number | undefined
  }
)


const supabase = new useSupabase()
const studentList = ref()



watch(result, (value) => {
  finished.value = false

  if (value && value.status === 201) {
    finished.value = true
  } else if (value && value.status === 409) {
    finished.value = false
    codPreEnrollment.value = `pre-${generateRandomCode()}`
    if (value.error.code === '23505') {

      duplicated.value = true

    }
  } else {
    someProblems.value
    finished.value = false
  }
})


const submitForm = async () => {
  if (student.value.name && student.value.birthdate && student.value.phone && (student.value.cpf || student.value.rg_number || student.value.birth_certificate)) {
    result.value = await postStudent(student.value)
    adicionalRequired.value = false
  } else {
    incompleteStep.value = true
    adicionalRequired.value = true
  }
};


// function handleUploadSuccess(file: any) {
//   if (file && file.storage_path) {
//     gedService.create(file)
//     documentFiles.value.push(file)
//   }
// }

// async function loadDocumentFiles() {
//   documentFiles.value = await gedService.getAll() as Tables<'document'>[]
// }

function generateRandomCode(): string {
  return Math.random().toString().slice(2, 10).padStart(8, '0');
}


function nextStep() {
  if (student.value.name && student.value.birthdate) {
    return next.value = true
  } else {
    incompleteStep.value = true
  }
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
  // await loadDocumentFiles()
})
</script>

<style scoped>
ion-content {
  --padding-start: 16px;
  --padding-end: 16px;
}
</style>