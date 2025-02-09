import { Injectable } from "@angular/core";
import { IProfile } from "@app/interfaces";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ProfileService {
    profiles$: Observable<IProfile[]> = of([
        {
            name: "Danila",
            pic: "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg",
            status: "Главный тут",
            rating: 0,
            id: 1,
            favorites: [],
            trand_activities: [],
        },
    ]);

    getData(id: number) {
        return this.profiles$.pipe(
            map((data) => data.find((el) => el.id === id))
        );
    }
}
