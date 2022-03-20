<template>
    <section v-if="toys">
        <draggable @end="setToysOrder" v-model="toys" item-key="_id">
            <template #item="{ element }">
                <toy-preview class="toy-card" @toy-remove="removeToy" :toy="element"></toy-preview>
            </template>
        </draggable>
    </section>
</template>

<script>
import toyPreview from "./toy-preview.vue";
import draggable from 'vuedraggable';

export default {
    props: {
        toys: Array
    },
    data() {
        return {
            drag: false
        }
    },
    components: {
        toyPreview,
        draggable
    },
    methods: {
        removeToy(toyId) {
            this.$emit('toy-remove', toyId)
        },
        setToysOrder() {
            
        }
    }
}
</script>