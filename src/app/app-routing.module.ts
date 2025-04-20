import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ERoutes } from "./enums";

export const routes: Routes = [
    {
        path: ERoutes.MAIN,
        loadChildren: () =>
            import("./pages/main-page/main-page.module").then(
                (m) => m.MainPageModule
            ),
    },
    {
        path: ERoutes.EDIT,
        loadChildren: () =>
            import("./pages/edit-page/edit-page.module").then(
                (m) => m.EditPageModule
            ),
    },
    {
        path: ERoutes.LOGIN,
        loadChildren: () =>
            import("./pages/login-page/login-page.module").then(
                (m) => m.LoginPageModule
            ),
    },
    {
        path: ERoutes.REGISTRATION,
        loadChildren: () =>
            import("./pages/registration-page/registration-page.module").then(
                (m) => m.RegistationPageModule
            ),
    },
    {
        path: ERoutes.PROFILE,
        loadChildren: () =>
            import("./pages/profile-page/profile-page.module").then(
                (m) => m.ProfilePageModule
            ),
    },
    {
        path: ERoutes.COLLECTION,
        loadChildren: () =>
            import("./pages/collection-page/collection-page.module").then(
                (m) => m.CollectionPageModule
            ),
    },
    {
        path: ERoutes.CRYPTO,
        loadChildren: () =>
            import("./pages/crypto-page/crypto-page.module").then(
                (m) => m.CryptoPageModule
            ),
    },
    {
        path: ERoutes.SHARE,
        loadChildren: () =>
            import("./pages/items-page/items-page.module").then(
                (m) => m.ItemsPageModule
            ),
    },
    {
        path: ERoutes.ETF,
        loadChildren: () =>
            import("./pages/items-page/items-page.module").then(
                (m) => m.ItemsPageModule
            ),
    },
    {
        path: ERoutes.BOND,
        loadChildren: () =>
            import("./pages/items-page/items-page.module").then(
                (m) => m.ItemsPageModule
            ),
    },
    {
        path: ERoutes.OPTION,
        loadChildren: () =>
            import("./pages/items-page/items-page.module").then(
                (m) => m.ItemsPageModule
            ),
    },
    {
        path: ERoutes.FUTURE,
        loadChildren: () =>
            import("./pages/items-page/items-page.module").then(
                (m) => m.ItemsPageModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
