<template>
    <div class="simple-markdown" id="markdown_editor">
        <!-- Toolbar -->
        <Toolbar :disabledTools="disabledTools" v-on:action="executeToolCallback" :show="!fullscreen"></Toolbar>
        <!-- Field -->
        <div class="editor" ref="editor">
            <textarea class="simple-markdown__field" v-bind:style="fetchEditorFreeSpace" ref="field" v-on:change="saveTextareaHistory()" v-model="content">
                
            </textarea>
            <section class="preview" v-if="preview">
                <EditorSeparrator v-on:changeDelta="changeEditorPreviewWidth" :resize="resize" ref="separrator"></EditorSeparrator>
                <div class="editor__preview ml-10" v-html="convertContentToHTML"></div>
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
            },
            defaultContent: {
                type: String,
                default: () => ''
            }
        },
        data() {
            return {
                content: '',
                editorAreaWidth: NaN,
                parentWidth: NaN,
                modalsVisible: {
                    information: false
                },
                fullscreen: false
            }
        },
        created() {
            this.historyStack = [];
            this.currentIndexHistoryStack = 0;
        },
        mounted() {
            this.editorAreaWidth = this.preview ? 50 : 100;
            this.content = this.defaultContent;

            if (isNaN(this.autoSave))
                return;

            setInterval(() => {
                this.saveTextareaHistory();
            }, this.autoSave);

            // Init base events
            this.getEditorWidth();
            
            window.addEventListener('resize', () => {
                this.getEditorWidth();
            });
        },
        methods: {
            /*
                Public functions
            */
            toHTML() {
                return markdown.toHTML(this.content);
            },

            toMarkdown() {
                return this.content;
            },

            setContent(content) {
                this.content = content;
            },

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
                const substring = additionalSymbols + `${this.selectedText}` + additionalSymbols;

                this.insertAtCursor(substring);
                this.saveTextareaHistory();
            },

            applyHeading(symbols) {
                this.insertAtCursor(`${symbols}`);
                this.saveTextareaHistory();
            },

            insertAtCursor(val) {
                if (this.$refs.field.selectionStart || this.$refs.field.selectionStart == '0') {
                    const startPos = this.$refs.field.selectionStart;
                    const endPos = this.$refs.field.selectionEnd;

                    this.content = this.content.substring(0, startPos)
                        + val
                        + this.content.substring(endPos, this.content.length);
                } else {
                    this.content += val;
                }
            },

            changeCase(toCase) {
                let updatedContent = this.selectedText;

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
                this.saveTextareaHistory();
            },

            switchVariableState(variable) {
                this[variable] = !this[variable];
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
                return this.historyStack[this.currentIndexHistoryStack] ?? '';
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
                return markdown.toHTML(this.content ?? '');
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
        padding: 0px;
        height: calc(100vh - 98px);
    }

    .editor__preview {
        word-break: break-all;
        overflow-y: auto;
    }

    .editor {
        display: flex;
        flex-direction: row;
        position: relative;
        height: calc(100vh - 98px);
    }
</style>