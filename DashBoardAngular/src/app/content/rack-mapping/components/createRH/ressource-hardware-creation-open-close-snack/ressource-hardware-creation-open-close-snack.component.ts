import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, HostBinding } from '@angular/core';
@Component({
  selector: 'app-ressource-hardware-creation-open-close-snack',
  templateUrl: './ressource-hardware-creation-open-close-snack.component.html',
  styleUrls: ['./ressource-hardware-creation-open-close-snack.component.css']
})
export class RessourceHardwareCreationOpenCloseSnackComponent {
  toggleCreation = false;
  constructor() { }



  onToogleCreation(MatSlideToggleChange) {
    if (this.toggleCreation !== true) {
      this.toggleCreation = true;
    } else {
      this.toggleCreation = false;
    }
    console.log(this.toggleCreation)
  }

}
