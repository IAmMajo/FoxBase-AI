<script setup lang="ts"></script>

<template>
  <footer class="relative flex jc-ai-center">
    <!-- Footer Waves Content -->

    <!-- dunkel-top -->
    <svg
      class="primary-wave footer-wave t-0 z-2"
      width="1437"
      height="129"
      viewBox="0 0 1437 129"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M431.904 119.439C214.695 154.421 227.265 80.4591 0 102.948V0H1437V36.5C1396.27 23.5066 1344.5 26.5 1302.25 53.4728C1234.03 97.0274 1017.16 102.948 961.352 90.454C905.541 77.9604 805.987 32.9832 690.343 67.9654C574.699 102.948 649.114 84.457 431.904 119.439Z"
      />
    </svg>

    <!-- dunkel-Foreground -->
    <svg
      class="primary-wave footer-wave b-0 z-2"
      width="1433"
      height="226"
      viewBox="0 0 1433 226"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M386.5 97.0713C324 59.2172 263 20.9884 0 0V226H1433C1433 226 1161 183.648 1134 177.652C1107 171.655 886.5 97.0713 694 115.061C568.896 126.753 449 134.925 386.5 97.0713Z"
      />
    </svg>

    <!-- dunkelBG -->
    <svg
      class="footer-wave b-0 z-1"
      width="1440"
      height="327"
      viewBox="0 0 1440 327"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 240C275.61 77.9757 452.5 126.552 576 126.552C640.5 126.552 797.042 158.682 961.5 63.1485C1112 -24.277 1334.73 0.712838 1440 12.7238V277.38V327H0V240Z"
        fill="#475569"
      />
    </svg>

    <!-- Footer Main Content -->
    <div class="footer-main-content flex gap">
      <div>
        <p><b>Unsere Plattformen</b></p>
        <ul>
          <li><a href="#">Startseite</a></li>
          <li><a href="#">Produkt</a></li>
          <li><a href="#">FoxBase AI</a></li>
          <li><a href="#">Erfolgstories</a></li>
        </ul>
      </div>

      <div>
        <p><b>Ressourcen</b></p>
        <ul>
          <li><a href="#">White Paper</a></li>
          <li><a href="#">Webinar</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Newsletter</a></li>
        </ul>
      </div>

      <div>
        <p><b>Inside FoxBase</b></p>
        <ul>
          <li><a href="#">Kontakt</a></li>
          <li><a href="#">Über uns</a></li>
          <li><a href="#">Karriereseite</a></li>
          <li><a href="#">Stellenangebote</a></li>
        </ul>
      </div>

      <div>
        <p><b>Kundenbereich</b></p>
        <ul>
          <li><a href="#">Knowledge Hub</a></li>
          <li><a href="#">Dokumentation</a></li>
          <li><a href="#">Zur Workbench</a></li>
          <li><a href="#">Technischer Support</a></li>
        </ul>
      </div>
    </div>

    <!-- Footer Aside Content -->
    <div class="absolute footer-aside-content l-0 b-0 z-100 flex flex-column">
      <div class="footer-locaitons">
        <p>kontakt@foxbase.de</p>
        <p>+49 211 1586 4066</p>
        <p>Kasernenstraße 67</p>
        <p>40213 Düsseldorf</p>
      </div>
      <div>
        <a href="#">Insta</a>
        <!-- Werden durch Icons ausgetauscht -->
        <a href="#">LinkedIn</a>
        <!-- Werden durch Icons ausgetauscht -->
        <a href="#">YouTube</a>
        <!-- Werden durch Icons ausgetauscht -->
      </div>
    </div>

    <!-- Footer Bottom Content -->
    <div class="dark-bottomtext footer-bottom-container z-100 absolute b-0">
      <div
        class="footer-bottom-container-content flex jc-space-between-ai-center"
      >
        <div
          class="darkening-layer-secondary absolute z-0 full-size-percent"
        ></div>
        <b><p class="footer-bottom-left">@ FoxBase GmbH 2024</p></b>
        <div class="footer-bottom-right flex gap">
          <b><a class="dark-bottomtext" href="#">Datenschutz</a></b>
          <b><a class="dark-bottomtext" href="#">Impressum</a></b>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>
.primary-wave path {
  fill: var(--dark-primary);
}

.b-5 {
  bottom: 5;
}

.footer-locaitons p {
  margin: 0;
}

.footer-wave {
  position: absolute;
  transform: scaleX(200%);
}

.footer-main-content {
  z-index: 100;
}

.footer-bottom-right {
  margin-right: var(--gap);
}

.footer-bottom-left {
  margin-left: var(--gap);
}

.footer-bottom-container {
  width: 100%;
  background-color: var(--dark-bg-secondary);
}

.footer-bottom-container p {
  font-size: 16px;
}

.footer-bottom-container a {
  font-family: "asap", sans-serif;
  font-size: 16px;
  text-decoration: none;
}

.footer-bottom-container-content {
  width: 100%;
  margin: 0 auto;
}

.footer-aside-content {
  margin-bottom: 70px;
}
</style>
