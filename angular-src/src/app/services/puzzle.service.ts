import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
@Injectable()
export class PuzzleService {
    authToken: any;
    environment = environment;
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {

    }

    saveResults(puzzleResults) {
        this.authService.loadToken();
        this.authService.getUser();
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: this.authService.authToken,
                'Content-Type': 'application/json'
            })
        };
        // tslint:disable-next-line:no-unused-expression
        return this.http.post('http://localhost:9898/puzzles/add', puzzleResults, httpOptions)
            .pipe(
                map((res: any) => {
                    return res;
                })
            );
    }
    getResults() {
        this.authService.loadToken();
        this.authService.getUser();
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: this.authService.authToken,
                'Content-Type': 'application/json'
            })
        };
        // tslint:disable-next-line:no-unused-expression
        return this.http.get('http://localhost:9898/puzzles/' + this.authService.user.id, httpOptions);
    }


    getAllResults() {
        this.authService.loadToken();
        this.authService.getUser();
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: this.authService.authToken,
                'Content-Type': 'application/json'
            })
        };
        return this.http.get('http://localhost:9898/puzzles/', httpOptions);
    }
}
