<template>
    <div class="inline-flex">
        <img :src="menuItemSrc" />
        <span>{{ menuName }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            menuItemName: String,
            menuItemSrc: String,
        },
        setup() {
            
        },
    }
</script>