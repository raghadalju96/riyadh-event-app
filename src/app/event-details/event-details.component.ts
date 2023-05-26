import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EventService } from '../services/eventService/event.service';



@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  eventId: number = 0;
  event: any;

  constructor(private route: ActivatedRoute, private eventService: EventService, private router: Router) {
   
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId = parseInt(params.get('id') || '', 10);
      this.fetchEvent();
    });
  }

  fetchEvent(): void {
    this.eventService.getEventById(this.eventId).subscribe(
      data => {
        this.event = data.result.items[0];
        if(!this.event){
          this.router.navigateByUrl('/events')
        }
      },
      error => {
        console.error('Failed to fetch event:', error);
      }
    );
  }

}
