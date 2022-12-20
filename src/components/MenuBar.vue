<template>
    <div class="flex flex-col">
        <Icon />
        <MenuBarItem 
        v-for="menuItem in items" 
        :key="menuItem.id"    
        :menuItemName="menuItem.name"
        :menuItemSrc="menuItem.icon"  />

    </div>
</template>

<script>
    import Icon from "../assets/cursor-arrow-ripple.svg"
    
    import MenuBarItem from '@/components/MenuBarItem.vue'

    export default {
        components: {
            Icon,
            MenuBarItem,
        },  
        data() {
            return {
                items: [
                    {
                        id: 1,
                        name: "bookmark",
                        title: "Bookmark",
                        icon: "@/assets/bookmark.svg"
                    },
                    {
                        id: 2,
                        name: "sign-in",
                        title: "Sign In",
                        icon: "@/assets/sign-in.svg"
                    }
                ]
            }
        },
        setup() {
            
        },
    }
</script>