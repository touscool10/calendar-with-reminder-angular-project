import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class LayoutService {

    private isMobileFlag: boolean = false;
    private isTabletFlag: boolean = false;

    constructor(public breakpointObserver: BreakpointObserver) {

      const layoutChanges = breakpointObserver.observe([
            '(max-width: 768px)'
          ]);
        layoutChanges.subscribe(result => {
            this.isMobileFlag = result.matches;
            console.warn(this.isMobileFlag)
        });

        const layoutChangesTablet = breakpointObserver.observe([
          '(max-width: 1050px)'
        ]);
        layoutChangesTablet.subscribe(result => {
            this.isTabletFlag = result.matches;
            console.warn(this.isTabletFlag)
        });
    }

    get isMobile() {
        return this.isMobileFlag;
    }
    get isTablet() {
      return this.isTabletFlag;
    }

}
