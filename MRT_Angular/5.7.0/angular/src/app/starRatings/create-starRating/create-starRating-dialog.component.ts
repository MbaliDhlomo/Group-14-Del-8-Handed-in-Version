import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '../../../shared/app-component-base';
import {
  StarRatingDto,
  StarRatingServiceProxy
} from '../../../shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'create-starRating-dialog.component.html'
})
export class CreateStarRatingDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  starRating: StarRatingDto = new StarRatingDto();


  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _starRatingService: StarRatingServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {

  }

  save(): void {
    this.saving = true;

    this._starRatingService
      .create(this.starRating)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
