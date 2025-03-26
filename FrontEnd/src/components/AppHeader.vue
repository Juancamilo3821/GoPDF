<template>
  <header>
    <router-link to="/" class="main-icon">
      <font-awesome-icon icon="file-pdf" />
      <span>GoPDF</span>
    </router-link>

    <nav>
      <router-link to="/dashboard">
        <p>Dashboard</p>
      </router-link>

      <router-link to="/dashboard/reports">
        <p>Reportes</p>
      </router-link>

      <div class="logout-container">
        <div class="v-line"></div>
        <router-link to="/">
          <font-awesome-icon icon="right-from-bracket" class="logout-icon" />
        </router-link>
      </div>

    </nav>

  </header>
</template>

<script setup>

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

a {
  color: inherit;
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
  /* border: 2px solid red; */
  width: 18%;
}

.logout-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 30%;
  height: 80%;
  /* border: 2px solid green; */
}

.logout-icon {
  font-size: 120%;
}

.v-line {
  height: 100%;
  border: 1px solid #D6D6D6;
}
</style>
