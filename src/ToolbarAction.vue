<template>
    <div class="toolbar__action" @mouseover="enableTooltip($event)" @mouseleave="disableTooltip($event)"
        v-bind:class="getToolbarStyles(entity)" :data-label="entity.description">
        <svg class="icon" v-on:click="callToolbarTool(entity)">
            <use :xlink:href="getToolbarIconPath(entity.id)" />
        </svg>
    </div>
</template>

<script>
    const TOOLBAR_TOOLTIP_CLASSNAME = 'toolbar__tooltip';
    const TOOLBAR_ACTION__ACTIVE = 'toolbar__action--active';
    const TOOLBAR_ACTION__DISABLED = 'toolbar__action--disabled';

    export default {
        name: "ToolbarAction",
        props: {
            entity: {
                type: Object,
                required: true,
                default: function () {
                    return {
                        id: NaN,
                        description: ''
                    }
                }
            },
            disabled: {
                type: Boolean,
                default: () => false
            }
        },
        methods: {
            getToolbarIconPath(itemId) {
                return `#${itemId}`;
            },

            getToolbarStyles(item) {
                let styles = {};
                styles[TOOLBAR_ACTION__ACTIVE] = item.id === this.activeToolbarTools;
                styles[TOOLBAR_ACTION__DISABLED] = this.disabled;

                return styles;
            },

            enableTooltip(event) {
                event.target.classList.add(TOOLBAR_TOOLTIP_CLASSNAME);
            },

            disableTooltip(event) {
                event.target.classList.remove(TOOLBAR_TOOLTIP_CLASSNAME);
            },

            callToolbarTool(item) {
                this.$emit('callAction', item);
            }
        }
    }
</script>

<style scoped>
    .icon {
        width: 16px;
        height: 16px;
    }

    .toolbar__action {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        fill: #B1B4B6;
        box-sizing: border-box;
    }

    .toolbar__action:hover {
        border: 1px solid #DBE1E3;
        cursor: pointer;
    }

    .toolbar__action--active {
        fill: #61A4F1;
        border: 1px solid #61A4F1;
    }

    .toolbar__action--disabled {
        fill: #EFEFEF;
    }

    .toolbar__tooltip {
        position: relative;
    }

    .toolbar__tooltip::before {
        display: flex;
        align-items: center;
        position: absolute;
        top: -26px;
        content: attr(data-label);
        font-size: 13px;
        width: max-content;
        padding: 0px 7px;
        height: 20px;
        background-color: rgba(0,0,0,1);
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        border-radius: 2px;
        text-align: center;
        color: #FFFFFF;
    }

    .toolbar__tooltip::after {
        width: 0;
        height: 0;
        position: absolute;
        top: -6px;
        content: "";
        display: block;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 6px solid rgba(0,0,0,1);
    }
</style>