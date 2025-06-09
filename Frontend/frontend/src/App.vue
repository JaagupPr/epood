<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>
<template>
  <header>
    <nav class="nav">
      <div class="brand">
        <RouterLink to="/" class="logo" aria-label="Go to Home">TechCet</RouterLink>
      </div>

      <button
        class="burger"
        @click="toggleMenu"
        aria-label="Toggle menu"
        :aria-expanded="isMenuOpen.toString()"
      ></button>

      <div :class="['nav-links', { open: isMenuOpen }]">
        <RouterLink to="/" aria-label="Go to Home">Home</RouterLink>
        <RouterLink to="/usersView" aria-label="View Users">Users</RouterLink>
        <RouterLink to="/ordersView" aria-label="View Orders">Orders</RouterLink>
        <RouterLink to="/reviewsView" aria-label="View Reviews">Reviews</RouterLink>
        <RouterLink to="/orderItemsView" aria-label="View Order items">OrderItems</RouterLink>
        <RouterLink to="/about" aria-label="Learn About Us">About</RouterLink>
      </div>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  z-index: 1000;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-weight: bold;
  font-size: 1.25rem;
  text-decoration: none;
  color: #333;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links a {
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 8px;
  color: #333;
  transition: backround 0.3s ease, color 0.3s ease;
}

.nav-links a.router-link-exact-active {
  background-color: #e6f0ff;
  font-weight: bold;
  color: #0056b3;
}

.nav-links a:hover,
.nav-links a:focus {
  background-color: #f0f0f0;
  color: #000;
}

.burger {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.burger-line {
  width: 100%;
  height: 3px;
  background-color: #333;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .burger {
    display: flex;
  }

  .nav-links {
    position: absolute;
    top: 64px;
    right: 0;
    width: 100%;
    background: white;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    display: none;
  }

  .nav-links.open {
    display: flex;
  }
}
@media (min-width: 2048px) {
  .nav {
    padding: 2rem 3rem;
  }

  .nav-links a {
    padding: 0.75rem 1.5rem;
  }
  
}
</style>


