import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PonyMazeService } from '../pony-maze.service';

@Component({
  selector: 'app-maze-setup',
  templateUrl: './maze-setup.component.html',
  styleUrls: ['./maze-setup.component.scss']
})
export class MazeSetupComponent implements OnInit {
  ponies = [
    'Twilight Sparkle',
    'Pinkie Pie',
    'Fluttershy',
    'Rainbow Dash',
    'Applejack',
    'Princess Celestia',
    'Rarity',
    'Princess Luna',
    'Spike'
  ];
  selectedPony = this.ponies[0];
  maze_width = 15;
  maze_height = 15;
  difficulty = 0;

  constructor(
    private maze_service: PonyMazeService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    this.maze_service
      .createMaze(this.maze_width, this.maze_height, this.selectedPony, this.difficulty)
      .subscribe(
        maze => this.router.navigate(['maze/' + maze.maze_id])
      );
  }

}
