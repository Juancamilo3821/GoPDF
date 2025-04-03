<template>
  <app-header />
  <main>
    <h1>Bienvenido</h1>
    <p class="p-title">Convierte tus documentos a PDF fácilmente</p>

    <div class="div-menu">
      <router-link to="/dashboard" class="button-convert">
        Convertir
      </router-link>
      <router-link to="/dashboard/files" class="button-files">
        Mis archivos
      </router-link>
    </div>

    <section class="section-convert">
      <h2>Convertir Archivos</h2>
      <p class="p-info">Sube tus archivos de Office o ingresa una URL para convertir a PDF</p>
      <div class="article-container">
        <article class="upload-files">
          <h2>Subir Archivos</h2>
          <p class="p-info">Soportamos Word, Excel, PowerPoint y más.</p>
          <div class="div-upload">
            <font-awesome-icon icon="cloud-arrow-up" class="icon-upload" />
            <label for="file-upload" class="btn-upload" :class="{ 'label-disabled': archivos.length >= 5 }">Seleccionar
              Archivos</label>
            <input id="file-upload" type="file" class="input-file" @change="handleFiles"
              :disabled="archivos.length === 5" multiple accept=".docx,.xlsx,.pptx" />

            <button class="button-upload" @click="convertirArchivos"
              :disabled="archivos.length === 0 || superaLimitePeso">
              Convertir Archivos
            </button>


            <ul class="archivo-lista">
              <li v-for="(archivo, index) in archivos" :key="index" class="archivo-item">
                {{ archivo.name }}
                <button @click="removerArchivo(index)" class="btn-remover"><font-awesome-icon icon="xmark" /></button>
              </li>
            </ul>
            
            <p class="p-info">Tamaño total: {{ (pesoTotal / (1024 * 1024)).toFixed(2) }} MB</p>
            <p v-if="archivos.length >= 5" class="max-info">Máximo 5 archivos permitidos</p>
            <p v-if="superaLimitePeso" class="max-info">El peso total de los archivos no debe superar los 200 MB</p>
          </div>
        </article>
        <article class="article-convert">
          <h2>Convertir URL</h2>
          <p class="p-info">Convierte paginas web a PDF</p>
          <form class="div-input" @submit.prevent="convertirUrls" ref="formRef" novalidate>
            <label>URL</label>
            <div v-for="(link, index) in urls" :key="index" class="div-url-input">
              <input type="url" v-model="urls[index]" placeholder="https://www.ejemplo.com" class="input-url"
                required />
              <button class="button-add" type="button" @click="addUrlInput"
                v-if="index === urls.length - 1 && urls.length < 3">
                <font-awesome-icon icon="plus" />
              </button>
              <button class="button-add" type="button" @click="removeUrlInput(index)" v-if="urls.length > 1">
                <font-awesome-icon icon="minus" />
              </button>
            </div>

            <div class="button-container">
              <button class="button-url" type="submit">Convertir URL</button>
            </div>
          </form>
        </article>
      </div>
    </section>
    <section class="section-stats">
      <div class="title-container">
        <font-awesome-icon icon="chart-bar" class="icon-chart" />
        <h2>Estadísticas de Conversión</h2>
      </div>
      <p class="p-info">Resumen de tus actividades de conversión</p>
      <div class="stats-grid">
        <div v-for="(item, index) in statCards" :key="index" class="stat-card">
          <p class="stat-value">{{ item.value }}</p>
          <p class="stat-label">{{ item.label }}</p>
        </div>
      </div>
    </section>
  </main>
  <app-footer />
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { RouterLink } from 'vue-router'

const stats = ref({ total: 0, office: 0, urls: 0 })
const statCards = ref([])

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/stats')
    const data = await res.json()
    stats.value = data
    statCards.value = [
      { label: 'Conversiones Totales', value: data.total },
      { label: 'Archivos Convertidos', value: data.office },
      { label: 'URLs Convertidas', value: data.urls }
    ]
  } catch (err) {
    console.error('Error al obtener estadísticas:', err)
  }
})

const archivos = ref([])

const handleFiles = (event) => {
  const nuevosArchivos = Array.from(event.target.files)

  const archivosValidos = nuevosArchivos.filter(archivo => {
    const tipo = archivo.type
    return tipo === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
           tipo === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
           tipo === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  })

  if (archivosValidos.length < nuevosArchivos.length) {
    alert('Algunos archivos fueron rechazados. Solo se permiten Word, Excel y PowerPoint.')
  }

  archivos.value.push(...archivosValidos)
}

const removerArchivo = (index) => {
  archivos.value.splice(index, 1)
}

