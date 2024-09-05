import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Only connect to socket.io when in the browser
      this.socket = io('http://localhost:3000', {
        transports: ['websocket'],  // Force WebSocket
      });

      // Handle connection errors
      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });
    }
  }

  // Send a message to the server
  sendMessage(message: string): void {
    if (this.socket) {
      this.socket.emit('chat message', message);
    }
  }

  // Listen for messages from the server
  getMessages(): Observable<string> {
    return new Observable((observer) => {
      if (this.socket) {
        this.socket.on('chat message', (msg: string) => {
          observer.next(msg);
        });

        this.socket.on('connect_error', (error) => {
          observer.error('Connection Error: ' + error);
        });
      }
    });
  }
}
