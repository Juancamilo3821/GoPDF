<template>
  <app-header />
  <main>
    <h1>Reportes</h1>
    <p class="p-title">Gestiona todos tus archivos convertidos</p>

    <section class="section-report">
      <div class="report-header">
        <font-awesome-icon icon="chart-line" class="icon-chart" />
        <div>
          <h2>Reporte de Conversiones</h2>
          <p class="p-info">Estadísticas detalladas de tus conversiones</p>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <p class="stat-value">27</p>
          <p class="stat-label">Total de Archivos</p>
        </div>
        <div class="stat-card blue">
          <p class="stat-value">15</p>
          <p class="stat-label">Archivos Office</p>
        </div>
        <div class="stat-card purple">
          <p class="stat-value">10</p>
          <p class="stat-label">URLs</p>
        </div>
        <div class="stat-card black">
          <p class="stat-value">5.2 MB</p>
          <p class="stat-label">Tamaño convertido</p>
        </div>
      </div>

      <div class="activity-section">
        <h3 class="activity-title">
          <font-awesome-icon icon="clock" />
          Actividad Reciente
        </h3>

        <div class="activity-item" v-for="i in 5" :key="i">
          <div class="activity-icon">
            <font-awesome-icon icon="file-lines" />
          </div>
          <div class="activity-info">
            <p class="activity-main">Conversión completada</p>
            <p class="activity-sub">documento.docx → documento-1.pdf</p>
          </div>
          <p class="activity-time">Hace 1 hora</p>
        </div>

        <div class="view-more">Ver todo <font-awesome-icon icon="chevron-down" /></div>
      </div>
    </section>
  </main>
  <app-footer />
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
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
