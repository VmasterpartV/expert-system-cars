<template>
  <div>
    <nav
      class="navbar header has-shadow is-info"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item ml-6 p-5" href="/">
          <span class="title is-4 has-text-white"
            >Sistema experto en automóviles</span
          >
        </a>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>

    <section class="main-content">
      <div class="container">
        <Nuxt />
      </div>
    </section>

    <div class="notification is-info">
      <div class="columns is-centered">
        <div class="column is-8">
          <div class="content has-text-centered">
            <p>
              <strong>Instituto Tecnológico de Mérida</strong> &copy;
              2022
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
