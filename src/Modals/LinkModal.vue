<template>
    <ToolbarModal headerName="Set a link">
        <p>Enter a link bottom</p>
        <form>
            <p><input type="text"></p>
            <p><input type="text"></p>
        </form>
    </ToolbarModal>
</template>

<script>
    import ToolbarModal from '../ToolbarModal.vue';

    export default {
        name: 'LinkModal',
        components: {
            ToolbarModal
        }
    }
</script>