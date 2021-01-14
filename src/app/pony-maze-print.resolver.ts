import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { PonyMazeService } from './pony-maze.service';

@Injectable({
  providedIn: 'root'
})
export class PonyMazePrintResolver implements Resolve<string> {
  constructor(private service: PonyMazeService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    return this.service.getMazePrint(<string>route.paramMap.get('maze_id'));;
  }
}
