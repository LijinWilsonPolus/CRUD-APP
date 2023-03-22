import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
// Table 
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // ! == optional

  constructor(private _dialog: MatDialog,
    private _empServices: EmployeeService,
    private _coreServices: CoreService
  ) { }

  ngOnInit(): void {
    this.getEmployeeList()
  }

  openAddEditEmpForm() {
    // this._dialog.open(EmpAddEditComponent) //button Click ( opens ) add employe section ..
    //therewill occur an problem where after adding the new employe we need to refresh the page...
    // to avoif this ........

    const DialogRef = this._dialog.open(EmpAddEditComponent);
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList()
        }
      },
      error: (err) => {
        console.error(err);

      }
    })

  }

  getEmployeeList() { //recieve the list of employee stored in json server
    this._empServices.getEmployeeList().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: (err: any) => {
        console.error(err);
      }

    })
  }

  // table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Delete Employee
  deleteEmployee(id: any) {
    this._empServices.deleteEmployee(id).subscribe({
      next: (res) => {
        // alert(`Employe number ${id} has removed`);
        this._coreServices.openSnackBar(`Employe number ${id} has removed`)
        this.getEmployeeList();
      },
      error: (err) => console.error(err)
    })
  }

  //Edit Employee
  openEditForm(data: any) {
    const DialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList()
        }
      },
      error: (err) => {
        console.error(err);

      }
    })
  }

}
