import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "main",
    },
    {
        path: "main",
        loadChildren: () =>
            import("./pages/main-page/main-page.module").then(
                (m) => m.MainPageModule
            ),
    },
    {
        path: "profile",
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
