<template>
    <div class="simple-markdown" id="markdown_editor">
        <!-- Toolbar -->
        <Toolbar :disabledTools="disabledTools" v-on:action="executeToolCallback"></Toolbar>
        <!-- Field -->
        <textarea class="simple-markdown__field" ref="field" v-on:change="saveTextareaHistory()" v-model="content">
            
        </textarea>
    </div>
</template>

<script>
    import Toolbar from './Toolbar.vue';

    export default {
        name: 'SimpleMarkdown',
        props: ['disabledTools'],
        data() {
            return {
                content: ''
            }
        },
        created() {
            this.historyStack = [];
            this.currentIndexHistoryStack = 0;
        },
        mounted() {
            setTimeout(() => {
                this.saveTextareaHistory();
            }, 5000);
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
            Toolbar
        }
    }
</script>

<style scoped>
    .simple-markdown {
        width: 45%;
        background-color: #eff3f7;
        border-radius: 5px;
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