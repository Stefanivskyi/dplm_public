import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-aside',
    templateUrl: './app-aside.component.html'
})
export class AppAsideComponent implements OnInit, OnDestroy {
    mySubscription;

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.mySubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.router.navigated = false;
            }
        });
    }
    ngOnDestroy() {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
            document.querySelector('body').classList.add('aside-menu-hidden');
        }
    }

}
