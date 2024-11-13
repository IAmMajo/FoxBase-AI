<script setup lang="ts"></script>

<template>
  <footer class="relative flex jc-ai-center">

    <!-- Footer Waves Content -->
    <img class="footer-wave t-0 z-2" src="../assets/graphics/dunkelTop.svg" alt="Wave1">
    <img class="footer-wave b-0 z-2" src="../assets/graphics/dunkelForeground.svg" alt="Wave2">
    <img class="footer-wave b-0 z-1" src="../assets/graphics/dunkelBG.svg" alt="">


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
      <div class="footer-bottom-container-content flex jc-space-between-ai-center">
        <b><p>@ FoxBase GmbH 2024</p></b>
        <div class="footer-bottom-links flex gap">
          <b><a class="dark-bottomtext" href="#">Datenschutz</a></b>
          <b><a class="dark-bottomtext" href="#">Impressum</a></b>
        </div>
      </div>

    </div>
  </footer>
</template>

<style>

.b-5{
  bottom: 5;
}

.footer-locations{

}

.footer-locaitons p{
  margin: 0;
}

.footer-wave{
  position: absolute;
  width: 102%;
}

.footer-main-content{
  z-index: 100;
}

.footer-bottom-container{
  width: 100%;
}

.footer-bottom-container p{
  font-size: 16px;
}

.footer-bottom-container a{
  font-family: "asap", sans-serif;
  font-size: 16px;
  text-decoration: none
}

.footer-bottom-container-content{
  width: 97%;
  margin: 0 auto;
}

.footer-aside-content{
  margin-bottom: 70px;
}

</style>
