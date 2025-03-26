<template>
  <header>
    <router-link to="/" class="main-icon">
      <font-awesome-icon icon="file-pdf" />
    </router-link>
  </header>

  <div class="login-container">
    <h1>Iniciar Sesión</h1>
    <p class="p-login">Ingresa tus credenciales para acceder a tu cuenta</p>

    <form @submit.prevent="handleLogin" class="form">

      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input id="email" type="email" v-model="email" class="input" placeholder="ejemplo@correo.com" required />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input id="password" type="password" v-model="password" class="input" required />
      </div>

      <div class="button-container">
        <button type="submit" class="btn-login">Iniciar Sesión</button>
      </div>
    </form>
    <p class="p-register">¿No tienes cuenta? <span><router-link to="/register"><u>Regístrate</u></router-link></span></p>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = () => {
  console.log('Login con:', email.value, password.value)
  router.push('/dashboard')
}
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
  margin-top: 10px;
  margin-bottom: 10px;
}

.login-container {
  width: 30%;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
}

h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.p-login {
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input {
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.btn-login {
  background-color: #000;
  color: #fff;
  padding: 12px 24px;
  font-weight: bold;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
}

.p-register {
  margin-top: 25px;
}

</style>