import { Component, OnInit } from '@angular/core';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserInfo } from 'src/app/shared/models/auth.interface';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-remove-owner',
  templateUrl: './remove-owner.component.html',
  styleUrls: ['./remove-owner.component.css']
})
export class RemoveOwnerComponent implements OnInit {
  userlist :UserInfo[] = []
  selectedUsers? : UserInfo[];
  loading: boolean = true;
  constructor(private usersService: UsersService,private notificationService:NotificationService,public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.getUsers();
  }

  removeOwner() {
    this.ref.close(this.selectedUsers);
  }
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
 
  onRowSelect() {
    //console.log(this.selectedUsers)
  }
  

  private getUsers() {
    let id = localStorage.getItem("ServerId")
    this.usersService.getOwnersOfServer(+id!)
      .subscribe({
        next: (data) => {
          this.userlist = data;
          console.log("list of owners");
          console.log(data);
          this.loading = false;
          data.forEach((user:UserInfo) =>{
            user.groups?.forEach((group:any)=>{
       
              if(group.name)
                user.groups = group.name
              else user.groups= group.name
            })
     
          })
        },
        error: (e) => this.notificationService.warn("An error has occurred: "+e.error)
      });
  }

}
