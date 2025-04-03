<template>
  <app-header />
  <main>
    <h1>Bienvenido, {{ userName }} {{ userLastName }} </h1>
    <p class="p-title">Convierte tus documentos a PDF fácilmente</p>

    <div class="div-menu">
      <router-link to="/dashboard" class="button-convert">
        Convertir
      </router-link>
      <router-link to="/dashboard/files" class="button-files">
        Mis archivos
      </router-link>
    </div>

    <section class="section-files">
      <div class="files-header">
        <div>
          <h2>Mis Archivos Compartidos</h2>
          <p class="p-info">Convierte tus documentos a PDF fácilmente</p>
        </div>
        <div style="display: flex; gap: 10px;">
          <router-link to="/dashboard/reports" class="button-reports">Ver Reportes</router-link>
          <button class="button-download">Descargar Archivos</button>
        </div>
      </div>
      <div class="file-list">
        <div class="file-item" v-for="(file, index) in files" :key="index">
          <font-awesome-icon icon="file-pdf" class="icon-pdf" />
          <div class="file-info">
            <p class="file-name">{{ file.name }}</p>
            <p class="file-date">Convertido el {{ file.date }}</p>
          </div>
        </div>
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
import { ref, onMounted } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { RouterLink } from 'vue-router'

const userName = ref('Andrés')
const userLastName = ref('León')
const files = ref([
  { name: 'documento-1.pdf', date: '12/3/2025' },
  { name: 'documento-2.pdf', date: '12/3/2025' },
  { name: 'documento-3.pdf', date: '12/3/2025' },
  { name: 'documento-4.pdf', date: '12/3/2025' },
  { name: 'documento-5.pdf', date: '12/3/2025' }
])

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

</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  padding-left: 20%;
  padding-right: 20%;
  padding-top: 2%;
  padding-bottom: 0;
  overflow-x: hidden;
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
}

.div-menu {
  display: flex;
  align-items: center;
  background-color: #e3e3e3;
  border-radius: 5px;
  height: 40px;
  margin-top: 30px;
  overflow: hidden;
}

.section-files {
  margin-top: 30px;
  border: 2px solid #dcdcdc;
  border-radius: 8px;
  padding: 1%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.files-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
}

.icon-pdf {
  font-size: 20px;
  color: black;
  margin-right: 10px;
}

.file-info {
  display: flex;
  flex-direction: column;
}

.file-name {
  font-weight: bold;
}

.file-date {
  font-size: 13px;
  color: #666;
}

.button-convert {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999999;
  border-radius: 5px;
  width: 50%;
  height: 30px;
}

.button-files {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  width: 49%;
  height: 30px;
}

.button-download {
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
}


.button-reports {
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
