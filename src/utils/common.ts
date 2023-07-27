import type { App } from 'vue'
import * as elIcons from '@element-plus/icons-vue'
import Icon from '@/components/icon/index.vue'

export function registerIcons(app: App) {
    /*
     * 全局注册 Icon
     * 使用方式: <Icon name="name" size="size" color="color" />
     */
    app.component('Icon', Icon)

    /*
     * 全局注册element Plus的icon
     */
    const icons = elIcons as any
    for (const i in icons) {
        app.component(icons[i].name, icons[i])
    }
}