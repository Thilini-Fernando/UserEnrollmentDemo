import { Injectable } from '@angular/core';
import { GridOption } from 'angular-slickgrid';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private toastr: ToastrService,) { }

  public endPoint: string = 'https://localhost:7141/';

  // --------Validations------- ----

  public tostOpt: Object = {
    timeOut: 3000,
    positionClass: 'toast-top-right',
    progressBar: false,
    progressAnimation: 'decreasing'
  };

   // pre define notification success message
   public showSuccess(msg: string) {
    this.toastr.success(msg, undefined, this.tostOpt);
  }
  // pre define notification warning message
  public showWarning(msg: string) {
    this.toastr.warning(msg, undefined, this.tostOpt);
  }
  // pre define notification error message
  public showError(msg: string) {
    this.toastr.error(msg, undefined, this.tostOpt);
  }
  
  // -------------Grid options-------------

  public gridOptions: GridOption = {
    enableExcelCopyBuffer: true,
    enableExcelExport: true, 
    enableAutoResize: true,
    enableCellNavigation: true,
    enableHeaderMenu: false,
    enableFiltering: true,
    enableCheckboxSelector: false,
    enableRowSelection: true,
    enablePagination: false,
    enableColumnReorder: false,
    rowSelectionOptions: {
      selectActiveRow: true
    },
  
    rowHeight: 25, 
    enableGridMenu: false,
    gridMenu: {
      columnTitle: 'Columns',
      menuWidth: 17,
      hideExportCsvCommand: true,
      resizeOnShowHeaderRow: true
    },
 

  };

 

}
