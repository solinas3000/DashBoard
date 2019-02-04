import { Component, OnInit } from '@angular/core';
import { SharingVariableService } from '../../../service/sharing-variable.service';
import { RessourceHardwareCreationOpenCloseSnackComponent } from '../../createRH/ressource-hardware-creation-open-close-snack/ressource-hardware-creation-open-close-snack.component';
import { MatTabChangeEvent } from '@angular/material';
import { GlobalSharingVariableService } from '../../../../../global-service/global-sharing-variable.service';
  /**
   *
   * Head of the DOM Tree for RackMapping Page
   * Initialize the tab
   *
   */
@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.css']
})
export class TabContainerComponent implements OnInit {
  indexTab: number;
  mapTabToScroll = {};
  refresh: number;
  constructor(
    private sharingVariableService: SharingVariableService,
    private globalSharingVariableService: GlobalSharingVariableService
  ) {}

  ngOnInit() {
    this.sharingVariableService.indexTabSubject.subscribe(index => {
      this.indexTab = index;
    });
    this.globalSharingVariableService.getScrollTopValueAsOb().subscribe(x => {
      this.onPageYChange(x);
    });
  }

  onPageYChange(scrollTop: number) {
    console.log(scrollTop);
    this.mapTabToScroll[this.indexTab] = scrollTop;
    console.log(this.mapTabToScroll);
  }

  selectedTabChange(event) {
    this.refresh = -1
    const target = event.target.className;
    if (
      target === 'mat-tab-label-content' ||
      target === 'mat-tab-label mat-ripple ng-star-inserted mat-tab-label-active'
    ) {
      this.refresh = this.indexTab;
      console.log('in click tab header',this.refresh);
      if (this.mapTabToScroll[this.indexTab]) {
        this.globalSharingVariableService.changeScrollTO(this.mapTabToScroll[this.indexTab]);
      }
      this.sharingVariableService.changeIndexTab(this.indexTab);
    }
  }
}
