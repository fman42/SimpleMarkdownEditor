<template>
    <section class="toolbar" id="toolbar">
        <IconProvider></IconProvider>
        <div class="toolbar__group" v-for="(toolbarGroup, index) in toolbar" v-bind:key="index">
            <ul>
                <li v-for="item in toolbarGroup" v-bind:key="item.id" class="toolbar__item">
                    <div class="toolbar__action" @mouseover="enableTooltip($event)" @mouseleave="disableTooltip($event)"
                        v-bind:class="getToolbarStyles(item)" :data-label="item.description">
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
                description: 'Undo',
                callback: {
                    name: 'getBranchFromHistory',
                    arguments: [true]
                }
            },
            {
                id: 'redo',
                description: 'Redo',
                callback: {
                    name: 'getBranchFromHistory',
                    arguments: [false]
                }
            },
        ],
        [
            {
                id: 'bold',
                description: 'Bold',
                callback: {
                    name: 'applyFormat',
                    arguments: ['**']
                }
            },
            {
                id: 'italic',
                description: 'Italic',
                callback: {
                    name: 'applyFormat',
                    arguments: ['*']
                }
            },
            {
                id: 'strikethrough',
                description: 'Strikethrough',
                callback: {
                    name: 'applyFormat',
                    arguments: ['~~']
                }
            },
            {
                id: 'toUpper',
                description: 'To convert to uppercase',
                callback: {
                    name: 'changeCase',
                    arguments: ['upper']
                }
            },
            {
                id: 'toLower',
                description: 'To convert to lowercase',
                callback: {
                    name: 'changeCase',
                    arguments: ['lower']
                }
            },
        ],
        [
            {
                id: 'heading1',
                description: 'Heading 1',
                callback: {
                    name: 'applyHeading',
                    arguments: ['#']
                }
            },
            {
                id: 'heading2',
                description: 'Heading 2',
                callback: {
                    name: 'applyHeading',
                    arguments: ['##']
                }
            },
            {
                id: 'heading3',
                description: 'Heading 3',
                callback: {
                    name: 'applyHeading',
                    arguments: ['###']
                }
            },
            {
                id: 'heading4',
                description: 'Heading 4',
                callback: {
                    name: 'applyHeading',
                    arguments: ['####']
                }
            },
            {
                id: 'heading5',
                description: 'Heading 5',
                callback: {
                    name: 'applyHeading',
                    arguments: ['#####']
                }
            },
            {
                id: 'heading6',
                description: 'Heading 6',
                callback: {
                    name: 'applyHeading',
                    arguments: ['######']
                }
            }
        ],
        [
            {
                id: 'clear',
                description: 'Clear',
                callback: {
                    name: 'clearArea',
                    arguments: []
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

    .toolbar__item {
        width: 30px;
        margin-right: 5px;
    }

    .toolbar__item:last-child {
        margin-right: 0px;
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
        width: 2px;
        height: 35px;
        background-color: #F2F4F5;
        margin: 0px 20px;
    }

    .toolbar {
        padding: 23px 20px;
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