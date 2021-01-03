<template>
    <section class="toolbar" id="toolbar">
        <IconProvider></IconProvider>
        <div class="toolbar__group" v-for="(toolbarGroup, index) in toolbar" v-bind:key="index">
            <ul>
                <li v-for="item in toolbarGroup" v-bind:key="item.id">
                    <div class="toolbar__action" @mouseover="enableTooltip($event)" @mouseleave="disableTooltip($event)"
                        v-bind:class="getToolbarStyles(item)" :data-label="item.name">
                        <svg class="icon" v-on:click="callToolbarTool(item)">
                            <use :xlink:href="getToolbarIconPath(item.id)" />
                        </svg>
                    </div>
                </li>
            </ul>
            <div class="toolbar__group__separrator" v-if="index + 1 !== toolbar.length"></div>
        </div>
    </section>
</template>

<script>
    import IconProvider from './Providers/IconProvider';

    const toolbar = [
        [
            {
                id: 'undo',
                name: 'Undo',
                callback: {
                    name: 'getBranchFromHistory',
                    arguments: [true]
                }
            },
            {
                id: 'redo',
                name: 'Redo',
                callback: {
                    name: 'getBranchFromHistory',
                    arguments: [false]
                }
            },
        ],
        [
            {
                id: 'bold',
                name: 'Bold',
                callback: {
                    name: 'applyFormat',
                    arguments: ['**']
                }
            },
            {
                id: 'italic',
                name: 'Italic',
                callback: {
                    name: 'applyFormat',
                    arguments: ['*']
                }
            },
            {
                id: 'strikethrough',
                name: 'Strikethrough',
                callback: {
                    name: 'applyFormat',
                    arguments: ['~~']
                }
            },
            {
                id: 'toUpper',
                name: 'ToUpper',
                callback: {
                    name: 'changeCase',
                    arguments: ['upper']
                }
            },
            {
                id: 'toLower',
                name: 'ToLower',
                callback: {
                    name: 'changeCase',
                    arguments: ['lower']
                }
            },
        ],
        [
            {
                id: 'clear',
                name: 'Clear',
                callback: {
                    name: 'clearArea',
                    arguments: []
                }
            },
            {
                id: 'heading1',
                name: 'Heading 1',
                callback: {
                    name: 'applyHeading',
                    arguments: ['#']
                }
            },
            {
                id: 'heading2',
                name: 'Heading 2',
                callback: {
                    name: 'applyHeading',
                    arguments: ['##']
                }
            },
            {
                id: 'heading3',
                name: 'Heading 3',
                callback: {
                    name: 'applyHeading',
                    arguments: ['###']
                }
            },
            {
                id: 'heading4',
                name: 'Heading 4',
                callback: {
                    name: 'applyHeading',
                    arguments: ['####']
                }
            },
            {
                id: 'heading5',
                name: 'Heading 5',
                callback: {
                    name: 'applyHeading',
                    arguments: ['#####']
                }
            },
            {
                id: 'heading6',
                name: 'Heading 6',
                callback: {
                    name: 'applyHeading',
                    arguments: ['######']
                }
            }
        ]
    ];

    export default {
        name: 'Toolbar',
        props: {
            disabledTools: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        data() {
            return {
                disabledIdsTools: [],
                activeToolbarTools: null
            }
        },
        mounted() {
            this.disabledIdsTools = this.disabledTools;
        },
        computed: {
            toolbar: function () {
                return toolbar;
            }
        },
        methods: {
            getToolbarIconPath(toolbarId) {
                return '#' + toolbarId;
            },

            getToolbarStyles(item) {
                return {
                    'toolbar__action--active': item.id == this.activeToolbarTools,
                    'toolbar__action--disabled': this.disabledIdsTools.includes(item.id)
                }
            },

            enableTooltip(event) {
                event.target.classList.add('toolbar__tooltip');
            },

            disableTooltip(event) {
                event.target.classList.remove('toolbar__tooltip');
            },

            callToolbarTool(item) {
                this.$emit('action', item.callback);
            }
        },
        components: {
            IconProvider
        }
    }
</script>

<style scoped>
    .icon {
        width: 16px;
        height: 16px;
    }

    .toolbar__tooltip {
        position: relative;
    }

    .toolbar__tooltip::before {
        display: block;
        position: absolute;
        top: -23px;
        content: attr(data-label);
        font-size: 14px;
        width: 40px;
        height: 20px;
        background-color: rgba(0,0,0,0.5);
        border-radius: 2px;
        text-align: center;
        color: #FFFFFF;
    }

    .toolbar__tooltip::after {
        width: 0;
        height: 0;
        position: absolute;
        top: -3px;
        content: "";
        display: block;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 6px solid rgba(0,0,0,0.5);
    }

    .toolbar {
        display: flex;
        flex-direction: row;
    }

    .toolbar__group {
        display: flex;
        flex-direction: row;
    }

    .toolbar__action {
        width: 30px;
        height: 30px;
        margin: 0px 10px;
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

    .toolbar__group__separrator {
        width: 1px;
        background-color: #F2F4F5;
        margin: 0px 20px;
    }

    .toolbar {
        padding: 25px 15px;
        height: 30px;
        border-bottom: 2px solid #F2F4F5;
    }

    .toolbar__group > ul {
        margin: 0px;
        padding: 0px;
        list-style: none;
        display: flex;
        align-items: center;
    }
</style>