import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RegistrationPageComponent } from "./registration-page.component";

const routes = [{ path: "", component: RegistrationPageComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [RegistrationPageComponent],
})
export class RegistationPageModule {}
