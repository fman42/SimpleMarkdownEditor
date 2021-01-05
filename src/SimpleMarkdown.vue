<template>
    <div class="simple-markdown" id="markdown_editor">
        <!-- Toolbar -->
        <Toolbar :disabledTools="disabledTools" v-on:action="executeToolCallback"></Toolbar>
        <!-- Field -->
        <div class="editor" ref="editor">
            <textarea class="simple-markdown__field ml-10" v-bind:style="fetchEditorFreeSpace" ref="field" v-on:change="saveTextareaHistory()" v-model="content">
                
            </textarea>
            <section class="preview" v-if="preview">
                <EditorSeparrator v-on:changeDelta="changeEditorPreviewWidth" ref="separrator"></EditorSeparrator>
                <div class="editor__preview ml-10">
                    <span v-html="convertContentToHTML"></span>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import {markdown} from 'markdown';
    import Toolbar from './Toolbar.vue';
    import EditorSeparrator from './EditorSeparrator.vue';

    export default {
        name: 'SimpleMarkdown',
        props: {
            disabledTools: {
                type: Array,
                default: () => []
            },
            autoSave: {
                type: Number,
                default: () => 5000
            },
            resize: {
                type: Boolean,
                default: () => true
            },
            preview: {
                type: Boolean,
                default: () => true
            }
        },
        data() {
            return {
                content: '',
                editorAreaWidth: NaN,
                parentWidth: NaN,
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
            this.editorAreaWidth = this.preview ? 50 : 100;

            if (isNaN(this.autoSave))
                return;

            setTimeout(() => {
                this.saveTextareaHistory();
            }, this.autoSave);

            // Init base events
            this.getEditorWidth();
            
            window.addEventListener('resize', () => {
                this.getEditorWidth();
            });
        },
        methods: {
            getEditorWidth() {
                this.parentWidth = this.$refs.editor.clientWidth;
            },

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
            changeEditorPreviewWidth(delta) {
                const deltaPercent = (100 * delta) / this.parentWidth; 

                if (this.editorAreaWidth + deltaPercent < 30)
                {
                    this.$refs.separrator.blockMove();
                    return;
                }

                this.editorAreaWidth += deltaPercent;
            },

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
            },

            fetchEditorFreeSpace: function () {
                return {
                    minWidth: `${this.editorAreaWidth}%`
                }
            },

            convertContentToHTML: function () {
                return markdown.toHTML(this.content);
            }
        },
        components: {
            Toolbar,
            EditorSeparrator
        }
    }
</script>

<style scoped>
    textarea {
        font-family: inherit;
        font-size: inherit;
    }

    .simple-markdown {
        background-color: #ffffff;
        border-radius: 10px;
    }

    .ml-10 {
        margin-left: 10px;
    }

    .preview {
        display: flex;
    }

    .simple-markdown__field, .editor__preview {
        margin-top: 20px;
    }

    .editor__preview > p {
        margin: 0px;
        padding: 0px;
    }

    .simple-markdown__field {
        resize: none;
        border: none;
        outline: none;
        width: 50%;
        padding: 0px;
    }

    .editor__preview {
        word-break: break-all;
    }

    .editor {
        display: flex;
        flex-direction: row;
        position: relative;
        height: calc(100vh - 70px);
    }
</style>