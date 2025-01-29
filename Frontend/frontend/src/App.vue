<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header>
    <div>
      <nav>
        <div class="burger-menu" @click="toggleMenu">
          <div class="burger-line"></div>
          <div class="burger-line"></div>
          <div class="burger-line"></div>
        </div>
        <div :class="{'menu-open': isMenuOpen}" class="nav-links">
          <RouterLink to="/" aria-label="Go to Home">Home</RouterLink>
          <RouterLink to="/usersView" aria-label="View Users">Users</RouterLink>
          <RouterLink to="/ordersView" aria-label="View Orders">Orders</RouterLink>
          <RouterLink to="/reviewsView" aria-label="View Reviews">Reviews</RouterLink>
          <RouterLink to="/about" aria-label="Learn About Us">About</RouterLink>
          
        </div>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  line-height: 1;
}

nav {
  width: 100%;
  font-size: 400px;
  text-align: center;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: large;
}

nav a.router-link-exact-active {
  color: var(--color-text-active);
  font-weight: bold;
  background-color: var(--color-background-active);
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  text-decoration: none;
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 14px;
  border-style: solid 1px;

}

nav a:first-of-type {
  border: 0;

}
.burger-menu {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.burger-line {
  width: 25px;
  height: 3px;
  margin: 5px 0;
  background-color: #333;
}

.nav-links {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-links a {
  display: inline-block;
}

@media (max-width: 768px) {
  .nav-links {
    position: absolute;
    top: 60px;
    right: 0;
    width: 100%;
    background-color: white;
    flex-direction: column;
    align-items: center;
    display: none;
    padding: 1rem 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .nav-links.menu-open {
    display: flex; 
  }

  .burger-menu {
    display: flex;
  }
}

@media (min-width: 2048px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  nav {
    font-size: 0.5rem;
    padding: 1rem 0;
    margin-top: 1rem;
    justify-content: flex-start;
  }

  nav a {
    padding: 0.5rem 1.5rem;
  }
}

@media (max-width: 768px) {
  nav {
    font-size: 1rem;
    padding: 0.5rem;
  }

  nav a {
    padding: 0.5rem 1rem;
    display: block;
  }
}
</style>