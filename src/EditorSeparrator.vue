<template>
    <div class="editor__separrator" v-bind:style="{left: widthSeparrator + 'px'}"
        v-bind:class="{'editor__separrator--disabled': resize === false}"
        v-on:mouseup="disableMouseMove()"
        v-on:mousedown="enableMouseMove($event)"
        v-on:mousemove="changeBorder($event)">
    </div>
</template>

<script>
    export default {
        name: "EditorSeparrator",
        props: {
            resize: {
                type: Boolean,
                default: () => true,
                required: false
            }
        },
        data() {
            return {
                canMove: undefined,
                mousePosition: undefined,
                borderSize: 22,
                widthSeparrator: NaN
            }
        },
        mounted() {
            this.widthSeparrator = window.outerWidth / 2;
        },
        methods: {
            disableMouseMove() {
                this.canMove = false;
            },

            enableMouseMove(event) {
                if (event.offsetX < this.borderSize)
                {
                    this.mousePosition = event.x;
                    this.canMove = true;
                }
            },

            changeBorder(event) {
                if (!this.canMove)
                    return;

                const deltaX = this.mousePosition - event.x;
                this.mousePosition = event.x;

                this.widthSeparrator += deltaX * -1;
                this.$emit('changeX', this.mousePosition);
            }
        }
    }
</script>