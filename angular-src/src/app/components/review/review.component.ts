import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PuzzleService } from '../../services/puzzle.service';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
    results = [];
    constructor(
        private authService: AuthService,
        private puzzleService: PuzzleService,
    ) { }

    ngOnInit() {
        this.getAllResults();
    }

    getAllResults() {
        this.puzzleService.getAllResults()
            .subscribe((res: any) => {
                console.log(res.data);

                this.results = res.data;
            }, (err) => {
                console.log(err);
            });
    }
}
