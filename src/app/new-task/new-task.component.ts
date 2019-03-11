import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  modules = {};
  value = 1;
  options: Options = {
    floor: 0,
    ceil: 5,
    showTicks: true,
    tickStep: 1,
    showSelectionBar: true,
    getSelectionBarColor: (): string => {
      return '#451AFF';
    }
  };

  constructor() {
    this.modules = {
      toolbar: [['bold', 'italic', 'underline', 'strike'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      ['code-block']]
    };
  }

  ngOnInit() {
  }
}
