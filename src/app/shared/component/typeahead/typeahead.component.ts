import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.css']
})
export class TypeaheadComponent implements OnInit {
  typeAheadCtrl = new FormControl();
  filteredObj: Observable<any>;
  selectedValue: any;

  @Input() data: any;
  @Input() setValue: any;
  @Input() setLabel: any;
  @Output() selectedEvent = new EventEmitter<object>();

  constructor() { 
    this.filteredObj = this.typeAheadCtrl.valueChanges
    .pipe(
      startWith(''),
      map(obj => obj ? this._filterData(obj) : this.data.slice())
    );
  }

  ngOnInit() {

    if(this.setValue != '' || this.setValue != null){
      //this.typeAheadCtrl = this.setValue;
      this.typeAheadCtrl.setValue(this.setValue);
    }
  }

  private _filterData(value: string) {
    const filterValue = value.toLowerCase();
    return this.data.filter(obj => obj.name.toLowerCase().indexOf(filterValue) === 0);
  }

  // formControlValueChanged() {
  //     this.typeAheadCtrl.valueChanges.subscribe(
  //       (value: any) => {
  //           this.selectedEvent.emit(value);
  //       });  
  // }

  optionClicked(obj){
    this.selectedEvent.emit(obj);
  }
}
