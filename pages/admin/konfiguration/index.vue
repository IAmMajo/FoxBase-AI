<script>
export default {
    data() {
        return {
            primary: '#00DC82',
            backgroundPrimary: '#021025',
            backgroundSecondary: '#0F1F31',
            backgroundTertiary: '#020420',
            textPrimary: '#FFFFFF',
            textSecondary: '#CBD5E1',
            textTertiary: '#00DC82',
        };
    },
};

</script>

<template>
    <h2>Konfiguration</h2>
    <p>Auf dieser Seite können Konfiguraiton über das Aussehen und Verhalten der Seite festgelegt werden.</p>
    <h3>Farbpalette</h3>
    <div class="flex jc-around-ai-center gap">

        <div class="flex flex-column jc-ai-center color-field">
            <ColorPicker name="primaryColor" v-model="primary"/>
            <p>Primary</p>
        </div>

        <div class="flex flex-column jc-ai-center color-field">
            <ColorPicker name="backgroundPrimary" v-model="backgroundPrimary" />
            <p>Hintergrund 1</p>
        </div>

        <div class="flex flex-column jc-ai-center color-field">
            <ColorPicker name="backgroundSecondary" v-model="backgroundSecondary" />
            <p>Hintergrund 2</p>
        </div>

        <div class="flex flex-column jc-ai-center color-field">
            <ColorPicker name="backgroundTertiary" v-model="backgroundTertiary"/>
            <p>Hintergrund 3</p>
        </div>

        <div class="flex flex-column jc-ai-center color-field">
            <ColorPicker name="textPrimary" v-model="textPrimary"/>
            <p>Text 1</p>
        </div>

        <div class="flex flex-column jc-ai-center color-field">
            <ColorPicker name="textSecondary" v-model="textSecondary" />
            <p>Text 2</p>
        </div>

        <div class="flex flex-column jc-ai-center color-field">
            <ColorPicker name="textTertiary" v-model="textTertiary" />
            <p>Text 3</p>
        </div>
    </div>
</template>

<style>


.p-colorpicker-preview{
    height: 50px !important;
    width: 50px !important;
    border-radius: 1000px !important;
    box-shadow: var(--box-shadow);
}

.color-field{
    width: 100px;
}

</style>