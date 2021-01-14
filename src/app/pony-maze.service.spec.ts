import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoveDirection } from './interfaces';

import { PonyMazeService } from './pony-maze.service';

describe('PonyMazeService', () => {
  let service: PonyMazeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
    service = TestBed.inject(PonyMazeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should trigger server interface', async(() => {
    service.createMaze(15, 15, 'Twilight Sparkle', 0).subscribe(maze => {
      expect(maze).toBeTruthy();
      service.movePony(maze.maze_id, MoveDirection.Stay).subscribe(move => {
        expect(move).toBeTruthy();
      });
    });
  }));

});
