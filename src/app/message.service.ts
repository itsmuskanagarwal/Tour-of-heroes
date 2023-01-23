import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  messages: string[] = [];

  add(message: string) {
    this.messages.push(message); //adding value in string-array
  }

  clear() {
    this.messages = []; //clearing data from string-array  
  }
}
