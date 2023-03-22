
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {
  // Reactice form
  empForm: FormGroup;
  // Education list - 
  education: string[] = [
    'Higher Secondary',
    'Diploma',
    'Under Graduate',
    'Post Graduate'
  ]
  // formgroup >> formBuilder >> fb.formGroup >> formContorlName 
  constructor(
    private _fb: FormBuilder,
    private _empServices: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, //this is used to pass data to the table
    private _coreServices:CoreService
  ) {

    this.empForm = _fb.group({
      lastName: '',
      firstName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: ''
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  // Onsubmit contains both the save and update function...
  onFormSubmit() {
    // console.log(this.empForm.value);
    if (this.empForm.valid) {
      if (this.data) {
        this._empServices.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            // alert('employee details updated!');
            this._coreServices.openSnackBar('employee details updated!')
            this._dialogRef.close(true); // true argument used in the case of page refreshment
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      } else {
        this._empServices.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            // alert('employee added successfully!');
            this._coreServices.openSnackBar('employee added successfully!')
            this._dialogRef.close(true); // true argument used in the case of page refreshment
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      }


    }

  }


}
