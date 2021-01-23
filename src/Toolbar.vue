<template>
    <div id="toolbar">
        <section class="toolbar" v-if="show" id="toolbar">
            <IconProvider></IconProvider>
            <div class="toolbar__group" v-for="(toolbarGroup, index) in toolbar" v-bind:key="index">
                <ul>
                    <li class="toolbar__item" v-for="item in toolbarGroup" v-bind:key="item.id">
                        <ToolbarAction :entity="item" 
                            :disabled="disabledIdsTools.includes(item.id)" v-on:callAction="callToolbarTool">
                        </ToolbarAction>
                    </li>
                </ul>
                <div class="toolbar__group__separrator" v-if="index + 1 !== toolbar.length"></div>
            </div>
        </section>
        <section v-else>
           <ToolbarAction class="ff" :entity="getFullscreenItem" v-on:callAction="callToolbarTool"></ToolbarAction>
        </section>
    </div>
</template>

<script>
    import Toolbar from './Providers/ToolbarActions.js';
    import IconProvider from './Providers/IconProvider';
    import ToolbarAction from './ToolbarAction';

    export default {
        name: 'Toolbar',
        props: {
            disabledTools: {
                type: Array,
                default: () => []
            },
            show: {
                type: Boolean,
                default: () => true
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
            toolbar: () => {
                return Toolbar;
            },

            getFullscreenItem: function () {
                const countOfItems = this.toolbar.length;
                return this.toolbar[countOfItems - 1].filter(x => x.id === "fullscreen")[0];
            }
        },
        methods: {
            callToolbarTool(item) {
                this.$emit('action', item.callback);
            }
        },
        components: {
            IconProvider,
            ToolbarAction
        }
    }
</script>

<style scoped>
    .toolbar__item {
        width: 30px;
        margin-right: 5px;
    }

    .toolbar_enable_fullscren_button {
        display: flex;
        justify-content: flex-end;
        position: fixed;
        z-index: 9999;
    }

    .toolbar__item:last-child {
        margin-right: 0px;
    }

    .toolbar {
        display: flex;
        flex-direction: row;
    }

    .toolbar__group {
        display: flex;
        flex-direction: row;
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