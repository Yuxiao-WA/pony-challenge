import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameState, GameStateEnum, MazeState, MoveDirection, WallEdge } from '../interfaces';
import { PonyMazeService } from '../pony-maze.service';

const SERVER = 'https://ponychallenge.trustpilot.com';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss']
})
export class MazeComponent implements OnInit, AfterViewInit {
  maze!: MazeState;
  game_state!: GameState;
  moveDirection = MoveDirection;
  game_result_img = "";
  cell_size = 30;
  current_pony_position = 0;
  current_domokun_position = 0;

  @ViewChild('maze_canvas') canvas!: ElementRef<HTMLCanvasElement>;

  public ctx!: CanvasRenderingContext2D;

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
  }

  ngAfterViewInit(): void {
    this.ctx = <CanvasRenderingContext2D>this.canvas.nativeElement.getContext('2d');
    if (this.maze) {
      this.drawMaze();
    }
  }

  drawMaze() {
    // draw the cells
    this.ctx.lineWidth = 2;
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.strokeStyle = '#3F51B5';
    const maze_width = this.maze.size[0];
    const maze_height = this.maze.size[1];
    for (let i = 0; i < this.maze.data.length; i++) {
      const cell_row = Math.floor(i / maze_width);
      const cell_col = i % maze_width;
      if (cell_col === maze_width - 1) {
        this.maze.data[i].push(WallEdge.East);
      }
      if (cell_row === maze_height - 1) {
        this.maze.data[i].push(WallEdge.South);
      }
      this.ctx.fillRect(
        cell_col * this.cell_size,
        cell_row * this.cell_size,
        (cell_col + 1) * this.cell_size,
        (cell_row + 1) * this.cell_size
      );
      if (this.maze.data[i].includes(WallEdge.North)) {
        this.ctx.beginPath();
        this.ctx.moveTo(cell_col * this.cell_size, cell_row * this.cell_size);
        this.ctx.lineTo((cell_col + 1) * this.cell_size, cell_row * this.cell_size);
        this.ctx.stroke();
      }
      if (this.maze.data[i].includes(WallEdge.East)) {
        this.ctx.beginPath();
        this.ctx.moveTo((cell_col + 1) * this.cell_size, cell_row * this.cell_size);
        this.ctx.lineTo(
          (cell_col + 1) * this.cell_size,
          (cell_row + 1) * this.cell_size
        );
        this.ctx.stroke();
      }
      if (this.maze.data[i].includes(WallEdge.South)) {
        this.ctx.beginPath();
        this.ctx.moveTo(
          (cell_col + 1) * this.cell_size,
          (cell_row + 1) * this.cell_size
        );
        this.ctx.lineTo(cell_col * this.cell_size, (cell_row + 1) * this.cell_size);
        this.ctx.stroke();
      }
      if (this.maze.data[i].includes(WallEdge.West)) {
        this.ctx.beginPath();
        this.ctx.moveTo(cell_col * this.cell_size, (cell_row + 1) * this.cell_size);
        this.ctx.lineTo(cell_col * this.cell_size, cell_row * this.cell_size);
        this.ctx.stroke();
      }
    }
    this.ctx.font = '20px verdana';
    this.ctx.fillStyle = '#27a12f'
    this.ctx.fillText(
      'E',
      this.maze["end-point"][0] % maze_width * this.cell_size + 10,
      Math.floor(this.maze["end-point"][0] / maze_width) * this.cell_size + 20
    );

    this.updateCanvas(this.maze.pony[0], this.maze.domokun[0]);
  }

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

  movePony(direction: MoveDirection) {
    this.mazeService.movePony(this.maze.maze_id, direction).subscribe(state => {
      this.game_state = state;
      if (this.game_state["hidden-url"]) {
        this.game_result_img = SERVER + this.game_state["hidden-url"];
      }
      this.mazeService.getMazeState(this.maze.maze_id).subscribe(maze => {
        this.maze = maze;
        this.updateCanvas(this.maze.pony[0], this.maze.domokun[0]);
      });
    });
  }

  updateCanvas(pony: number, domokun: number) {
    const maze_width = this.maze.size[0];

    if (this.current_pony_position !== 0) {
      // Small number adjustment to not to remove the walls
      this.ctx.clearRect(
        this.current_pony_position % maze_width * this.cell_size + 1,
        Math.floor(this.current_pony_position / maze_width) * this.cell_size + 1,
        this.cell_size - 2,
        this.cell_size - 2
      );
      this.ctx.clearRect(
        this.current_domokun_position % maze_width * this.cell_size + 1,
        Math.floor(this.current_domokun_position / maze_width) * this.cell_size + 1,
        this.cell_size - 2,
        this.cell_size - 2
      );
    }

    this.ctx.fillStyle = '#db65d1' //pink
    // number adjustment to fill the text in the center of the cell
    this.ctx.fillText(
      'P',
      pony % maze_width * this.cell_size + 10,
      Math.floor(pony / maze_width) * this.cell_size + 20
    );
    this.current_pony_position = pony;

    this.ctx.fillStyle = '#632e2e' //brown
    this.ctx.fillText(
      'D',
      domokun % maze_width * this.cell_size + 10,
      Math.floor(domokun / maze_width) * this.cell_size + 20
    );
    this.current_domokun_position = domokun;
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
