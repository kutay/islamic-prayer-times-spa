<template>
    <span>
        <span class="select is-vcentered audio-selector">
            <select v-model="selectedAudio">
                <option v-for="option in availableAudios"
                        :key="option.path" :value="option">
                    {{ option.name }}
                </option>
            </select>
        </span>
        <audio-player :file="selectedAudio.path"></audio-player>
    </span>
</template>

<script>
    // Services
    import audios from "../service/audios";
    // Vue Components
    import AudioPlayer from '@/components/AudioPlayer.vue'

    export default {
        name: "AdhanPlayer",
        components: {
            AudioPlayer
        },
        data: function () {
            return {
                availableAudios: audios.getAvailableAudios(),
                selectedAudio: audios.getAvailableAudios()[0]
            }
        }
    }
</script>

<style scoped>
    .audio-selector {
        margin-top: 10px;
        margin-right: 10px;
    }
</style>