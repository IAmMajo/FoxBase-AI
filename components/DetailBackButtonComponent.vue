<script>

</script>


<template>

    <div>
        <div class="flex jc-ai-center">
            <a href="/">
                <i class="detail-back-button pi pi-angle-left"></i>
            </a>
            <p class="back-button-text">Zurück zur Startseite</p>
        </div>
    </div>


</template>


<style>
   .back-button-text {
    color: var(--dark-bg-secondary);
    white-space: nowrap;
    transition: 0.5s ease;
}

html.light .back-button-text {
    color: var(--light-bg-secondary);
    white-space: nowrap;
}

.detail-back-button {
    color: var(--dark-text-secondary);
    font-size: 26px;
}

html.light .detail-back-button {
    color: var(--light-text-primary);
    font-size: 26px;
}

a:hover + .back-button-text {
    color: var(--dark-text-secondary);
}

html.light a:hover + .back-button-text {
    color: var(--light-text-primary);
}

</style>