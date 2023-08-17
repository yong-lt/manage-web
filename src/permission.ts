import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from "./router/index";
import { Local } from "./utils/storage";
import { USER_INFO } from "./stores/constant/cacheKey";
import { usePermission } from "./stores/permission";

NProgress.configure({ showSpinner: false });

const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
    NProgress.start();

    const permission = usePermission();

    const hasToken = Local.get(USER_INFO)?.token;

    if (hasToken) {
        if (to.path === "/login") {
            next({ path: "/" });
            NProgress.done();
        } else {
            if (permission.getRouter.length) {
                next();
            } else {
                try {
                    await usePermission().generateRoutes();
                    next({ ...to, replace: true });
                } catch (error) {
                    next({ path: "/login" });
                    NProgress.done();
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next("/login");
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    NProgress.done();
});
