import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "sender-audio-bubble",
  templateUrl: "./sender-audio-bubble.component.html",
  styleUrls: ["./sender-audio-bubble.component.css"],
})
export class SenderAudioBubbleComponent implements OnInit {
  @Input() MessageDetails = null;
  @Input() showToolTip = true;

  audioUrl: string;
  message = Object.assign({}, this.MessageDetails, { messageFrom: "sender" });
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.getUrl();
  }
  getUrl() {
    this.audioUrl = this.MessageDetails.data.url;
  }
  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action) {
    console.log("receiver Message Bubble --> action generation is ", action);
    this.actionGenerated.emit(action);
  }
}
