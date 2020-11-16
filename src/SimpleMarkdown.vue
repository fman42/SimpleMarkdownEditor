<template>
    <div class="simple-markdown">
        <!-- Toolbar -->
        <section class="simple-markdown__toolbar">
            <ul>
                <li v-for="(item, index) in toolbar.filter(x => !disabledTools.includes(x.id))" v-bind:key="index">
                    <button v-on:click="executeToolCallback(item.callbackName)">
                        {{ item.name }}
                    </button>
                </li>
            </ul>
        </section>
        <!-- Field -->
        <textarea class="simple-markdown__field" v-on:change="onInputHandler($event)" v-model="content">
            
        </textarea>

        {{ historyStack }}
    </div>
</template>

<script>
    export default {
        name: 'SimpleMarkdown',
        data() {
            return {
                disabledTools: [],
                content: ''
            }
        },
        created() {
            this.toolbar = [
                {
                    id: 'undo',
                    name: 'Undo',
                    callbackName: 'undo'
                },
                {
                    id: 'redo',
                    name: 'Redo',
                    callbackName: 'redo'
                }
            ];

            this.historyStack = [];
            this.currentIndexHistoryStack = 0;
        },
        mounted() {
            setTimeout(() => {
                this.pushInHistory(this.content);
            }, 5000);
        },
        methods: {
            /*
                Toolbar' callbacks
                * undo() - return content of field to prev version;
                * redo() - return content of field to next version;
            */
            undo() {
                this.content = this.fetchContentFromHistory(true);
            },

            redo() {
                this.content = this.fetchContentFromHistory(false);
            },

            /*
                Component' events
            */
            onInputHandler(event) {
                this.content = event.target.value;
                this.pushInHistory(this.content);
            },

            /*
                Component' functions
            */
            pushInHistory(val) {
                val = val.trim();

                if (val.length === 0 || this.historyStack.includes(val))
                    return;

                this.historyStack.push(val);
                this.currentIndexHistoryStack = this.historyStack.length - 1;
            },

            executeToolCallback(callbackName) {
                this[callbackName]();
            },

            fetchContentFromHistory(isUndoAction = true) {
                if (this.currentIndexHistoryStack === 0 && isUndoAction)
                {
                    this.content = '';
                    return;
                }

                this.currentIndexHistoryStack = this.currentIndexHistoryStack - (isUndoAction ? 1 : -1);
                return this.historyStack[this.currentIndexHistoryStack];
            }
        }
    }
</script>

<style scoped>
    .simple-markdown__field {
        resize: none;
    }
</style>