
export interface GameState {
    state: GameStateEnum;
    'state-result': string;
    'hidden-url'?: string;
}

export enum GameStateEnum {
    Won = 'won',
    Over = 'over',
    Active = 'active'
}

export interface MazeState {
    pony: Array<number>,
    domokun: Array<number>,
    data: Array<Array<string>>,
    'end-point': Array<number>,
    difficulty: number,
    size: Array<number>,
    'game-state': GameState,
    maze_id: string
}

export enum MoveDirection {
    East = 'east',
    West = 'west',
    South = 'south',
    North = 'north',
    Stay = 'stay'
}

export enum WallEdge {
    East = 'east',
    West = 'west',
    South = 'south',
    North = 'north'
}




