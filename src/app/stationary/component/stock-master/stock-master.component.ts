import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'stock-master',
  templateUrl: './stock-master.component.html',
  styleUrls: ['./stock-master.component.css']
})
export class StockMasterComponent implements OnInit {

  
  animal: string;
  name: string;

  public col: string[] = ['id', 'name', 'progress', 'color','updated'];
  public rows:any = [
    {color:"purple",name:"aman",id:"1",progress:"56",updated:"here"},
    {color:"purple2",name:"aman2",id:"12",progress:"526",updated:"here"}
  ];


  constructor(public dialog: MatDialog){ }

  ngOnInit() {
  }

  public clickRow(row:any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '70%',
      position : {'top': '8%'},
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}


@Component({
  selector: 'stationary-modal',
  templateUrl: 'stock-master-modal.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data:any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

