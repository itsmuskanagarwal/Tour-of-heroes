import { Component } from '@angular/core';
import { MessageService } from '../message.service'; //fetching messages from service

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  constructor(public message_service_object: MessageService) {} // injecting 'messgae_service' service file

}
