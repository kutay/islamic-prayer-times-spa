<template>
        <div class="player">
            <div class="player-controls">
                <div id="stop">
                    <a v-on:click.prevent="stop" title="Stop" href="#">
                        <svg width="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path fill="currentColor"
                                  d="M16,4.995v9.808C16,15.464,15.464,16,14.804,16H4.997C4.446,16,4,15.554,4,15.003V5.196C4,4.536,4.536,4,5.196,4h9.808C15.554,4,16,4.446,16,4.995z"/>
                        </svg>
                    </a>
                </div>
                <div id="play">
                    <a v-on:click.prevent="playing = !playing" :title="(playing) ? 'Pause' : 'Play'" href="#">
                        <svg width="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path v-if="!playing" fill="currentColor"
                                  d="M15,10.001c0,0.299-0.305,0.514-0.305,0.514l-8.561,5.303C5.51,16.227,5,15.924,5,15.149V4.852c0-0.777,0.51-1.078,1.135-0.67l8.561,5.305C14.695,9.487,15,9.702,15,10.001z"/>
                            <path v-else fill="currentColor"
                                  d="M15,3h-2c-0.553,0-1,0.048-1,0.6v12.8c0,0.552,0.447,0.6,1,0.6h2c0.553,0,1-0.048,1-0.6V3.6C16,3.048,15.553,3,15,3z M7,3H5C4.447,3,4,3.048,4,3.6v12.8C4,16.952,4.447,17,5,17h2c0.553,0,1-0.048,1-0.6V3.6C8,3.048,7.553,3,7,3z"/>
                        </svg>
                    </a>
                </div>
                <div id="seek">
                    <div v-on:click="seek" class="player-progress" title="Seek">
                        <div :style="{ width: this.percentComplete + '%' }" class="player-seeker"></div>
                    </div>
                    <div class="player-time">
                        <div class="player-time-current">{{ this.currentSeconds | convertTimeHHMMSS }}</div>
                        <div class="player-time-total">{{ this.durationSeconds | convertTimeHHMMSS }}</div>
                    </div>
                </div>
                <div id="download">
                    <a v-on:click.prevent="download" href="#" title="Download">
                        <svg width="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path fill="currentColor"
                                  d="M15,7h-3V1H8v6H5l5,5L15,7z M19.338,13.532c-0.21-0.224-1.611-1.723-2.011-2.114C17.062,11.159,16.683,11,16.285,11h-1.757l3.064,2.994h-3.544c-0.102,0-0.194,0.052-0.24,0.133L12.992,16H7.008l-0.816-1.873c-0.046-0.081-0.139-0.133-0.24-0.133H2.408L5.471,11H3.715c-0.397,0-0.776,0.159-1.042,0.418c-0.4,0.392-1.801,1.891-2.011,2.114c-0.489,0.521-0.758,0.936-0.63,1.449l0.561,3.074c0.128,0.514,0.691,0.936,1.252,0.936h16.312c0.561,0,1.124-0.422,1.252-0.936l0.561-3.074C20.096,14.468,19.828,14.053,19.338,13.532z"/>
                        </svg>
                    </a>
                </div>
            </div>
            <audio :loop="innerLoop" ref="audiofile" :src="file" preload="auto" style="display: none;"></audio>
        </div>
</template>

<script>
    export default {
        props: {
            file: {
                type: String,
                default: null
            },
            autoPlay: {
                type: Boolean,
                default: false
            },
            loop: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            audio: undefined,
            currentSeconds: 0,
            durationSeconds: 0,
            innerLoop: false,
            loaded: false,
            playing: false,
            previousVolume: 35,
            showVolume: false,
            volume: 100
        }),
        computed: {
            muted() {
                return this.volume / 100 === 0;
            },
            percentComplete() {
                return parseInt(this.currentSeconds / this.durationSeconds * 100);
            }
        },
        filters: {
            convertTimeHHMMSS(val) {
                let hhmmss = new Date(val * 1000).toISOString().substr(11, 8);

                return hhmmss.indexOf("00:") === 0 ? hhmmss.substr(3) : hhmmss;
            }
        },
        watch: {
            playing(value) {
                if (value) {
                    return this.audio.play();
                }
                this.audio.pause();
            },
            // eslint-disable-next-line no-unused-vars
            volume(value) {
                this.audio.volume = this.volume / 100;
            }
        },
        methods: {
            download() {
                this.stop();
                window.open(this.file, 'download');
            },
            load() {
                if (this.audio.readyState >= 2) {
                    this.loaded = true;
                    this.durationSeconds = parseInt(this.audio.duration);

                    return this.playing = this.autoPlay;
                }

                throw new Error('Failed to load sound file.');
            },
            mute() {
                if (this.muted) {
                    return this.volume = this.previousVolume;
                }

                this.previousVolume = this.volume;
                this.volume = 0;
            },
            seek(e) {
                if (!this.loaded) return;

                const el = e.target.getBoundingClientRect();
                const seekPos = (e.clientX - el.left) / el.width;

                this.audio.currentTime = parseInt(this.audio.duration * seekPos);
            },
            stop() {
                this.playing = false;
                this.audio.currentTime = 0;
            },
            update() {
                this.currentSeconds = parseInt(this.audio.currentTime);
            }
        },
        created() {
            this.innerLoop = this.loop;
        },
        mounted() {
            this.audio = this.$el.querySelectorAll('audio')[0];
            this.audio.addEventListener('timeupdate', this.update);
            this.audio.addEventListener('loadeddata', this.load);
            this.audio.addEventListener('pause', () => {
                this.playing = false;
            });
            this.audio.addEventListener('play', () => {
                this.playing = true;
            });
        }
    }
</script>

<style>
    /*@import url("https://fonts.googleapis.com/css?family=Nunito:400,700");*/
    .player-wrapper {
        align-items: center;
        background-color: #fff;
        background-image: linear-gradient(90deg, #fff 0, #e0e0e0);
        display: flex;
        /*height: 100vh;*/
        justify-content: center;
    }

    .player {
        background-color: #fff;
        border-radius: 5px;
        border: 1px solid #e0e0e0;
        box-shadow: 0 5px 8px rgba(0, 0, 0, 0.15);
        color: #404040;
        display: inline-block;
        line-height: 1.5625;
    }

    .player-controls {
        display: flex;
    }

    .player-controls > div {
        border-right: 1px solid #e0e0e0;
    }

    .player-controls > div:last-child {
        border-right: none;
    }

    .player-controls > div a {
        color: #404040;
        display: block;
        line-height: 0;
        padding: 1em;
        text-decoration: none;
    }

    .player-progress {
        background-color: #e0e0e0;
        cursor: pointer;
        height: 50%;
        min-width: 200px;
        position: relative;
    }

    .player-progress .player-seeker {
        background-color: #404040;
        bottom: 0;
        left: 0;
        position: absolute;
        top: 0;
    }

    .player-time {
        display: flex;
        justify-content: space-between;
    }

    .player-time .player-time-current {
        font-weight: 700;
        padding-left: 5px;
    }

    .player-time .player-time-total {
        opacity: 0.5;
        padding-right: 5px;
    }
</style>