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
        path: ERoutes.PROFILE,
        loadChildren: () =>
            import("./pages/profile-page/profile-page.module").then(
                (m) => m.ProfilePageModule
            ),
    },
    {
        path: ERoutes.CRYPTO,
        loadChildren: () =>
            import("./pages/crypto-page/crypto-page.module").then(
                (m) => m.CryptoPageModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
