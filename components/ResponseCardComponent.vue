<script setup lang="ts">
    const text = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
</script>


<template>
    <div class="response-header flex jc-ai-center">
        <h3 class="dark-heading no-spacing">
            Basierend auf Ihrer Anfrage...
        </h3>
    </div>
        <div class="response-container flex jc-ai-center">
            <div class="response-box flex jc-ai-center">
                <p class="dark-bottomtext no-spacing">
                    Lorem <b>ipsum</b> dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                </p>
            </div>
        </div>
    <div class="response-header flex jc-ai-center">
    <h3 class="dark-heading no-spacing">
        ... empfehlen wir Ihnen folgende Produkte:
    </h3>
</div>
</template>


<style>

    .response-box{
        background-color: #00dc8011;
        border: 2px solid var(--dark-primary);
        padding: var(--gap);
        width: 65vw;
        min-height: 12vh;
        border-radius: var(--border-radius-default);
    }

    .response-container{
        height: 26vh;
        background-color: var(--dark-bg-primary);
    }

    .response-header{
        background-color: var(--dark-bg-primary);
    }

</style>