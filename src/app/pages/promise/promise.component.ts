import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrl: './promise.component.css'
})
export class PromiseComponent implements OnInit {

  ngOnInit(): void {
    this.getUsers().then(users => console.log({ users }));
  }

  getUsers(): Promise<unknown> {
    const promise = new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
        .then((response) => response.json())
        .then((responseJson) => resolve(responseJson[ 'data' ]))
    });
    return promise;
  }
}
