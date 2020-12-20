<template>
    <section class="simple-markdown__toolbar" id="toolbar">
        <IconProvider></IconProvider>
        <ul>
            <li v-for="(item, index) in toolbar" v-bind:key="index">
                <div class="toolbar__action" v-bind:class="getToolbarStyles(item)">
                    <svg class="icon" v-on:click="callToolbarTool(item)">
                        <use :xlink:href="getToolbarIconPath(item.id)" />
                    </svg>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
    import IconProvider from './Providers/IconProvider';

    const toolbar = [
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
        },
        {
            id: 'information',
            name: 'Information',
            callback: {
                name: 'showInformationModal',
                arguments: []
            }
        }
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
        width: 20px;
        height: 20px;
    }

    .toolbar__action {
        width: 32px;
        height: 32px;
        margin: 0px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        fill: #B1B4B6;
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

    .simple-markdown__toolbar {
        padding: 15px;
        height: 30px;
        border-bottom: 2px solid #F2F4F5;
    }

    .simple-markdown__toolbar > ul {
        margin: 0px;
        padding: 0px;
        list-style: none;
        display: flex;
    }
</style>