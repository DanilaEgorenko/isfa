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
        path: ERoutes.SHARES,
        loadChildren: () =>
            import("./pages/shares-page/shares-page.module").then(
                (m) => m.SharesPageModule
            ),
    },
    {
        path: ERoutes.ETFS,
        loadChildren: () =>
            import("./pages/etf-page/etf-page.module").then(
                (m) => m.EtfPageModule
            ),
    },
    {
        path: ERoutes.BONDS,
        loadChildren: () =>
            import("./pages/bonds-page/bonds-page.module").then(
                (m) => m.BondsPageModule
            ),
    },
    {
        path: ERoutes.FUTURES,
        loadChildren: () =>
            import("./pages/futures-page/futures-page.module").then(
                (m) => m.FuturesPageModule
            ),
    },
    {
        path: ERoutes.OPTIONS,
        loadChildren: () =>
            import("./pages/options-page/options-page.module").then(
                (m) => m.OptionsPageModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
