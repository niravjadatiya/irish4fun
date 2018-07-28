import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PuzzleService } from '../../services/puzzle.service';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
    puzzle1: any;
    puzzle2: any;
    constructor(
        private validateService: ValidateService,
        private flashMessage: FlashMessagesService,
        private authService: AuthService,
        private puzzleService: PuzzleService,
    ) { }

    ngOnInit() {
        this.getResults();

    }
    // getting results if already added
    getResults() {
        this.puzzleService.getResults()
        .subscribe((res: any) => {
            this.puzzle1 = res.puzzle1;
            this.puzzle2 = res.puzzle2;
        }, (err) => {
            console.log(err);
        });
    }

    onClickAddResult() {
        const puzzleResults = {
            puzzle1: this.puzzle1,
            puzzle2: this.puzzle2,
            userId: this.authService.user.id
        };

        // Required Fields
        if (!this.validateService.validatePuzzels(puzzleResults)) {
            this.flashMessage.show('Please fill in all fields', {
                cssClass: 'alert-danger',
                timeout: 5000
            });
            return false;
        }

        // Validate Email
        if (!this.validateService.validatePuzzelOne(puzzleResults)) {
            this.flashMessage.show('Please enter valid value', {
                cssClass: 'alert-danger',
                timeout: 5000
            });
            return false;
        }

        // Register user
        this.puzzleService.saveResults(puzzleResults)
            .subscribe((data: any) => {
                // if success
                this.flashMessage.show(data.msg, {
                    cssClass: 'alert-success',
                    timeout: 5000
                });
            }, (err) => {
                // if error
                console.log(err);
                this.flashMessage.show(err, {
                    cssClass: 'alert-danger',
                    timeout: 5000
                });
            });
    }
}
