import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { MazeState } from './interfaces';
import { PonyMazeService } from './pony-maze.service';

@Injectable({
  providedIn: 'root'
})
export class PonyMazeResolver implements Resolve<MazeState> {
  constructor(private service: PonyMazeService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MazeState> {
    return this.service.getMazeState(<string>route.paramMap.get('maze_id'));
  }
}
