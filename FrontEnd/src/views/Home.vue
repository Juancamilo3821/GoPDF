<template>
  <header>
    <router-link to="/" class="main-icon">
      <font-awesome-icon icon="file-pdf" />
      <span>GoPDF</span>
    </router-link>

    <nav>
      <router-link to="/login">
        <p>Iniciar sesión</p>
      </router-link>

      <router-link to="/register">
        <p>Registrarse</p>
      </router-link>
    </nav>
  </header>

  <main>
    <section class="section-welcome">
      <article class="left-col">
        <h1>Convierte tus documentos a<br>PDF fácilmente</h1>
        <h2>Nuestra plataforma te permite convertir archivos de Office y<br>URLs a PDF en segundos. Regístrate hoy y comienza a convertir.</h2>
        <div class="div-button">
          <router-link to="/register" class="button-register">
            Comenzar Ahora
            <font-awesome-icon icon="chevron-right" />
          </router-link>
          <router-link to="/login" class="button-login">
            Iniciar Sesión
          </router-link>
        </div>
      </article>

      <article class="right-col">
        <font-awesome-icon icon="cloud-arrow-up" class="icon-upload" />
        <p class="p-upload-1">Sube tus archivos para convertir</p>
        <p class="p-upload-2">Soportamos Word, Excel, PowerPoint y URLs</p>
      </article>
    </section>

    <section class="section-features">
      <h1>Características Principales</h1>
      <h2>Todo lo que necesitas para gestionar tus conversiones de documentos</h2>

      <div class="features-grid">
        <div v-for="(feature, index) in features" :key="index" class="feature-card">
          <div class="icon-bg">
            <font-awesome-icon :icon="['fas', feature.icon]" class="feature-icon" />
          </div>
          <h3>{{ feature.title }}</h3>
          <p class="p-description">{{ feature.description }}</p>
        </div>
      </div>
    </section>
  </main>

  <app-footer />
</template>


<script setup>
import AppFooter from '../components/AppFooter.vue'
const features = [
  {
    icon: 'cloud-arrow-up',
    title: 'Características Principales',
    description: 'Convierte archivos de Office y URLs a PDF en segundos'
  },
  {
    icon: 'file-lines',
    title: 'Historial Completo',
    description: 'Accede a todos tus archivos convertidos en cualquier momento'
  },
  {
    icon: 'chart-bar',
    title: 'Reportes Detallados',
    description: 'Visualiza estadísticas sobre tus conversiones'
  }
]
</script>

<style scoped>
header {
  background-color: #FFFBFB;
  border-bottom: 1px solid rgba(130, 130, 130, 0.5);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
}

a {
  color: inherit;
  text-decoration: none;
}

.main-icon {
  font-size: 250%;
  display: flex;
  align-items: center;
}

span {
  font-family: 'Oswald', sans-serif;
  margin-left: 8px;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 15%;
}

main {
  display: flex;
  flex-direction: column;
  height: 84vh;
}

.section-welcome {
  height: 55%;
  background-color: #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5%;
}

.left-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h1 {
  font-size: 40px;
}

h2 {
  font-size: 18px;
  font-weight: 500;
  color: #868686;
}

.div-button {
  display: flex;
  gap: 15px;
}

.button-register {
  background-color: black;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.button-login {
  background-color: white;
  color: black;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  text-decoration: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.right-col {
  display: flex;
  height: 250px;
  gap: 5%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 3%;
  border: 1px solid #cccccc;
  border-radius: 20px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
}

.icon-upload {
  font-size: 30px;
}

.p-upload-1 {
  font-weight: 700;
  font-size: 16px;
}

.p-upload-2 {
  font-weight: 500;
  font-size: 13px;
  color: #838383;
}

.section-features {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
}

.features-grid {
  display: flex;
  width: 80%;
  gap: 30px;
  margin-top: 30px;
  flex-wrap: wrap;
  justify-content: center;
}

.feature-card {
  padding: 24px;
  border-radius: 16px;
  gap: 5px;
  border: 1px solid #d0d0d0;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.icon-bg{
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #D9D9D9;
  display: flex;
  justify-content: center;
  align-items: center;
}

.feature-icon {
  font-size: 25px;
}

h3{
  font-size: 14px;
}

.p-description{
  font-size: 12px;
  color: #868686;
}

</style>
