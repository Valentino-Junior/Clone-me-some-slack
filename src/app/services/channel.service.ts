import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase';

@Injectable()
export class ChannelService {
    constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {}

    updateChannelName(channelName: string) {
        this.afAuth.authState.subscribe(auth => {
            const items = this.db.list('channels');
            var newPostKey = firebase.database().ref().child('channels').push().key;

            let path = `/channels/${newPostKey}`;

            let channelData = {
                channelId: newPostKey,
                name: channelName
            };
            
            // items.push(channelData).then((item) =>{
            //     console.log("Item " + item.key);
            // });

            this.db.object(path).update(channelData)
            .then(() => console.log('Channel Stored')).catch(error => console.log("Error Occured " + error));
            // this.db.object(path).update(channelData)
            // .then(() => console.log('Successfully Updated Channel!'))
            // .catch(error => console.log(error));
        });
    }

    getChannels() {
        return this.db.list('/channels');
    }

}