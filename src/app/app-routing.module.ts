import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MazeSetupComponent } from './maze-setup/maze-setup.component';
import { MazeComponent } from './maze/maze.component';
import { PonyMazeResolver } from './pony-maze.resolver';

const routes: Routes = [
  { path: 'home', component: MazeSetupComponent },
  { path: 'maze/:maze_id', component: MazeComponent, resolve: { maze: PonyMazeResolver } },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
