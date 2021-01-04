import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { STRING_MESSAGES } from "../../utils/messageConstants";

@Component({
  selector: "cometchat-receiver-message-bubble",
  templateUrl: "./cometchat-receiver-message-bubble.component.html",
  styleUrls: ["./cometchat-receiver-message-bubble.component.css"],
})
export class CometchatReceiverMessageBubbleComponent implements OnInit {
  @Input() item = null;
  @Input() type = "";
  @Input() MessageDetails = null;
  @Input() showReplyCount = true;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  @Input() showToolTip = true;

  linkPreview: boolean = false;
  linkTitle: string;
  linkDescription: string;
  linkUrl: string;
  linkText: string;
  linkImage: string;

  constructor() {}

  ngOnInit() {
    this.checkLinkPreview();
  }

  /**
   * Check If extension has enabled LinkPreview
   */
  checkLinkPreview() {
    if (this.MessageDetails.hasOwnProperty("metadata")) {
      const metadata = this.MessageDetails.metadata;
      const injectedObject = metadata["@injected"];
      if (injectedObject && injectedObject.hasOwnProperty("extensions")) {
        const extensionsObject = injectedObject["extensions"];
        if (
          extensionsObject &&
          extensionsObject.hasOwnProperty("link-preview")
        ) {
          const linkPreviewObject = extensionsObject["link-preview"];
          if (
            linkPreviewObject &&
            linkPreviewObject.hasOwnProperty("links") &&
            linkPreviewObject["links"].length
          ) {
            this.linkPreview = true;
            const linkObject = linkPreviewObject["links"][0];
            this.linkTitle = linkObject.title;
            this.linkDescription = linkObject.description;
            this.linkUrl = linkObject.url;
            this.linkImage = linkObject.image;
            console.log("sender link obj ", linkObject);
            console.log(this.linkTitle !== "");

            console.log("sender link url ", this.linkUrl);

            const pattern = /(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)(\S+)?/;
            const linkText = linkObject["url"].match(pattern)
              ? STRING_MESSAGES.VIEW_ON_YOUTUBE
              : STRING_MESSAGES.VISIT;
            this.linkText = linkText;
            // const actualMessage = messageText;
          }
        }
      }
    }
  }

  getTime() {
    let msgSentAt = this.MessageDetails.sentAt;
    let timeStamp = new Date(msgSentAt * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return timeStamp;
  }

  toggleToolTip() {
    //console.log("toggle tool tip");
    //this.showToolTip = !this.showToolTip;
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
