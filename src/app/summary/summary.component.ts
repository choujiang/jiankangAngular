import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  constructor(private http: HttpClient) {
  }

  step: number;
  genders: object;
  user: User = new User();
  touBaoNianXian: object;
  jinTie: object;
  loading: boolean;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  ngOnInit() {
    this.step = 1;
    this.genders = [
      '男', '女'
    ];
    this.touBaoNianXian = [
      1, 3, 5, 10, 15, 20
    ];
    this.jinTie = [
      20, 40, 60, 80, 100
    ];
  }

  next() {
    this.step++;
    console.log(this.user);
  }

  download() {
    this.http.post<User>('http://localhost:3000/pdf', this.user, this.httpOptions).
    subscribe(data => this.openNewWin(data.toString()), error => console.log(error));
    // subscribe(data => this.fileName = data, error => console.log(error));

  }

  openNewWin(filename) {
    console.log('file name' + filename);
    window.open('http://localhost:3000/pdf/?fileName=' + filename);

  }
}
