import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatAddMembersComponent } from "./cometchat-add-members/cometchat-add-members.component";
import { BackdropModule } from "../backdrop/backdrop.module";

@NgModule({
  declarations: [CometchatAddMembersComponent],
  imports: [CommonModule, BackdropModule],
  exports: [CometchatAddMembersComponent],
})
export class CometchatAddMembersModule {}
