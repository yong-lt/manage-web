import { useDark, useToggle } from "@vueuse/core";
import { useConfig } from "@/stores/config";

const isDark = useDark({
    onChanged(dark: boolean) {
        const config = useConfig();
        updateHtmlDarkClass(dark);
        config.setLayout("isDark", dark);
    },
});
const toggleDark = useToggle(isDark);

export function updateHtmlDarkClass(val: boolean) {
    const htmlEl = document.getElementsByTagName("html")[0];
    if (val) {
        htmlEl.setAttribute("class", "dark");
    } else {
        htmlEl.setAttribute("class", "");
    }
}

export default toggleDark;
