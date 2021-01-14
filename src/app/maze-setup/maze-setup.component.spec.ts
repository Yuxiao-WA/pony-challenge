import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatOption } from '@angular/material/core/option';
import { MatSelect } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { By } from 'protractor';
import { MaterialModule } from '../material/material.module';

import { MazeSetupComponent } from './maze-setup.component';

describe('MazeSetupComponent', () => {
  let component: MazeSetupComponent;
  let fixture: ComponentFixture<MazeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MazeSetupComponent],
      imports: [
        HttpClientModule,
        MaterialModule,
        RouterModule.forRoot([]),
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default maze setup', () => {
    expect(component.selectedPony).toEqual('Twilight Sparkle');
    expect(component.maze_height).toEqual(15);
    expect(component.maze_width).toEqual(15);
    expect(component.difficulty).toEqual(0);
  });
});
