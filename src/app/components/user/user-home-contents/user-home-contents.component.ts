import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserData } from 'src/app/core/selectors/user.selectors';

@Component({
  selector: 'app-user-home-contents',
  templateUrl: './user-home-contents.component.html',
  styleUrls: ['./user-home-contents.component.scss']
})
export class UserHomeContentsComponent {

  constructor(private store:Store){}

  username!:string|undefined;

ngOnInit(){
  this.store.select(selectUserData).subscribe((response)=>{
    this.username= response?.username;
  })
}

}
