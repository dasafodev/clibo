import { Component, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-streaming-list',
  templateUrl: './streaming-list.component.html',
  styleUrls: ['./streaming-list.component.css']
})
export class StreamingListComponent implements OnInit {

  
  constructor(
  ) { }

  
  @Input()
  videos:any;

  ngOnInit(): void {
    
  }

}