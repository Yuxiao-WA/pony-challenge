import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameState, GameStateEnum, MazeState, MoveDirection } from '../interfaces';
import { PonyMazeService } from '../pony-maze.service';

const SERVER = 'https://ponychallenge.trustpilot.com';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss']
})
export class MazeComponent implements OnInit {
  maze!: MazeState;
  maze_print!: string;
  game_state!: GameState;
  moveDirection = MoveDirection;
  game_result_img = "";

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.movePony(MoveDirection.North);
        break;
      case 'ArrowDown':
        this.movePony(MoveDirection.South);
        break;
      case 'ArrowLeft':
        this.movePony(MoveDirection.West);
        break;
      case 'ArrowRight':
        this.movePony(MoveDirection.East);
        break;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private mazeService: PonyMazeService
  ) { }

  ngOnInit(): void {
    this.maze = this.route.snapshot.data['maze'];
    if (this.maze) {
      this.game_state = this.maze["game-state"];
      if (this.game_state["hidden-url"]) {
        this.game_result_img = SERVER + this.game_state["hidden-url"];
      }
    }
    this.maze_print = this.route.snapshot.data['maze_print'];
  }

  movePony(direction: MoveDirection) {
    this.mazeService.movePony(this.maze.maze_id, direction).subscribe(state => {
      this.game_state = state;
      if (this.game_state["hidden-url"]) {
        this.game_result_img = SERVER + this.game_state["hidden-url"];
      }
      this.mazeService.getMazePrint(this.maze.maze_id).subscribe(print => this.maze_print = print);
      this.mazeService.getMazeState(this.maze.maze_id).subscribe(maze => this.maze = maze);
    });
  }

  isGameOver(): boolean {
    return this.game_state && this.game_state.state.toLowerCase() !== GameStateEnum.Active;
  }

  isPonyEastWall(): boolean {
    return this.maze &&
      (this.maze.pony[0] % this.maze.size[0] === this.maze.size[0] - 1 ||
        this.maze.data[this.maze.pony[0] + 1].indexOf(MoveDirection.West) !== -1);
  }

  isPonyWestWall(): boolean {
    return this.maze &&
      (this.maze.pony[0] % this.maze.size[0] === 0 ||
        this.maze.data[this.maze.pony[0]].indexOf(MoveDirection.West) !== -1);
  }

  isPonyNorthWall(): boolean {
    return this.maze &&
      (this.maze.pony[0] < this.maze.size[0] ||
        this.maze.data[this.maze.pony[0]].indexOf(MoveDirection.North) !== -1);
  }

  isPonySouthWall(): boolean {
    return this.maze &&
      (this.maze.pony[0] > (this.maze.data.length - this.maze.size[0]) ||
        this.maze.data[this.maze.pony[0] + this.maze.size[0]].indexOf(MoveDirection.North) !== -1);
  }

}
