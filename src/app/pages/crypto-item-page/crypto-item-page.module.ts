import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ChartModule } from "@app/components/chart/chart.module";
import { UserRatingModule } from "@app/components/user-rating/user-rating.module";
import { CryptoItemPageComponent } from "./crypto-item-page.component";

const routes = [{ path: "", component: CryptoItemPageComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        UserRatingModule,
        ChartModule,
    ],
    declarations: [CryptoItemPageComponent],
})
export class CryptoItemPageModule {}
