import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MazeState, MoveDirection, GameState } from './interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar';


const URL = 'https://ponychallenge.trustpilot.com/pony-challenge/maze';
interface Maze {
  maze_id: string
}
const configSnackBar = new MatSnackBarConfig();
configSnackBar.verticalPosition = "bottom";
configSnackBar.horizontalPosition = "center";
configSnackBar.duration = 2500;

@Injectable({
  providedIn: 'root'
})
export class PonyMazeService {

  constructor(
    private http: HttpClient,
    public snackbar: MatSnackBar
  ) { }

  private handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      this.snackbar.open(error.message, '', configSnackBar);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  createMaze(maze_width: number, maze_height: number, pony_name: string, difficulty: number): Observable<Maze> {
    return this.http.post<Maze>(URL, {
      "maze-width": maze_width,
      "maze-height": maze_height,
      "maze-player-name": pony_name,
      "difficulty": difficulty
    }).pipe(
      catchError(this.handleError)
    );
  }

  getMazeState(maze_id: string): Observable<MazeState> {
    return this.http.get<MazeState>(URL + '/' + maze_id).pipe(catchError(this.handleError));
  }

  movePony(maze_id: string, direction: MoveDirection): Observable<GameState> {
    return this.http.post<GameState>(URL + '/' + maze_id, {
      'direction': direction
    }).pipe(catchError(this.handleError));
  }

  getMazePrint(maze_id: string): Observable<string> {
    return this.http.get<string>(URL + '/' + maze_id + '/print', { responseType: 'text' as 'json' }).pipe(catchError(this.handleError));
  }

}
