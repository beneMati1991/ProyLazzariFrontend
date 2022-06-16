import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsService } from '../../services/credentials.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user = {
    unique_name: '',
  };
  userEdit = '';

  constructor(
    private dataService: DataService,
    private router: Router,
    public credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.dataService.user.subscribe((x: any) => (this.user = x));
    this.userEdit = this.user.unique_name;
  }

  LogOut() {
    //this.userEdit = 'Desconocido'
    this.dataService.logged.next(false);
    this.dataService.user.next({
      unique_name: 'Desconocido',
    });
    this.credentialsService.removeAllSession();
    this.router.navigateByUrl('');
  }

  editarComercioRef() {
    this.userEdit == ''
    this.dataService.logged.next(true);
    this.router.navigateByUrl('/editarcomercio');
  }
}
