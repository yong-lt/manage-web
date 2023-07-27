<script lang="ts">
import { createVNode, resolveComponent, defineComponent, computed, CSSProperties } from "vue";
export default defineComponent({
    name: "Icon",
    props: {
        name: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            default: "18px",
        },
        color: {
            type: String,
            default: "#000000",
        },
    },
    setup(props) {
        const iconStyle = computed((): CSSProperties => {
            const { size, color } = props;
            let s = `${size.replace("px", "")}px`;
            return {
                fontSize: s,
                color: color,
            };
        });

        return () => createVNode("el-icon", { class: "icon el-icon", style: iconStyle.value }, [createVNode(resolveComponent(props.name))]);
    },
});
</script>
