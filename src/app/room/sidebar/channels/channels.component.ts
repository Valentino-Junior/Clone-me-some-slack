import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { ChannelService } from "../../../services/channel.service";
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators/take';
import { MessageComponent } from '../../message/message.component';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
  channels: any[];
  data: any[];
  constructor(public db: AngularFireDatabase, public channelService: ChannelService, public router: Router) { 
    
  }
  selectedIndex: number;

  ngOnInit() {
    this.displayData();
  }

  displayData() {
    // this.users = this.channelService.getChannels();
    this.db.list('/channels').valueChanges().subscribe(data => {
      this.channels = data;
      console.log(data);
    });
  }

  selectedItem(index, channelId: any):void {
    this.selectedIndex = index;
    console.log('ID: ' + channelId + " " +  this.channels[index].name);
    // this.getChannelId(this.channels[index].name);
  }

  getChannelId(channelName: string) { 
    let data: any;
    data =  this.db.object(`/channels`);
    console.log('Channel Id ' + data.channelId);
  }
  
  routeMe() {  
    // this.router.navigate(['/chatRoom/channel/message', {outlets: {'auxchild': [MessageComponent]}}]);
    // This works
    // this.router.navigate(['/chatRoom/channel/message']);
  }

}