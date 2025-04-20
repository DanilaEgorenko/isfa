import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoadSpinnerModule } from "@app/components/load-spinner/load-spinner.module";
import { EditPageComponent } from "./edit-page.component";

const routes = [{ path: "", component: EditPageComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        LoadSpinnerModule,
    ],
    declarations: [EditPageComponent],
})
export class EditPageModule {}
