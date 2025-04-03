<template>
  <header>
    <router-link to="/" class="main-icon">
      <font-awesome-icon icon="file-pdf" />
    </router-link>
  </header>
  <main>
    <section class="register-container">
      <h1>Crear cuenta</h1>
      <p class="p-register">Regístrate para comenzar a convertir tus documentos</p>

      <form @submit.prevent="handleRegister" class="form">

        <div class="form-row">
          <div class="form-group">
            <label for="firstName">Nombre</label>
            <input id="firstName" v-model="firstName" type="text" class="input" required />
          </div>

          <div class="form-group">
            <label for="lastName">Apellido</label>
            <input id="lastName" v-model="lastName" type="text" class="input" required />
          </div>
        </div>

        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input id="email" v-model="email" type="email" class="input" placeholder="ejemplo@correo.com" required />
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input id="password" v-model="password" type="password" class="input" required />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirmar Contraseña</label>
          <input id="confirmPassword" v-model="confirmPassword" type="password" class="input" required />
        </div>

        <div class="button-container">
          <button type="submit" class="btn-register">Registrarse</button>
        </div>
      </form>
      <p class="p-login">¿Ya tienes cuenta? <span><router-link to="/login"><u>Iniciar sesión</u></router-link></span></p>
    </section>
  </main>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden.')
    return
  }

  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        firstname: firstName.value,
        lastname: lastName.value
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error en el registro')
    }

    const data = await response.json()
    console.log('Registro exitoso:', data)

    router.push('/dashboard')
  } catch (error) {
    console.error('Error al registrar:', error.message)
    alert('Error en el registro: ' + error.message)
  }
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

.register-container {
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

.p-register {
  font-size: 14px;
  color: #868686;
  margin-bottom: 24px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input {
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.btn-register {
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

.p-login {
  margin-top: 25px;
}

</style>
