import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

import { OUTGOING_MESSAGE_SOUND } from "../../resources/audio/outgoingMessageSound";
@Component({
  selector: "comet-chat-message-composer",
  templateUrl: "./comet-chat-message-composer.component.html",
  styleUrls: ["./comet-chat-message-composer.component.css"],
  animations: [
    trigger("FadeInFadeOut", [
      state(
        "normal",
        style({
          width: "0px",
        })
      ),
      state(
        "animated",
        style({
          width: "22px",
          margin: "auto 1px",
        })
      ),
      transition("normal=>animated", animate(500)),
    ]),
  ],
})
export class CometChatMessageComposerComponent implements OnInit, OnChanges {
  @Input() parentMessageId = null;

  // can be user or a group
  @Input() item = null;
  @Input() type = null;
  @Input() messageToBeEdited = null;
  @Input() replyPreview = null;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  @ViewChild("imgPicker", null) imgPicker: ElementRef;
  @ViewChild("vidPicker", null) vidPicker: ElementRef;
  @ViewChild("audPicker", null) audPicker: ElementRef;
  @ViewChild("filePicker", null) filePicker: ElementRef;

  senddisable = false;
  reactdisable = true;
  messageSending: boolean = false;
  messageInput = "";
  messageType = "";
  emojiViewer = false;
  createPoll = false;
  stickerViewer = false;
  checkAnimatedState = "normal";
  openEditMessageWindow: boolean = false;
  emojiToggled: boolean = false;
  isTyping: any;
  constructor() {}

  ngOnChanges(change: SimpleChanges) {
    // console.log("Message Composer --> ngOnChanges -->  ", change);

    if (change["messageToBeEdited"]) {
      console.log(
        "Message Composer --> Message to Be edited changed -->  ",
        change["messageToBeEdited"]
      );

      //edit message only if its not null or undefined
      if (change["messageToBeEdited"].currentValue) {
        this.openEditPreview();
      }
    }
  }

