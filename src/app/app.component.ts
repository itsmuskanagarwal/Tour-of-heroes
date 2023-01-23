import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour Of Heroes'; //A varibale to show Title of the Project
  sub_title = 'Get you all the details of you favourite hero. Have a look!"' //line below the Main Title

  //quote on main page over header
  quote1 = '“Heroes are made by the paths they choose, not the power they are graced with.” – Brodi Ashton'

  quote2 = '“Heroes are made in the hour of defeat. Success is, therefore, well described as a series of glorious defeats.” – Mahatma Gandhi'

  quote3= ' “A hero is someone who, in spite of weakness, doubt or not always knowing the answers, goes ahead and overcomes anyway.” – Christopher Reeve'
}
