<script lang="ts">
import { defineComponent, createVNode, reactive } from "vue";
import { ElTableColumn } from "element-plus";
export default defineComponent({
    name: "Column",
    props: {
        attr: {
            type: Object,
            required: true,
        },
    },
    setup(props, { slots }) {
        const attr = reactive(props.attr);
        return () => {
            return createVNode(ElTableColumn, attr, slots.default);
        };
    },
});
</script>
