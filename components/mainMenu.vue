<template>
  <div class="overflow-y-auto">
    <ul class="list-none p-3 m-0">
        <ul class="list-none p-0 m-0 overflow-hidden">
          <li>
            <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
              <i class="pi pi-home mr-2"></i>
              <span class="font-medium">Dashboard</span>
            </a>
           </li>
            <li>
            <a
                v-ripple
                v-styleclass="{
                  selector: '@next',
                  enterClass: 'hidden',
                  enterActiveClass: 'slidedown',
                  leaveToClass: 'hidden',
                  leaveActiveClass: 'slideup',
                }"
                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-cog mr-2"></i>
                <span class="font-medium">Konfiguration</span>
                <i class="pi pi-chevron-down ml-auto"></i>
              </a>
            </li>
              <ul class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                <li>
                  <a
                    v-ripple
                    v-styleclass="{
                      selector: '@next',
                      enterClass: 'hidden',
                      enterActiveClass: 'slidedown',
                      leaveToClass: 'hidden',
                      leaveActiveClass: 'slideup',
                    }"
                    class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-cog mr-2"></i>
                    <span class="font-medium">Konfig1</span>
                    <i class="pi pi-chevron-down ml-auto"></i>
                  </a>
                </li>
                  <ul class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                    <li>
  
                      <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                        <i class="pi pi-cog mr-2"></i>
                        <span class="font-medium">Farbtest</span>
                      </a>

                    </li>
                    <li>
                      <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                        <i class="pi pi-cog mr-2"></i>
                        <span class="font-medium">Unterkonfig2</span>
                      </a>
                    </li>
                  </ul>
                <li>
                  <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                    <i class="pi pi-cog mr-2"></i>
                    <span class="font-medium">Konfig2</span>
                  </a>
                </li>
              </ul>
            <li>
            <a
              v-ripple
              v-styleclass="{
                selector: '@next',
                enterClass: 'hidden',
                enterActiveClass: 'slidedown',
                leaveToClass: 'hidden',
                leaveActiveClass: 'slideup',
              }"
              class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
            >
              <i class="pi pi-shop mr-2"></i>
              <span class="font-medium">Katalog</span>
              <i class="pi pi-chevron-down ml-auto"></i>
            </a>
            </li>
            <ul class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
              <li>
                <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                  <i class="pi pi-th-large mr-2"></i>
                  <span class="font-medium">Übersicht</span>
                </a>
              </li>
              <li>
                <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                  <i class="pi pi-upload mr-2"></i>
                  <span class="font-medium">CSV Upload</span>
                </a>
              </li>
            </ul>
          <li>
            <a
              v-ripple
              v-styleclass="{
                selector: '@next',
                enterClass: 'hidden',
                enterActiveClass: 'slidedown',
                leaveToClass: 'hidden',
                leaveActiveClass: 'slideup',
              }"
              class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
            >
              <i class="pi pi-chart-line mr-2"></i>
              <span class="font-medium">Reports</span>
              <i class="pi pi-chevron-down ml-auto"></i>
            </a>
          </li>
            <ul class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
              <li>
                <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                  <i class="pi pi-shopping-cart mr-2"></i>
                  <span class="font-medium">Käufe</span>
                </a>
              </li>
              <li>
                <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                  <i class="pi pi-thumbs-up mr-2"></i>
                  <span class="font-medium">Bewertungen</span>
                </a>
              </li>
            </ul>
            <li>
            <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
              <i class="pi pi-question mr-2"></i>
              <span class="font-medium">Hilfe</span>
            </a>
          </li>
        </ul>
    </ul> 
  </div>


  <div class="mt-auto">
    <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
    <a v-ripple class="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
      <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
      <span class="font-bold">Maxine Mustermann</span>
    </a>
  </div>
</template>

<style>
a:link {
  text-decoration: none;
}

</style>