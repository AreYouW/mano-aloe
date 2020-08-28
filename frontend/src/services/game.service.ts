import {Subject} from 'rxjs'

export class GameService {
    public selectedGame: Subject<URL> = new Subject<URL>();

    public selectGame(gameURL: URL) {
        this.selectedGame.next(gameURL);
    }
}