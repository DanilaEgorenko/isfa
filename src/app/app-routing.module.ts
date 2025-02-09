import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ERoutes } from "./enums";

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: ERoutes.MAIN,
    },
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
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
