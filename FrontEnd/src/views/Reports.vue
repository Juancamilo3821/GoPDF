<template>
  <app-header />
  <main>
    <h1>Reportes</h1>
    <p class="p-title">Gestiona todos tus archivos convertidos</p>

    <section class="section-report">
      <div class="report-header">
        <font-awesome-icon icon="chart-bar" class="icon-chart" />
        <div>
          <h2>Reporte de Conversiones</h2>
          <p class="p-info">Estadísticas detalladas de tus conversiones</p>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card" v-for="(item, index) in statCards" :key="index" :class="item.class">
          <p class="stat-value">{{ item.value }}</p>
          <p class="stat-label">{{ item.label }}</p>
        </div>
      </div>

      <div class="activity-section">
        <h3 class="activity-title">
          <font-awesome-icon icon="clock" />
          Actividad Reciente
        </h3>

        <div class="activity-item" v-for="(item, index) in actividadVisible" :key="index">
          <div class="activity-icon">
            <font-awesome-icon icon="file-lines" />
          </div>
          <div class="activity-info">
            <p class="activity-main">Conversión completada</p>
            <p class="activity-sub">{{ item.archivo }} → {{ item.archivo + ".pdf" }}</p>
          </div>
          <p class="activity-time">
            {{ time(item.fecha) }}
          </p>
        </div>

        <div class="view-more" v-if="actividad.length > 5" @click="mostrarTodo = !mostrarTodo">
          {{ mostrarTodo ? 'Ver menos' : 'Ver todo' }}
          <font-awesome-icon :icon="mostrarTodo ? 'chevron-up' : 'chevron-down'" />
        </div>
      </div>
    </section>
  </main>
  <app-footer />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

const stats = ref({ total: 0, office: 0, urls: 0, pesoTotalMB: 0 })
const statCards = ref([])
const actividad = ref([])
const mostrarTodo = ref(false)

const actividadVisible = computed(() => {
  return mostrarTodo.value ? actividad.value : actividad.value.slice(0, 5)
})

function time(fechaStr) {
  const date = new Date(fechaStr)
  const now = new Date()
  const diffMs = now - date
  const diffMin = Math.floor(diffMs / 60000)
  const diffHoras = Math.floor(diffMin / 60)
  const diffDias = Math.floor(diffHoras / 24)

  if (diffDias >= 1) return `Hace ${diffDias} día${diffDias > 1 ? 's' : ''}`
  if (diffHoras >= 1) return `Hace ${diffHoras} hora${diffHoras > 1 ? 's' : ''}`
  if (diffMin >= 1) return `Hace ${diffMin} minuto${diffMin > 1 ? 's' : ''}`
  return 'Hace unos segundos'
}


onMounted(async () => {
  try {
    const resStats = await fetch('http://localhost:3000/api/stats')
    const dataStats = await resStats.json()
    console.log('[DEBUG] Estadísticas recibidas:', dataStats)

    stats.value = dataStats
    statCards.value = [
      { label: 'Total de Archivos', value: dataStats.total },
      { label: 'Archivos Office', value: dataStats.office, class: 'blue' },
      { label: 'URLs', value: dataStats.urls, class: 'purple' },
      { label: 'Tamaño convertido', value: `${dataStats.pesoTotalMB} MB`, class: 'black' }
    ]

    const resActividad = await fetch('http://localhost:3000/api/stats/reporte')
    const dataActividad = await resActividad.json()
    console.log('[DEBUG] Actividad recibida:', dataActividad)

    actividad.value = dataActividad
  } catch (err) {
    console.error('Error al obtener datos:', err)
  }
})
</script>

<style scoped>
main {
  padding-left: 20%;
  padding-right: 20%;
  padding-top: 1%;
}

h1 {
  font-size: 32px;
}

.p-title {
  font-size: 16px;
  color: #888;
}

.section-report {
  margin-top: 20px;
  margin-bottom: 65px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 2%;
  background: white;
}

.report-header {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 20px;
}

.icon-chart {
  font-size: 28px;
}

.stats-grid {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  gap: 15px;
  flex-wrap: wrap;
}

.stat-card {
  flex: 1;
  min-width: 120px;
  padding: 20px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-card.blue .stat-value {
  color: #007bff;
}

.stat-card.purple .stat-value {
  color: #a020f0;
}

.stat-card.black .stat-value {
  color: #000;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.activity-section {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  background-color: #fafafa;
}

.activity-title {
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
}

.activity-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-top: 1px solid #ddd;
}

.activity-icon {
  font-size: 20px;
  margin-right: 12px;
}

.activity-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.activity-main {
  font-weight: bold;
  font-size: 14px;
}

.activity-sub {
  font-size: 13px;
  color: #666;
}

.activity-time {
  font-size: 13px;
  color: #666;
}

.view-more {
  text-align: center;
  font-size: 13px;
  margin-top: 15px;
  cursor: pointer;
  color: #333;
}
</style>
