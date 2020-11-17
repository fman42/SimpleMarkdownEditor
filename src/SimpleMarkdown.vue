<template>
    <div class="simple-markdown">
        <!-- Toolbar -->
        <section class="simple-markdown__toolbar">
            <ul>
                <li v-for="(item, index) in toolbar.filter(x => !disabledIdsTools.includes(x.id))" v-bind:key="index">
                    <button v-on:click="executeToolCallback(item.callbackName)">
                        {{ item.name }}
                    </button>
                </li>
            </ul>
        </section>
        <!-- Field -->
        <textarea class="simple-markdown__field" ref="field" v-on:change="onInputHandler($event)" v-model="content">
            
        </textarea>
    </div>
</template>

<script>
    export default {
        name: 'SimpleMarkdown',
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
                },
                {
                    id: 'bold',
                    name: 'Bold',
                    callbackName: 'bold'
                },
                {
                    id: 'italic',
                    name: 'Italic',
                    callbackName: 'italic'
                },
                {
                    id: 'strike',
                    name: 'Strikethrough',
                    callbackName: 'strike'
                }
            ];

            this.historyStack = [];
            this.currentIndexHistoryStack = 0;
        },
        mounted() {
            console.log(this.disabledTools);
            this.disabledIdsTools = this.disabledTools;

            setTimeout(() => {
                this.pushInHistory(this.content);
            }, 5000);
        },
        methods: {
            /*
                Toolbar' callbacks
            */
            undo() {
                this.content = this.fetchContentFromHistory(true);
            },

            redo() {
                this.content = this.fetchContentFromHistory(false);
            },

            bold() {
                this.supplementFieldContent('**');
            },

            italic() {
                this.supplementFieldContent('*');
            },

            strike() {
                this.supplementFieldContent('~~');
            },

            supplementFieldContent(additionalSymbols) {
                const refFieldStartPosition = this.$refs.field.selectionStart;
                const refFieldEndPosition = this.$refs.field.selectionEnd;

                if (refFieldStartPosition !== refFieldEndPosition){
                    const substring = additionalSymbols + `${this.content.slice(refFieldStartPosition, refFieldEndPosition)}` + additionalSymbols;
                    this.content = this.content.slice(0, refFieldStartPosition) + substring + this.content.slice(refFieldEndPosition, this.content.length);
                } else 
                    this.content = additionalSymbols + `${this.content}` + additionalSymbols;

                this.pushInHistory(this.content);
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
    .simple-markdown {
        width: 45%;
        background-color: #eff3f7;
        border-radius: 5px;
    }

    .simple-markdown__toolbar > ul {
        margin: 0px;
        padding: 0px;
        list-style: none;
        display: flex;
    }

    .simple-markdown__field {
        resize: none;
        border: none;
        outline: none;
        padding: 5px;
        width: 100%;
        height: 100px;
    }
</style>