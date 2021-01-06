<template>
    <div class="editor__separrator"
        v-bind:class="separratorClasses"
        v-on:mouseup="disableMouseMove()"
        v-on:mousedown="enableMouseMove($event)"
        v-on:mousemove="changeBorder($event)">
    </div>
</template>

<script>
    const EDITOR_SEPARRATOR__DISABLED = 'editor__separrator--disabled';
    const EDITOR_SEPARRATOR__ACTIVE = 'editor__separrator--active';
    const EDITOR_SEPARRATOR__BLOCKED = 'editor__separrator--blocked';

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
                borderSize: 25,
                blockedMove: false
            }
        },
        methods: {
            disableMouseMove() {
                this.canMove = false;
            },

            enableMouseMove(event) {
                if (event.offsetX < this.borderSize && this.resize)
                {
                    this.mousePosition = event.x;
                    this.canMove = true;
                }
            },

            changeBorder(event) {
                if (!this.canMove)
                    return;

                this.blockedMove = false;
                const deltaX = (this.mousePosition - event.x);
                if (Math.abs(deltaX) > 4)
                {
                    this.canMove = false;
                    return;
                }

                this.mousePosition = event.x;
                this.$emit('changeDelta', deltaX * -1);
            },

            blockMove() {
                this.blockedMove = true;
            }
        },
        computed: {
            separratorClasses: function () {
                let styles = {};

                styles[EDITOR_SEPARRATOR__DISABLED] = this.resize === false;
                if (this.resize) {
                    styles[EDITOR_SEPARRATOR__ACTIVE] = this.canMove;
                    styles[EDITOR_SEPARRATOR__BLOCKED] = this.blockedMove;
                }

                return styles;
            }
        }
    }
</script>

<style scoped>
    .editor__separrator::before {
        position: absolute;
        content: "";
        right: 0px;
        top: 50%;
        display: block;
        width: 12px;
        height: 30px;
        z-index: 9999;
        background-color: transparent;
        border-left: 1px solid #BDC9CF;
    }

    .editor__separrator::after {
        position: absolute;
        content: "";
        left: 0px;
        top: 50%;
        display: block;
        width: 12px;
        height: 30px;
        z-index: 9999;
        background-color: transparent;
        border-right: 1px solid #BDC9CF;
    }

    .editor__separrator {
        background-color: #F2F4F5;
        width: 2px;
        position: relative;
        display: block;
        cursor: col-resize;
        height: calc(100vh - 78px);
    }

    .editor__separrator--disabled {
        cursor: default;
    }

    .editor__separrator--blocked {
        cursor: not-allowed;
    }

    .editor__separrator--active::before {
        border-left: 1px solid #61A3F1;
    }

    .editor__separrator--active::after {
        border-right: 1px solid #61A3F1;
    }
</style>