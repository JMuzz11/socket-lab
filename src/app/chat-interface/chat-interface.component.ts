import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { CommonModule } from '@angular/common';  // Import CommonModule for ngFor
import { SocketService } from '../sockets.service';

@Component({
  selector: 'app-chat-interface',
  standalone: true,  // Declare the component as standalone
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.css'],
  imports: [FormsModule, CommonModule]  // Add CommonModule here
})
export class ChatInterfaceComponent {
  message: string = '';
  messages: string[] = [];

  constructor(private socketService: SocketService) {}

 ngOnInit(): void {
  // Listen for incoming messages from the server
  this.socketService.getMessages().subscribe(
    (msg: string) => {
      this.messages.push(msg);
    },
    (error) => {
      console.error('Socket error: ', error);  // Log socket errors
    }
  );
}

  sendMessage(event: Event): void {
    event.preventDefault();
    if (this.message.trim()) {
      // Send the message to the server
      this.socketService.sendMessage(this.message);
      this.message = '';  // Clear the input after sending
    }
  }
}
