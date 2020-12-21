<template>
    <div class="simple-markdown" id="markdown_editor">
        <!-- Toolbar -->
        <Toolbar :disabledTools="disabledTools" v-on:action="executeToolCallback"></Toolbar>
        <!-- Field -->
        <div class="editor">
            <textarea class="simple-markdown__field" ref="field" v-on:change="saveTextareaHistory()" v-model="content">
                
            </textarea>
            <div class="editor__separrator">

            </div>
            <div class="editor__preview">

            </div>
        </div>
        <!-- Modals -->
        <InformationModal v-show="modalsVisible.information"></InformationModal>
    </div>
</template>

<script>
    import Toolbar from './Toolbar.vue';
    import InformationModal from './Modals/Information.vue';

    export default {
        name: 'SimpleMarkdown',
        props: {
            disabledTools: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            autoSave: {
                type: Number,
                default: () => {
                    return 5000;
                }
            }
        },
        data() {
            return {
                content: '',
                modalsVisible: {
                    information: false
                }
            }
        },
        created() {
            this.historyStack = [];
            this.currentIndexHistoryStack = 0;
        },
        mounted() {
            if (isNaN(this.autoSave))
                return;

            setTimeout(() => {
                this.saveTextareaHistory();
            }, this.autoSave);
        },
        methods: {
            /*
                Toolbar' callbacks
            */
            getBranchFromHistory(isUndo) {
                this.content = this.fetchContentFromHistory(isUndo);
            },

            applyFormat(additionalSymbols) {
                if (this.$refs.field.selectionStart !== this.$refs.field.selectionEnd){
                    const substring = additionalSymbols + `${this.selectedText}` + additionalSymbols;
                    this.content = this.joinContentWithEditedText(substring);
                } else 
                    this.content = additionalSymbols + `${this.content}` + additionalSymbols;

                this.saveTextareaHistory();
            },

            showInformationModal() {
                this.modalsVisible.information = !this.modalsVisible.information;
            },

            applyHeading(symbols) {
                this.content = `${symbols} ${this.selectedText}`; 
            },

            changeCase(toCase) {
                let updatedContent = this.content;

                switch (toCase) {
                    case 'upper': {
                        updatedContent = updatedContent.toUpperCase();
                        break;
                    }
                    case 'lower': {
                        updatedContent = updatedContent.toLowerCase();
                        break;
                    }
                    default: console.error('Case for the content is not found'); break;
                }

                this.content = this.joinContentWithEditedText(updatedContent);
                this.saveTextareaHistory();
            },

            clearArea() {
                this.content = '';
            },

            /*
                Component' functions
            */
            saveTextareaHistory() {
                const val = this.content.trim();

                if (val.length === 0 || this.historyStack.includes(val))
                    return;

                this.historyStack.push(val);
                this.currentIndexHistoryStack = this.historyStack.length - 1;
            },

            joinContentWithEditedText(editedText) {
                return this.content.slice(0, this.$refs.field.selectionStart) + editedText + this.content.slice(this.$refs.field.selectionEnd, this.content.length);
            },

            executeToolCallback(callback) {
                if (typeof callback === 'function')
                    return callback.call();

                if (typeof this[callback.name] !== 'function')
                    return console.error('Method is not found: ' + callback.name);

                const params = typeof callback['arguments'] !== "object" ? [] : callback.arguments;
                this[callback.name].apply(this, params);
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
        },
        computed: {
            selectedText: function() {
                return this.content.slice(this.$refs.field.selectionStart, this.$refs.field.selectionEnd);
            }
        },
        components: {
            Toolbar,
            InformationModal
        }
    }
</script>

<style scoped>
    .simple-markdown {
        background-color: #ffffff;
        border-radius: 10px;
    }

    .simple-markdown__field {
        resize: none;
        border: none;
        outline: none;
        width: 50%;
        height: 100px;
    }

    .editor__separrator::before {
        position: absolute;
        content: "";
        right: 7px;
        top: 50%;
        display: block;
        width: 1px;
        height: 30px;
        background-color: #E1E5E7;
    }

    .editor__separrator::after {
        position: absolute;
        content: "";
        left: 7px;
        top: 50%;
        display: block;
        width: 1px;
        height: 30px;
        background-color: #E1E5E7;
    }

    .editor__separrator {
        background-color: #F2F4F5;
        width: 2px;
        position: absolute;
        left: 50%;
        cursor: col-resize;
        height: calc(100vh - 70px);
    }

    .editor__preview {
        width: 50%;
    }

    .editor {
        display: flex;
        flex-direction: row;
        padding: 0px 20px;
        position: relative;
    }
</style>