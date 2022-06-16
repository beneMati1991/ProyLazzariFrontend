import { Component } from '@angular/core';
import { CredentialsService } from './services/credentials.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lazzariBackOffice';
  logged: boolean = false;

  constructor(
    public dataService: DataService,
    public credentialsService: CredentialsService
  ) {
    if (this.credentialsService.getSession('token') !== null) {
      this.logged = true;
    }
    this.dataService.logged.subscribe((x) => (this.logged = x));
  }
}
