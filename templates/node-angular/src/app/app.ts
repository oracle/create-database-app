import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title: string = 'node-angular';
  oracleLogo = 'assets/oracle.svg'
  angularLogo = 'assets/angular.svg'
  isConnected?: boolean;

    async ngOnInit() {
    try {
      const response = await fetch('http://localhost:3000/api/connection/status');
      const data = await response.json();
      if (data.status === 'ok') {
        this.isConnected = true;
      } else {
        this.isConnected = false;
      }
    } catch (error) {
      console.error('Error fetching connection status:', error);
      this.isConnected = undefined;
    }
  }
  
  get checkingConnection() {
    if (this.isConnected === undefined) {
      return 'Checking connection status...';
    } else if (this.isConnected) {
      return 'Database is working!';
    } else {
      return 'Something is wrong with the database!';
    }
  }
}
