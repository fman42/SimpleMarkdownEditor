<template>
    <section class="simple-markdown__toolbar" id="toolbar">
        <ul>
            <li v-for="(item, index) in toolbar.filter(x => !disabledIdsTools.includes(x.id))" v-bind:key="index">
                <button v-on:click="$emit('action', item.callback)">
                    {{ item.name }}
                </button>
            </li>
        </ul>
    </section>
</template>

<script>
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
                disabledIdsTools: []
            }
        },
        created() {
            this.toolbar = [
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
                    id: 'strike',
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
                    callback: () => {
                        this.content = '';
                        this.saveTextareaHistory();
                    }
                }
            ];
        },
        mounted() {
            this.disabledIdsTools = this.disabledTools;
        }
    }
</script>

<style scoped>
    .simple-markdown__toolbar > ul {
        margin: 0px;
        padding: 0px;
        list-style: none;
        display: flex;
    }
</style>