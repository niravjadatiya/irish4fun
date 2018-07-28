import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
declare var $: any;
declare var window: any;
// declare function reInit(): any;
@Component({
    selector: 'app-storybook',
    templateUrl: './storybook.component.html',
    styleUrls: ['./storybook.component.css']
})
export class StorybookComponent implements OnInit, AfterViewInit {

    constructor(
        private ngZone: NgZone
    ) {
     }

    ngOnInit() {
        // this.initFlipBook();
    }
    ngAfterViewInit() {
        this.initFlipBook();
        // setTimeout(() => {
        //     window.reInit();
        // }, 1000);
    }

    initFlipBook() {
        // $(document).ready(function () {
            $('.flipbook').turn({
                // Width
                width: 922,
                // Height
                height: 600,
                // Elevation
                elevation: 50,
                // Enable gradients
                gradients: true,
                // Auto center this flipbook
                autoCenter: true
            });

            $('.flipbook').bind('turned', function(event, page, view) {
                console.log(page, view);
                if (page === 20 || page === 21) {
                    window.reInit();
                }

            });
            $('.flipbook').bind('turned', function(event, page, view) {
                console.log(page, view);
                if (page === 20 || page === 21) {
                    window.reInit();
                }
                $('.flipbook').addClass('shadow');
                if (page === 22 || page === 1) {
                    $('.flipbook').removeClass('shadow');
                }
            });
        // });
    }



    playSound(elementId) {
        console.log(elementId);
        (document.getElementById(elementId) as any).play();
    }

}
