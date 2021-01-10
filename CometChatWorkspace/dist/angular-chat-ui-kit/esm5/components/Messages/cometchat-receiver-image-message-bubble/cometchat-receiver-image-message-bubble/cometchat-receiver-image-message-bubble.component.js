/**
 * @fileoverview added by tsickle
 * Generated from: components/Messages/cometchat-receiver-image-message-bubble/cometchat-receiver-image-message-bubble/cometchat-receiver-image-message-bubble.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, HostListener, } from "@angular/core";
import { checkMessageForExtensionsData } from "../../../utils/common";
import * as enums from "../../../utils/enums";
import { STRING_MESSAGES } from "../../../utils/messageConstants";
var CometchatReceiverImageMessageBubbleComponent = /** @class */ (function () {
    function CometchatReceiverImageMessageBubbleComponent() {
        var _this = this;
        this.MessageDetails = null;
        this.showToolTip = true;
        this.showReplyCount = true;
        this.actionGenerated = new EventEmitter();
        this.messageFrom = "receiver";
        this.messageAssign = Object.assign({}, this.MessageDetails, {
            messageFrom: this.messageFrom,
        });
        this.imageLoader = false;
        this.checkScreenSize = false;
        this.checkReaction = false;
        this.avatar = null;
        //Sets Username of Avatar
        this.name = null;
        //If Group then only show avatar
        //If Group then only show avatar
        this.avatarIfGroup = false;
        this.message = this.messageAssign;
        this.imageUrl = "";
        /**
         * If thumbnail-extension is not present then this works
         *
         */
        this.setMessageImageUrl = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var img = new Image();
            img.src = _this.MessageDetails.data.url;
            img.onload = (/**
             * @return {?}
             */
            function () {
                _this.imageLoader = false;
                _this.imageUrl = img.src;
            });
        });
    }
    /**
     * @return {?}
     */
    CometchatReceiverImageMessageBubbleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.checkReaction = checkMessageForExtensionsData(this.MessageDetails, STRING_MESSAGES.REACTIONS);
        /**
         *  If Group then displays Avatar And Name
         */
        if (this.MessageDetails.receiverType === "group") {
            this.avatarIfGroup = true;
            this.name = this.MessageDetails.sender.name;
            this.avatar = this.MessageDetails.sender.avatar;
        }
        this.setImage();
    };
    /**
     * Checks when window size is changed in realtime
     */
    /**
     * Checks when window size is changed in realtime
     * @return {?}
     */
    CometchatReceiverImageMessageBubbleComponent.prototype.onResize = /**
     * Checks when window size is changed in realtime
     * @return {?}
     */
    function () {
        this.innerWidth = window.innerWidth;
        if (this.innerWidth >= "320" && this.innerWidth <= "767") {
            this.checkScreenSize = true;
        }
        else {
            if (this.checkScreenSize === true) {
                this.setImage();
            }
            this.checkScreenSize = false;
        }
    };
    /**
     * Checks if thumnail-generation extension is present or not And then Sets the image
     *
     */
    /**
     * Checks if thumnail-generation extension is present or not And then Sets the image
     *
     * @return {?}
     */
    CometchatReceiverImageMessageBubbleComponent.prototype.setImage = /**
     * Checks if thumnail-generation extension is present or not And then Sets the image
     *
     * @return {?}
     */
    function () {
        var _this = this;
        this.imageLoader = true;
        if (this.MessageDetails.hasOwnProperty("metadata")) {
            /** @type {?} */
            var metadata = this.MessageDetails.metadata;
            /** @type {?} */
            var injectedObject = metadata["@injected"];
            if (injectedObject && injectedObject.hasOwnProperty("extensions")) {
                /** @type {?} */
                var extensionsObject = injectedObject["extensions"];
                if (extensionsObject &&
                    extensionsObject.hasOwnProperty("thumbnail-generation")) {
                    /** @type {?} */
                    var thumbnailGenerationObject = extensionsObject["thumbnail-generation"];
                    /** @type {?} */
                    var mq = window.matchMedia("(min-width:360px) and (max-width: 767px)");
                    /** @type {?} */
                    var imageToShow = this.chooseImage(thumbnailGenerationObject);
                    /** @type {?} */
                    var img_1 = new Image();
                    img_1.src = imageToShow;
                    img_1.onload = (/**
                     * @return {?}
                     */
                    function () {
                        _this.imageLoader = false;
                        _this.imageUrl = img_1.src;
                        URL.revokeObjectURL(img_1.src);
                    });
                }
            }
        }
        else {
            this.setMessageImageUrl();
        }
    };
    /**
     * Sets image url i.e medium-size or small-size
     * @param
     */
    /**
     * Sets image url i.e medium-size or small-size
     * @param {?} thumbnailGenerationObject
     * @return {?}
     */
    CometchatReceiverImageMessageBubbleComponent.prototype.chooseImage = /**
     * Sets image url i.e medium-size or small-size
     * @param {?} thumbnailGenerationObject
     * @return {?}
     */
    function (thumbnailGenerationObject) {
        /** @type {?} */
        var smallUrl = thumbnailGenerationObject["url_small"];
        /** @type {?} */
        var mediumUrl = thumbnailGenerationObject["url_medium"];
        /** @type {?} */
        var mq = window.matchMedia("(min-width:360px) and (max-width: 767px)");
        /** @type {?} */
        var imageToShow = mediumUrl;
        if (mq.matches) {
            imageToShow = smallUrl;
        }
        return imageToShow;
    };
    /**
     *
     *   Emits action to view image in full screen
     */
    /**
     *
     *   Emits action to view image in full screen
     * @return {?}
     */
    CometchatReceiverImageMessageBubbleComponent.prototype.open = /**
     *
     *   Emits action to view image in full screen
     * @return {?}
     */
    function () {
        this.actionGenerated.emit({
            type: enums.VIEW_ACTUAL_IMAGE,
            payLoad: tslib_1.__assign({}, this.message, this.MessageDetails),
        });
    };
    /**
     * Set Time-Stamp for receiving image
     *
     */
    /**
     * Set Time-Stamp for receiving image
     *
     * @return {?}
     */
    CometchatReceiverImageMessageBubbleComponent.prototype.getTime = /**
     * Set Time-Stamp for receiving image
     *
     * @return {?}
     */
    function () {
        /** @type {?} */
        var msgSentAt = this.MessageDetails.sentAt;
        /** @type {?} */
        var timeStamp = new Date(msgSentAt * 1000).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        return timeStamp;
    };
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    CometchatReceiverImageMessageBubbleComponent.prototype.actionHandler = /**
     * Handles all the actions emitted by the child components that make the current component
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.actionGenerated.emit(action);
    };
    CometchatReceiverImageMessageBubbleComponent.decorators = [
        { type: Component, args: [{
                    selector: "cometchat-receiver-image-message-bubble",
                    template: "<div class=\"messageContainerStyle\">\n  <!--ToolTip-->\n  <cometchat-message-actions\n    class=\"tool\"\n    [ngClass]=\"{\n      toolGroup: MessageDetails?.receiverType == 'group'\n    }\"\n    [MessageDetails]=\"MessageDetails\"\n    (actionGenerated)=\"actionHandler($event)\"\n    *ngIf=\"showToolTip\"\n  ></cometchat-message-actions>\n  <div class=\"messageWrapperStyle\">\n    <!--Avatar-->\n    <div class=\"messageThumbnailStyle\" *ngIf=\"avatarIfGroup\">\n      <cometchat-avatar\n        [item]=\"MessageDetails?.sender\"\n        [enableUserStatus]=\"false\"\n        class=\"avatarStyle\"\n      ></cometchat-avatar>\n    </div>\n    <div class=\"messageDetailStyle\">\n      <!--name-->\n      <div class=\"nameWrapperStyle\">\n        <span class=\"nameStyle\">\n          {{ name }}\n        </span>\n      </div>\n      <div class=\"messageImgContainerStyle\">\n        <div class=\"messageImgWrapperStyle\" (click)=\"open()\">\n          <div *ngIf=\"imageLoader\" class=\"imageLoaderStyle\">&nbsp;</div>\n          <img [src]=\"imageUrl\" loading=\"lazy\" />\n        </div>\n      </div>\n      <cometchat-message-reactions\n        *ngIf=\"checkReaction\"\n        [MessageDetails]=\"MessageDetails\"\n        [loggedInUser]=\"loggedInUser\"\n        (actionGenerated)=\"actionHandler($event)\"\n      ></cometchat-message-reactions>\n      <div class=\"messageInfoWrapperStyle\">\n        <cometchat-read-reciept\n          [MessageDetails]=\"MessageDetails\"\n          [displayReadReciept]=\"false\"\n        ></cometchat-read-reciept>\n        <!--ReplyCount-->\n        <cometchat-threaded-message-reply-count\n          *ngIf=\"showReplyCount\"\n          [MessageDetails]=\"MessageDetails\"\n          (actionGenerated)=\"actionHandler($event)\"\n        >\n        </cometchat-threaded-message-reply-count>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [".messageContainerStyle{align-self:flex-start;margin-bottom:16px;padding-right:16px;max-width:65%;clear:both;position:relative;display:flex;flex-direction:column;flex-shrink:0;float:left}.messageContainerStyle:hover>.tool{display:flex}.tool{display:none}.toolGroup{padding-left:45px}.messageWrapperStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageThumbnailStyle{width:36px;height:36px;margin:10px 5px;float:left;flex-shrink:0}.messageDetailStyle{flex:1 1;display:flex;flex-direction:column}.messageImgContainerStyle{width:auto;flex:1 1;align-self:flex-start;display:flex}.messageImgWrapperStyle{display:inline-block;align-self:flex-start;max-width:300px;height:200px;cursor:pointer}.messageImgWrapperStyle img{border-radius:8px;height:100%;max-width:100%}.messageInfoWrapperStyle{align-self:flex-start;padding:3px 5px;display:inherit}.messageTimestampStyle{display:inline-block;font-size:11px;font-weight:500;line-height:12px;text-transform:uppercase;color:rgba(20,20,20,.6)}.imageLoaderStyle{width:200px;background-color:rgba(212,209,209,.3);height:200px;float:right;border-radius:20px}.nameWrapperStyle{padding:3px 5px;align-self:flex-start}.nameStyle{font-size:10px;color:rgba(20,20,20,.6)}@media (min-width:320px) and (max-width:767px){.messageImgWrapperStyle{min-width:50px;max-width:150px;height:100px;padding:2px}}"]
                }] }
    ];
    /** @nocollapse */
    CometchatReceiverImageMessageBubbleComponent.ctorParameters = function () { return []; };
    CometchatReceiverImageMessageBubbleComponent.propDecorators = {
        MessageDetails: [{ type: Input }],
        showToolTip: [{ type: Input }],
        showReplyCount: [{ type: Input }],
        loggedInUser: [{ type: Input }],
        actionGenerated: [{ type: Output }],
        onResize: [{ type: HostListener, args: ["window:resize", [],] }]
    };
    return CometchatReceiverImageMessageBubbleComponent;
}());
export { CometchatReceiverImageMessageBubbleComponent };
if (false) {
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.MessageDetails;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.showToolTip;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.showReplyCount;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.loggedInUser;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.actionGenerated;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.messageFrom;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.messageAssign;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.imageLoader;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.innerWidth;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.checkScreenSize;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.checkReaction;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.avatar;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.name;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.avatarIfGroup;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.message;
    /** @type {?} */
    CometchatReceiverImageMessageBubbleComponent.prototype.imageUrl;
    /**
     * If thumbnail-extension is not present then this works
     *
     * @type {?}
     */
    CometchatReceiverImageMessageBubbleComponent.prototype.setMessageImageUrl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tZXRjaGF0LXJlY2VpdmVyLWltYWdlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2hhdC11aS1raXQvIiwic291cmNlcyI6WyJjb21wb25lbnRzL01lc3NhZ2VzL2NvbWV0Y2hhdC1yZWNlaXZlci1pbWFnZS1tZXNzYWdlLWJ1YmJsZS9jb21ldGNoYXQtcmVjZWl2ZXItaW1hZ2UtbWVzc2FnZS1idWJibGUvY29tZXRjaGF0LXJlY2VpdmVyLWltYWdlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RSxPQUFPLEtBQUssS0FBSyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVsRTtJQStCRTtRQUFBLGlCQUFnQjtRQXpCUCxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUVyQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xFLGdCQUFXLEdBQUcsVUFBVSxDQUFDO1FBRXpCLGtCQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyRCxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDOUIsQ0FBQyxDQUFDO1FBQ0gsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFFN0Isb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFDakMsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFFL0IsV0FBTSxHQUFHLElB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bkIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsb0VBQWE7Ozs7O0lBQWIsVUFBYyxNQUFNO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7O2dCQWhLRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlDQUF5QztvQkFDbkQsdTJEQUF1RTs7aUJBRXhFOzs7OztpQ0FFRSxLQUFLOzhCQUNMLEtBQUs7aUNBQ0wsS0FBSzsrQkFDTCxLQUFLO2tDQUNMLE1BQU07MkJBMkNOLFlBQVksU0FBQyxlQUFlLEVBQUUsRUFBRTs7SUE0R25DLG1EQUFDO0NBQUEsQUFqS0QsSUFpS0M7U0E1SlksNENBQTRDOzs7SUFDdkQsc0VBQStCOztJQUMvQixtRUFBNEI7O0lBQzVCLHNFQUErQjs7SUFDL0Isb0VBQXNCOztJQUN0Qix1RUFBa0U7O0lBQ2xFLG1FQUF5Qjs7SUFFekIscUVBRUc7O0lBQ0gsbUVBQTZCOztJQUM3QixrRUFBVzs7SUFDWCx1RUFBaUM7O0lBQ2pDLHFFQUErQjs7SUFFL0IsOERBQWM7O0lBRWQsNERBQW9COztJQUdwQixxRUFBK0I7O0lBRS9CLCtEQUE2Qjs7SUFDN0IsZ0VBQWM7Ozs7OztJQTZFZCwwRUFPRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NvbW1vblwiO1xuaW1wb3J0ICogYXMgZW51bXMgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2VudW1zXCI7XG5pbXBvcnQgeyBTVFJJTkdfTUVTU0FHRVMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvbWVzc2FnZUNvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiY29tZXRjaGF0LXJlY2VpdmVyLWltYWdlLW1lc3NhZ2UtYnViYmxlXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vY29tZXRjaGF0LXJlY2VpdmVyLWltYWdlLW1lc3NhZ2UtYnViYmxlLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9jb21ldGNoYXQtcmVjZWl2ZXItaW1hZ2UtbWVzc2FnZS1idWJibGUuY29tcG9uZW50LmNzc1wiXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tZXRjaGF0UmVjZWl2ZXJJbWFnZU1lc3NhZ2VCdWJibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBNZXNzYWdlRGV0YWlscyA9IG51bGw7XG4gIEBJbnB1dCgpIHNob3dUb29sVGlwID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd1JlcGx5Q291bnQgPSB0cnVlO1xuICBASW5wdXQoKSBsb2dnZWRJblVzZXI7XG4gIEBPdXRwdXQoKSBhY3Rpb25HZW5lcmF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBtZXNzYWdlRnJvbSA9IFwicmVjZWl2ZXJcIjtcblxuICBtZXNzYWdlQXNzaWduID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5NZXNzYWdlRGV0YWlscywge1xuICAgIG1lc3NhZ2VGcm9tOiB0aGlzLm1lc3NhZ2VGcm9tLFxuICB9KTtcbiAgaW1hZ2VMb2FkZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaW5uZXJXaWR0aDtcbiAgY2hlY2tTY3JlZW5TaXplOiBib29sZWFuID0gZmFsc2U7XG4gIGNoZWNrUmVhY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICBhdmF0YXIgPSBudWxsO1xuICAvL1NldHMgVXNlcm5hbWUgb2YgQXZhdGFyXG4gIG5hbWU6IHN0cmluZyA9IG51bGw7XG4gIC8vSWYgR3JvdXAgdGhlbiBvbmx5IHNob3cgYXZhdGFyXG4gIC8vSWYgR3JvdXAgdGhlbiBvbmx5IHNob3cgYXZhdGFyXG4gIGF2YXRhcklmR3JvdXA6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBtZXNzYWdlID0gdGhpcy5tZXNzYWdlQXNzaWduO1xuICBpbWFnZVVybCA9IFwiXCI7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY2hlY2tSZWFjdGlvbiA9IGNoZWNrTWVzc2FnZUZvckV4dGVuc2lvbnNEYXRhKFxuICAgICAgdGhpcy5NZXNzYWdlRGV0YWlscyxcbiAgICAgIFNUUklOR19NRVNTQUdFUy5SRUFDVElPTlNcbiAgICApO1xuXG4gICAgLyoqXG4gICAgICogIElmIEdyb3VwIHRoZW4gZGlzcGxheXMgQXZhdGFyIEFuZCBOYW1lXG4gICAgICovXG4gICAgaWYgKHRoaXMuTWVzc2FnZURldGFpbHMucmVjZWl2ZXJUeXBlID09PSBcImdyb3VwXCIpIHtcbiAgICAgIHRoaXMuYXZhdGFySWZHcm91cCA9IHRydWU7XG4gICAgICB0aGlzLm5hbWUgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5uYW1lO1xuICAgICAgdGhpcy5hdmF0YXIgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbmRlci5hdmF0YXI7XG4gICAgfVxuICAgIHRoaXMuc2V0SW1hZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hlbiB3aW5kb3cgc2l6ZSBpcyBjaGFuZ2VkIGluIHJlYWx0aW1lXG4gICAqL1xuICBASG9zdExpc3RlbmVyKFwid2luZG93OnJlc2l6ZVwiLCBbXSlcbiAgb25SZXNpemUoKSB7XG4gICAgdGhpcy5pbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgaWYgKHRoaXMuaW5uZXJXaWR0aCA+PSBcIjMyMFwiICYmIHRoaXMuaW5uZXJXaWR0aCA8PSBcIjc2N1wiKSB7XG4gICAgICB0aGlzLmNoZWNrU2NyZWVuU2l6ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmNoZWNrU2NyZWVuU2l6ZSA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnNldEltYWdlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNoZWNrU2NyZWVuU2l6ZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRodW1uYWlsLWdlbmVyYXRpb24gZXh0ZW5zaW9uIGlzIHByZXNlbnQgb3Igbm90IEFuZCB0aGVuIFNldHMgdGhlIGltYWdlXG4gICAqXG4gICAqL1xuICBzZXRJbWFnZSgpIHtcbiAgICB0aGlzLmltYWdlTG9hZGVyID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5NZXNzYWdlRGV0YWlscy5oYXNPd25Qcm9wZXJ0eShcIm1ldGFkYXRhXCIpKSB7XG4gICAgICBjb25zdCBtZXRhZGF0YSA9IHRoaXMuTWVzc2FnZURldGFpbHMubWV0YWRhdGE7XG5cbiAgICAgIGNvbnN0IGluamVjdGVkT2JqZWN0ID0gbWV0YWRhdGFbXCJAaW5qZWN0ZWRcIl07XG4gICAgICBpZiAoaW5qZWN0ZWRPYmplY3QgJiYgaW5qZWN0ZWRPYmplY3QuaGFzT3duUHJvcGVydHkoXCJleHRlbnNpb25zXCIpKSB7XG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbnNPYmplY3QgPSBpbmplY3RlZE9iamVjdFtcImV4dGVuc2lvbnNcIl07XG4gICAgICAgIGlmIChcbiAgICAgICAgICBleHRlbnNpb25zT2JqZWN0ICYmXG4gICAgICAgICAgZXh0ZW5zaW9uc09iamVjdC5oYXNPd25Qcm9wZXJ0eShcInRodW1ibmFpbC1nZW5lcmF0aW9uXCIpXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IHRodW1ibmFpbEdlbmVyYXRpb25PYmplY3QgPVxuICAgICAgICAgICAgZXh0ZW5zaW9uc09iamVjdFtcInRodW1ibmFpbC1nZW5lcmF0aW9uXCJdO1xuXG4gICAgICAgICAgY29uc3QgbXEgPSB3aW5kb3cubWF0Y2hNZWRpYShcbiAgICAgICAgICAgIFwiKG1pbi13aWR0aDozNjBweCkgYW5kIChtYXgtd2lkdGg6IDc2N3B4KVwiXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IGltYWdlVG9TaG93ID0gdGhpcy5jaG9vc2VJbWFnZSh0aHVtYm5haWxHZW5lcmF0aW9uT2JqZWN0KTtcbiAgICAgICAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgaW1nLnNyYyA9IGltYWdlVG9TaG93O1xuICAgICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmltYWdlTG9hZGVyID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmltYWdlVXJsID0gaW1nLnNyYztcbiAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoaW1nLnNyYyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldE1lc3NhZ2VJbWFnZVVybCgpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogSWYgdGh1bWJuYWlsLWV4dGVuc2lvbiBpcyBub3QgcHJlc2VudCB0aGVuIHRoaXMgd29ya3NcbiAgICpcbiAgICovXG4gIHNldE1lc3NhZ2VJbWFnZVVybCA9ICgpID0+IHtcbiAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLnNyYyA9IHRoaXMuTWVzc2FnZURldGFpbHMuZGF0YS51cmw7XG4gICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuaW1hZ2VMb2FkZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuaW1hZ2VVcmwgPSBpbWcuc3JjO1xuICAgIH07XG4gIH07XG4gIC8qKlxuICAgKiBTZXRzIGltYWdlIHVybCBpLmUgbWVkaXVtLXNpemUgb3Igc21hbGwtc2l6ZVxuICAgKiBAcGFyYW1cbiAgICovXG4gIGNob29zZUltYWdlKHRodW1ibmFpbEdlbmVyYXRpb25PYmplY3QpIHtcbiAgICBjb25zdCBzbWFsbFVybCA9IHRodW1ibmFpbEdlbmVyYXRpb25PYmplY3RbXCJ1cmxfc21hbGxcIl07XG4gICAgY29uc3QgbWVkaXVtVXJsID0gdGh1bWJuYWlsR2VuZXJhdGlvbk9iamVjdFtcInVybF9tZWRpdW1cIl07XG4gICAgY29uc3QgbXEgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6MzYwcHgpIGFuZCAobWF4LXdpZHRoOiA3NjdweClcIik7XG4gICAgbGV0IGltYWdlVG9TaG93ID0gbWVkaXVtVXJsO1xuICAgIGlmIChtcS5tYXRjaGVzKSB7XG4gICAgICBpbWFnZVRvU2hvdyA9IHNtYWxsVXJsO1xuICAgIH1cblxuICAgIHJldHVybiBpbWFnZVRvU2hvdztcbiAgfVxuICAvKipcbiAgICpcbiAgICogICBFbWl0cyBhY3Rpb24gdG8gdmlldyBpbWFnZSBpbiBmdWxsIHNjcmVlblxuICAgKi9cbiAgb3BlbigpIHtcbiAgICB0aGlzLmFjdGlvbkdlbmVyYXRlZC5lbWl0KHtcbiAgICAgIHR5cGU6IGVudW1zLlZJRVdfQUNUVUFMX0lNQUdFLFxuICAgICAgcGF5TG9hZDogeyAuLi50aGlzLm1lc3NhZ2UsIC4uLnRoaXMuTWVzc2FnZURldGFpbHMgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgVGltZS1TdGFtcCBmb3IgcmVjZWl2aW5nIGltYWdlXG4gICAqXG4gICAqL1xuICBnZXRUaW1lKCkge1xuICAgIGxldCBtc2dTZW50QXQgPSB0aGlzLk1lc3NhZ2VEZXRhaWxzLnNlbnRBdDtcbiAgICBsZXQgdGltZVN0YW1wID0gbmV3IERhdGUobXNnU2VudEF0ICogMTAwMCkudG9Mb2NhbGVUaW1lU3RyaW5nKFwiZW4tVVNcIiwge1xuICAgICAgaG91cjogXCJudW1lcmljXCIsXG4gICAgICBtaW51dGU6IFwibnVtZXJpY1wiLFxuICAgICAgaG91cjEyOiB0cnVlLFxuICAgIH0pO1xuICAgIHJldHVybiB0aW1lU3RhbXA7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhbGwgdGhlIGFjdGlvbnMgZW1pdHRlZCBieSB0aGUgY2hpbGQgY29tcG9uZW50cyB0aGF0IG1ha2UgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAqIEBwYXJhbSBFdmVudCBhY3Rpb25cbiAgICovXG4gIGFjdGlvbkhhbmRsZXIoYWN0aW9uKSB7XG4gICAgdGhpcy5hY3Rpb25HZW5lcmF0ZWQuZW1pdChhY3Rpb24pO1xuICB9XG59XG4iXX0=