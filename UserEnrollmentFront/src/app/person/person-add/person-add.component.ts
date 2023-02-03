import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/config.service';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css']
})
export class PersonAddComponent implements OnInit {
  addForm: FormGroup | undefined;
  submitted = false;
  userRole:string | undefined;
  userGroupData:any[] | undefined;
  UserRoleData:any[] | undefined;
  privilegesData:any[] | undefined;

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  dbStatus: any = [];

  public person = {
    FirstName: '',
    LastName: '',
    EmailAddress: '',
    UserRole: '',
    AttachedCustomerId: '',
    UserGroupName: '' 
  }

  constructor(private formBuilder: FormBuilder, 
    public personService: PersonService,
    private config: ConfigService) {
 
  }

  ngOnInit() {
    this.UserRoleData = [{"UserRole":"Admin"},{"UserRole":"User"}]

    this.addForm = this.formBuilder.group({
      FirstName: ['', [Validators.required ]],
      LastName: ['', [Validators.required]],
      EmailAddress: ['', [Validators.email]],
      UserRole: ['', [Validators.required]],
      AttachedCustomerId: [''],
      UserGroupId: ['' ] 
    });


  }

  get f() { return this.addForm.controls; }


  onSubmit() {
    this.submitted = true;
 
    if (this.addForm.invalid) {
      return;
    }
    this.AddItem();


  }
  AddItem() {

    this.person.FirstName = this.addForm.value.FirstName;
    this.person.LastName = this.addForm.value.LastName;
    this.person.EmailAddress = this.addForm.value.EmailAddress;
    this.person.UserRole = this.addForm.value.UserRole;
    this.person.AttachedCustomerId = this.addForm.value.AttachedCustomerId;
    this.person.UserGroupName = this.addForm.value.UserGroupName; 


    this.personService.PersonAdd(this.person).subscribe((data: {}) => { 
      this.dbStatus = data; 
 
        this.config.showSuccess(this.dbStatus.Message);
      
    }, error => { 
      this.config.showError(error);
    });

  }

  onRoleSelectionChange(Event:any){
    this.userRole = Event.target.value 
    if(this.userRole == 'User'){
      this.personService.UserGroupsView().subscribe(data=>{
        this.userGroupData = data
      },err=>{

      },()=>{})
  
    }else{
      this.personService.PrivilegesView().subscribe(data=>{
        this.privilegesData = data
      },err=>{

      },()=>{
        
      })
    }
  }

  onGroupSelectionChange(Event:any){

  }

 

}
