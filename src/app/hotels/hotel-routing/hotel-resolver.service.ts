import { HotelsService, Hotel } from 'app/shared/hotels.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Resolve } from '@angular/router/src/interfaces';

@Injectable()
export class HotelResolverService implements Resolve<Hotel> {

  constructor(
    private hs: HotelsService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<Hotel> {
    let id = route.params['id'];

    return this.hs.get(id).first().toPromise().then(hotel => {
      if (hotel) {
        return hotel;
      } else {
        this.router.navigate(['/hotels'])
        return null;
      }
    });
  }
}
