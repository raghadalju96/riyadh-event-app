import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/eventService/event.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
})
export class EventsListComponent implements OnInit {
  events: any[] = [];
  currentPage: number = 0;
  totalItems: number = 0;
  currentPageItems: number = 12;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getEvents(this.currentPage).subscribe(
      (data) => {
        this.events = data.result.items;
        this.totalItems = data.result.counters.total;
      },
      (error) => {
        console.error('Failed to fetch events:', error);
      }
    );
  }

  onPageChange(page: number): void {
    let newPage: number = page - 1;
    if (newPage >= 0 && newPage <= this.totalItems / this.currentPageItems) {
      this.currentPage = newPage;
      this.fetchEvents();
    }
  }
}