const convertirArchivos = async () => {
  try {
    const base64Files = []
    const fileNames = []

    for (const archivo of archivos.value) {
      const base64 = await toBase64(archivo)
      base64Files.push(base64)
      fileNames.push(archivo.name)
    }

    const res = await fetch('http://localhost:3000/api/convert/files', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        base64Files,
        fileNames,
        token: 'token-ejemplo'
      })
    })

    const data = await res.json()
    console.log(data.pdfBase64)
    router.push('/dashboard/files')
  } catch (error) {
    console.error('Error al convertir archivos:', error)
  }
}

const pesoTotal = computed(() => {
  return archivos.value.reduce((total, archivo) => total + archivo.size, 0)
})

const superaLimitePeso = computed(() => {
  return pesoTotal.value > 200 * 1024 * 1024 // 200 MB
})

const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const urls = ref([''])
const formRef = ref(null)

const addUrlInput = () => {
  if (urls.value.length < 3) {
    urls.value.push('')
  }
}

const removeUrlInput = (index) => {
  if (urls.value.length > 1) {
    urls.value.splice(index, 1)
  }
}

const convertirUrls = async () => {
  const form = formRef.value
  if (!form.checkValidity()) {
    form.reportValidity()
    return
  }

  const urlsFiltradas = urls.value.map(u => u.trim()).filter(Boolean)

  try {
    const res = await fetch('http://localhost:3000/api/convert/urls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        urls: urlsFiltradas,
        token: 'token-ejemplo'
      })
    })

    const data = await res.json()
    console.log(data.pdfBase64)
    router.push('/dashboard/files')
  } catch (error) {
    console.error('Error al convertir URLs:', error)
  }
}
</script>




<style scoped>
main {
  display: flex;
  flex-direction: column;
  padding-left: 20%;
  padding-right: 20%;
  padding-top: 2%;
}

a {
  color: inherit;
  text-decoration: none;
}

h1 {
  font-size: 32px;
}

h2 {
  font-size: 25px;
}

.p-title {
  font-size: 18px;
  color: #868686;
}

.p-info {
  font-size: 15px;
  color: #868686;
  ;
}

.div-menu {
  display: flex;
  align-items: center;
  background-color: #e3e3e3;
  border-radius: 5px;
  height: 40px;
  padding-left: 1%;
  padding-right: 1%;
  margin-top: 30px;
}

.button-convert {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  width: 50%;
  height: 30px;
}

.button-files {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999999;
  border-radius: 5px;
  width: 50%;
  height: 30px;
}

.section-convert {
  margin-top: 30px;
  border: 2px solid #dcdcdc;
  border-radius: 8px;
  padding: 1%;
  display: flex;
  flex-direction: column;
}

.article-container {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
}

.upload-files {
  padding: 1.5%;
  border: 2px solid #dddddd;
  border-radius: 8px;
  width: 45%;
}

.div-upload {
  border: 1px dashed #9f9f9f;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 15px;
  padding: 3%;
  gap: 10px;

}

.icon-upload {
  font-size: 40px;
}

.input-file {
  display: none;
}

.btn-upload,
.button-upload {
  background-color: #000;
  font-family: 'Inter', sans-serif;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);
  width: 45%;
}


.button-upload:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.label-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.archivo-lista {
  list-style: none;
  padding: 0;
  margin-top: 16px;
  text-align: left;
  width: 100%;
}

.archivo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f4f4f4;
  padding: 8px 5px;
  border-radius: 6px;
  margin-bottom: 8px;
  font-size: 85%;
}

.btn-remover {
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #d00;
}

.max-info {
  color: #d00;
  font-size: 13px;
  margin-top: 10px;
}

.article-convert {
  padding: 1.5%;
  border: 2px solid #dddddd;
  border-radius: 8px;
  width: 45%;
}

.div-input {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  gap: 10px;
}

.div-url-input {
  display: flex;
  gap: 10px;
}

label {
  font-size: 14px;
  font-weight: 700;
}

.input-url {
  width: 100%;
  padding: 5px 5px;
  font-size: 14px;
  border: 2px solid #aaa;
  border-radius: 4px;
  outline: none;
}

.button-add {
  background-color: #000;
  color: #fff;
  font-size: 14px;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-container {
  display: flex;
}

.button-url {
  background-color: #000;
  font-family: 'Inter', sans-serif;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);
  width: 92%;
  margin-top: 15px;
}

.section-stats {
  margin-top: 30px;
  margin-bottom: 30px;
  border: 2px solid #dcdcdc;
  border-radius: 8px;
  padding: 1%;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 1%;
}

.icon-chart {
  font-size: 25px;
}

.stats-grid {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}

.stat-card {
  width: 200px;
  padding: 24px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 6px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}
</style>
