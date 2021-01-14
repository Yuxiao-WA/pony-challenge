import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { GameStateEnum, MoveDirection } from '../interfaces';
import { MaterialModule } from '../material/material.module';

import { MazeComponent } from './maze.component';

describe('MazeComponent', () => {
  let component: MazeComponent;
  let fixture: ComponentFixture<MazeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MazeComponent],
      imports: [
        HttpClientModule,
        RouterModule.forRoot([]),
        MaterialModule

      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide maze and game buttons when game ends', () => {
    component.game_state = {
      state: GameStateEnum.Over,
      "state-result": ""
    };
    fixture.detectChanges();
    let maze = fixture.nativeElement.querySelector('textarea');
    let action_button = fixture.nativeElement.querySelector('#action_buttons');
    expect(maze).toBeNull();
    expect(action_button).toBeNull();
  });

  it('should be able to trigger move north with keyboard arrow up', () => {
    const event: Event = new KeyboardEvent('keydown', {
      'key': 'ArrowUp'
    });
    spyOn(component, 'movePony');
    document.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.movePony).toHaveBeenCalledWith(MoveDirection.North);
  });

  it('should be able to trigger move south with keyboard arrow down', () => {
    const event: Event = new KeyboardEvent('keydown', {
      'key': 'ArrowDown'
    });
    spyOn(component, 'movePony');
    document.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.movePony).toHaveBeenCalledWith(MoveDirection.South);
  });

  it('should be able to trigger move west with keyboard arrow left', () => {
    const event: Event = new KeyboardEvent('keydown', {
      'key': 'ArrowLeft'
    });
    spyOn(component, 'movePony');
    document.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.movePony).toHaveBeenCalledWith(MoveDirection.West);
  });

  it('should be able to trigger move east with keyboard arrow right', () => {
    const event: Event = new KeyboardEvent('keydown', {
      'key': 'ArrowRight'
    });
    spyOn(component, 'movePony');
    document.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.movePony).toHaveBeenCalledWith(MoveDirection.East);
  });
});
