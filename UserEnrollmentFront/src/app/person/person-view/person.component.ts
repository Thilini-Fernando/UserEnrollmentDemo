import { Component, OnInit } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column, GridOption, AngularGridInstance, Formatters, OnEventArgs, FieldType, Editors, DelimiterType, FileType } from 'angular-slickgrid';
import { ConfigService } from 'src/app/config.service';
import { PersonService } from '../person.service';
import { ModalModule } from 'ng-bootstrap';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  public btnEnable: boolean = false;
  public btnAddPrivilage: boolean = false;
  public btnEditPrivilage: boolean = false;
  public btnDeletePrivilage: boolean = false;
  private provilage: any = [];

  dbStatus: any = [];


  moveRowsPlugin: any;
  columnDefinitions: Column[] = [];
  gridOptions: GridOption = {};
  dataset: any[] = [];
  Grid: AngularGridInstance | undefined;
  gridObj: any;
  selectedRow: any[] | undefined;
  detailViewRowCount = 9;

  constructor(
    private personService: PersonService,
    private config: ConfigService,
    private modalService: ModalModule
  ) {


  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.Grid = angularGrid;
    this.gridObj = angularGrid && angularGrid.slickGrid || {};
  }


  ngOnInit() {
    this.getData();
    this.columnDefinitions = [
      { id: 'FirstName', name: 'First Name', field: 'FirstName', filterable: true, sortable: true, type: FieldType.string },
      { id: 'LastName', name: 'Last Name', field: 'LastName', filterable: true, sortable: true, type: FieldType.string },
      { id: 'EmailAddress', name: 'Email Address', field: 'EmailAddress', filterable: true, sortable: true, type: FieldType.string },
      { id: 'UserRole', name: 'Email', field: 'User Role', filterable: true, sortable: true, type: FieldType.string },
      { id: 'AttachedCustomerId', name: 'Customer Id', field: 'AttachedCustomerId', filterable: true, sortable: true, type: FieldType.string },
      { id: 'UserGroupName', name: 'User Group', field: 'UserGroupName', filterable: true, sortable: true, type: FieldType.string },
      {
        id: '#', field: '', name: '', width: 30,
        formatter: Formatters.editIcon,
        cssClass: 'text-primary',
        headerCssClass: 'border-r-0',
        maxWidth: 30,
        excludeFromHeaderMenu: true, excludeFromExport: true,
        onCellClick: (e: Event, args: OnEventArgs) => {
          this.btnEditPrivilage ? this.openModalEdit(args) : '';
        },

      },
      {
        id: '#', field: '', name: '', width: 30,
        formatter: Formatters.deleteIcon,
        cssClass: 'text-danger',
        headerCssClass: 'border-r-0',
        maxWidth: 30,
        excludeFromHeaderMenu: true, excludeFromExport: true,
        onCellClick: (e: Event, args: OnEventArgs) => {
          this.btnDeletePrivilage ? this.onRemoveSelected(args) : '';
        }

      },
    ];
    this.gridOptions = this.config.gridOptions;
  }
 

  getData() {
    this.personService.PersonView().subscribe(data => {
      this.dataset = data;
    }, err => {

    }, () => {

    })
  }

   
  deletefn(data: any) {
    this.personService.PersonDelete(data.PersonId, data.UserRole).subscribe((data: {}) => {

      this.dbStatus = data;
      if (this.dbStatus.Status == 1) {

        this.config.showSuccess(this.dbStatus.Message);
        this.getData();
      }
      else {

        this.config.showError(this.dbStatus.Message);
        if (this.dbStatus.ErrorHandled == 0) {
        }
      }

    }, error => {
      this.config.showError("Delete Fail");
    });
  }

  openModalEdit(args:any){

  }

  onRemoveSelected(args:any){

  }
  
}
