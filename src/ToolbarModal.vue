<template>
    <section class="toolbar-modal toolbar-modal--position">
        <header class="toolbar-modal__header">
            <h3>{{ headerName }}</h3>
            <hr>
        </header>
        <body class="toolbar-modal__body">
            <slot></slot>
            <div class="toolbar-modal__actions">
                <button v-on:click="okCallback" class="button button-done">OK</button>
                <button v-on:click="closeModal" class="button button-close">Close</button>
            </div>
        </body>
    </section>
</template>

<script>
    export default {
        props: {
            headerName: {
                type: String, 
                required: true
            },
            okCallback: {
                type: Function,
                required: false,
                default: () => null
            }
        },
        methods: {
            closeModal() {
                this.$emit('closeModal');
            }
        }
    }
</script>

<style>
    p, h3 {
        margin: 0px;
        padding: 0px;
    }

    .toolbar-modal {
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        background-color: #ffffff;
        border: 2px solid #F2F4F5;
        padding: 20px 15px;
        -webkit-box-shadow: 1px 0px 29px 0px rgba(33, 42, 49, 0.2);
        -moz-box-shadow: 1px 0px 29px 0px rgba(33, 42, 49, 0.2);
        box-shadow: 1px 0px 29px 0px rgba(33, 42, 49, 0.2);
    }

    .toolbar-modal__body {
        margin: 0px;
        padding: 0px;
    }

    .toolbar-modal--position {
        position: fixed;
        top: 25%;
        z-index: 9999;
        width: 35%;
        left: 0px;
        right: 0px;
        margin: 0px auto;
    }

    .button {
        padding: 10px 13px;
        border: none;
        cursor: pointer;
        margin-top: 10px;
        outline: none;
    }

    .button:nth-child(2) {
        margin-left: 10px;
    }

    .button-done {
        background-color: #F2F4F5;
    }

    .button-close {
        background-color: #e65050;
    }
</style>