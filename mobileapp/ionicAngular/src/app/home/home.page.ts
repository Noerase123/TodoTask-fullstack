import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: any = {};
  getitem: any = {};
  items: any[] = [];

  url: string = "http://localhost:3030/api/todo/";

  constructor() {}

  ngOnInit() {
    console.log('initiate..')
    this.getData()
  }

  getData() {
    axios.get(this.url)
      .then(res => {
        const collection = res.data.data
        this.items = collection
        console.log(collection)
      })
      .catch(err => {
        console.log(err);
        
      })
  }
  
  submit() {
    console.log(this.user);
  
    axios.post(this.url, this.user)
      .then(res => {
        console.log(res)
        this.getData()
      })
      .catch(err => {
        console.log(err)
      })
  }

  delete(id: string) {
    axios.delete(this.url + id)
      .then(res => {
        console.log(res)
        this.getData()
      })
      .catch(err => {
        console.log(err)
      })
  }

}