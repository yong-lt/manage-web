import { defineStore } from "pinia";
import { WEB_CONFIG } from "./constant/cacheKey";
import { reactive } from "vue";
import { Layout } from "./interface";

export const useConfig = defineStore(
    "config",
    () => {
        const layout = reactive<Layout>({
            // "Default" | "Streamline";
            layoutMode: "Default",
            // 是否水平折叠收起菜单
            menuCollapse: false,
            // 是否暗黑模式
            isDark: false,
            // 默认布局菜单宽度
            menuWidth: 260,
            // 配置抽屉
            showDrawer: false,
            // 菜单文字颜色
            menuColor: ["#303133", "#CFD3DC"],
            // 侧边菜单激活项背景色
            menuActiveBackground: ["#ffffff", "#1d1e1f"],
            // 侧边菜单激活项文字色
            menuActiveColor: ["#409eff", "#3375b9"],
            // 顶栏菜单栏 文字色
            headerBarTabColor: ["#000000", "#CFD3DC"],
            // 顶栏菜单栏 背景色
            headerBarBackground: ["#ffffff", "#1d1e1f"],
            // 顶栏菜单栏 悬停时背景色
            headerBarHoverBackground: ["#f5f5f5", "#18222c"],
        });

        // 修改配置
        const setLayout = (name: keyof Layout, value: any) => {
            layout[name] = value as never;
        };

        // 获取顶栏菜单配置
        const getColorVal = function (name: keyof Layout): string {
            const colors = layout[name] as string[];
            if (layout.isDark) {
                return colors[1];
            } else {
                return colors[0];
            }
        };

        // 设置布局方式
        const setLayoutMode = (mode: string) => {
            layout.layoutMode = mode;
        };

        const getMenuWidth = () => {
            return layout.menuCollapse ? "64px" : layout.menuWidth + "px";
        };

        return {
            layout,
            setLayout,
            getColorVal,
            setLayoutMode,
            getMenuWidth,
        };
    },
    {
        persist: {
            key: WEB_CONFIG,
        },
    }
);