  ngOnInit() {
    // console.log(
    //   "MessageComposer -> user to which , message will be sent ",
    //   this.item
    // );
    //console.log("MessageComposer -> Type of User ", this.type);
  }

  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action) {
    let message = action.payLoad;

    console.log("Message Composer --> action generation is ", action);

    switch (action.type) {
      case "sendSmartReply": {
        this.sendTextMessage(message);

        //closing smartReply preview window
        this.replyPreview = null;
        break;
      }
    }
  }

  /**
   * Get Details of the User/Group , to whom , you want to send the message
   * @param
   */
  getReceiverDetails() {
    let receiverId;
    let receiverType;

    if (this.type == "user") {
      receiverId = this.item.uid;
      receiverType = CometChat.RECEIVER_TYPE.USER;
    } else if (this.item.type == "group") {
      receiverId = this.item.guid;
      receiverType = CometChat.RECEIVER_TYPE.GROUP;
    }

    return { receiverId: receiverId, receiverType: receiverType };
  }

  /**
   * Update the Message to be sent on every key press
   * @param event
   */
  changeHandler(event) {
    this.startTyping();
    if (event.target.value.length > 0) {
      this.messageInput = event.target.value;
      this.senddisable = true;
      this.reactdisable = false;
    }
    if (event.target.value.length == 0) {
      this.senddisable = false;
      this.reactdisable = true;
      this.messageInput = "";
    }
  }

  /**
   * Send the message if user hits ENTER-key
   * @param Event e
   */
  sendMessageOnEnter(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      this.sendTextMessage();
      this.playAudio();
    }
  }

  /**
   * Edit and Sent a Text message
   * @param
   */
  editMessage() {
    const messageToBeEdited = this.messageToBeEdited;

    let { receiverId, receiverType } = this.getReceiverDetails();

    let messageText = this.messageInput.trim();
    let textMessage = new CometChat.TextMessage(
      receiverId,
      messageText,
      receiverType
    );
    textMessage.setId(messageToBeEdited.id);

    this.endTyping();

    CometChat.editMessage(textMessage)
      .then((message) => {
        this.messageInput = "";
        this.messageSending = false;

        //this.playAudio();

        this.closeEditPreview();

        this.actionGenerated.emit({ type: "messageEdited", payLoad: message });
      })
      .catch((error) => {
        this.messageSending = false;
        console.log("Message editing failed with error:", error);
      });
  }

  /**
   * Send Text Message
   * @param
   */
  sendTextMessage(textMsg = null) {
    //console.log("Send Text Message Button Clicked");

    // Close Emoji Viewer if it is open while sending the message
    if (this.emojiViewer) {
      this.emojiViewer = false;
    }

    // Dont Send Blank text messages -- i.e --- messages that only contain spaces
    if (this.messageInput.trim().length == 0 && textMsg.trim().length == 0) {
      return false;
    }

    // wait for the previous message to be sent before sending the current message
    if (this.messageSending) {
      return false;
    }

    this.messageSending = true;

    // If its an Edit and Send Message Operation , use Edit Message Function
    if (this.messageToBeEdited) {
      this.editMessage();
      return false;
    }

    let { receiverId, receiverType } = this.getReceiverDetails();

    // console.log(
    //   `receiverID = ${receiverId}  and receiverType = ${receiverType} `
    // );

    let messageInput;

    if (textMsg !== null) {
      messageInput = textMsg.trim();
    } else {
      messageInput = this.messageInput.trim();
    }

    console.log("message composer --> sending message ", messageInput);

    let textMessage = new CometChat.TextMessage(
      receiverId,
      messageInput,
      receiverType
    );

    if (this.parentMessageId) {
      textMessage.setParentMessageId(this.parentMessageId);
    }

    // End Typing Indicator Function
    this.endTyping();

    CometChat.sendMessage(textMessage)
      .then((message) => {
        this.messageInput = "";
        this.messageSending = false;

        // Clear Message Input Box Logic
        // this.messageInputRef.current.textContent = "";

        // Play Message Sent Successfully Audio
        // this.playAudio();

        // this Message Emitted will Be Appended to the existing Message List
        this.actionGenerated.emit({
          type: "messageComposed",
          payLoad: [message],
        });

        //clearing Message Input Box
        this.messageInput = "";

        // Change the send button to reaction button
        setTimeout(() => {
          this.reactdisable = true;
          this.senddisable = false;
        }, 500);

        //console.log("Message Sent Successfull to ", this.item);
      })
      .catch((error) => {
        console.log("Message sending failed with error:", error);
        this.messageSending = false;
      });
  }

  toggleFilePicker() {
    this.checkAnimatedState == "normal"
      ? (this.checkAnimatedState = "animated")
      : (this.checkAnimatedState = "normal");
  }

  getVideo() {
    this.vidPicker.nativeElement.click();
  }
  getAudio() {
    this.audPicker.nativeElement.click();
  }
  getImage() {
    this.imgPicker.nativeElement.click();
  }
  getFile() {
    this.filePicker.nativeElement.click();
  }

  onVideoChange(event) {
    if (!event.target.files[0]) {
      return false;
    }
    const uploadedFile = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        const newFile = new File(
          [reader.result],
          uploadedFile.name,
          uploadedFile
        );
        this.sendMediaMessage(newFile, "video");
      },
      false
    );

    reader.readAsArrayBuffer(uploadedFile);
  }

  onAudChange(event) {
    if (!event.target.files[0]) {
      return false;
    }
    const uploadedFile = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        const newFile = new File(
          [reader.result],
          uploadedFile.name,
          uploadedFile
        );
        this.sendMediaMessage(newFile, "audio");
      },
      false
    );

    reader.readAsArrayBuffer(uploadedFile);
  }

  onImgChange(event) {
    if (!event.target.files[0]) {
      return false;
    }
    const uploadedFile = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        const newFile = new File(
          [reader.result],
          uploadedFile.name,
          uploadedFile
        );
        this.sendMediaMessage(newFile, "image");
      },
      false
    );

    reader.readAsArrayBuffer(uploadedFile);
  }

  onFileChange(event) {
    if (!event.target.files["0"]) {
      return false;
    }

    const uploadedFile = event.target.files["0"];
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        const newFile = new File(
          [reader.result],
          uploadedFile.name,
          uploadedFile
        );
        this.sendMediaMessage(newFile, "file");
      },
      false
    );
    console.log("reader is ", reader);

    reader.readAsArrayBuffer(uploadedFile);
  }

  sendMediaMessage(messageInput, messageType) {
    this.toggleFilePicker();
    if (this.messageSending) {
      return false;
    }
    this.messageSending = true;

    const { receiverId, receiverType } = this.getReceiverDetails();

    let mediaMessage = new CometChat.MediaMessage(
      receiverId,
      messageInput,
      messageType,
      receiverType
    );

    console.log(`Message Composer --> setting parent for media message`);

    if (this.parentMessageId) {
      console.log(`Message Composer --> setting parent for media message`);
      mediaMessage.setParentMessageId(this.parentMessageId);
    }

    this.endTyping();
    // console.log(
    //   "sendMediaMessage mediaMessage Message_Composer ->>>",
    //   mediaMessage
    // );
    CometChat.sendMessage(mediaMessage)
      .then((response) => {
        // console.log(
        //   "sendMediaMessage response Message_Composer ->>>",
        //   response
        // );
        this.messageSending = false;
        this.playAudio();
        this.actionGenerated.emit({
          type: "messageComposed",
          payLoad: [response],
        });
      })
      .catch((error) => {
        this.messageSending = false;
        console.log(
          "message sending failed with error Message_Composer ",
          error
        );
      });
  }

  /**
   * Add emoji to the input when user clicks on emoji
   * @param
   */
  addEmoji($event) {
    this.senddisable = true;
    this.reactdisable = false;
    let emoji = $event.emoji.native;
    this.messageInput = this.messageInput + emoji;
  }

  /**
   * opens the edit message window
   * @param
   */
  openEditPreview() {
    this.openEditMessageWindow = true;
    this.messageInput = this.messageToBeEdited.data.text;
  }

  /**
   * Closes the edit message window
   * @param
   */
  closeEditPreview() {
    this.openEditMessageWindow = false;
    this.messageToBeEdited = null;
    this.messageInput = "";
    this.actionGenerated.emit({
      type: "clearMessageToBeEdited",
      payLoad: null,
    });
  }

  /**
   * Plays Audio When Message is Sent
   */
  playAudio() {
    let audio = new Audio();
    audio.src = OUTGOING_MESSAGE_SOUND;
    audio.play();
  }

  /**
   *  When user starts typing
   */

  //Use this when params are passed through live Reaction  and comment down
  // startTyping(timer, metadata) {
  startTyping() {
    // let typingInterval = timer || 5000;
    let typingInterval = 5000;

    //console.log("typing interval ", typingInterval);

    if (this.isTyping > 0) {
      return false;
    }
    let { receiverId, receiverType } = this.getReceiverDetails();
    // let typingMetadata = metadata || undefined;
    let typingMetadata = undefined;

    // let typingMetadata = metadata || undefined;

    let typingNotification = new CometChat.TypingIndicator(
      receiverId,
      receiverType,
      typingMetadata
    );
    CometChat.startTyping(typingNotification);
    // console.log("start notification ", typingNotification);
    this.isTyping = setTimeout(() => {
      this.endTyping();
    }, typingInterval);
  }
  /**
   * When user stops writing
   */
  endTyping() {
    let { receiverId, receiverType } = this.getReceiverDetails();

    // let typingMetadata = metadata || undefined;

    let typingMetadata = undefined;

    let typingNotification = new CometChat.TypingIndicator(
      receiverId,
      receiverType,
      typingMetadata
    );
    CometChat.endTyping(typingNotification);
    console.log("end notification ", typingNotification);

    // console.log("end notification typing ", this.istyping);

    clearTimeout(this.isTyping);
    this.isTyping = null;
  }
}
