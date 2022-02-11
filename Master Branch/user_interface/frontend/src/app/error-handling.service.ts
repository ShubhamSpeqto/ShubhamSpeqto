import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

class Message {
constructor(readonly success: boolean, readonly time: Date, readonly message: string, readonly title?: string) {

}
}

@Injectable({
providedIn: 'root'
})
export class ErrorHandlingService {
messages = new Array<Message>();
notificationSubject = new Subject<string>();
notifications = this.notificationSubject.asObservable();

constructor(private toasterService: ToastrService) {
}

public success(message: string, title?: string): void {
this.messages.splice(0, 0, new Message(true, new Date(), message, title));
this.toasterService.success(message, title);
}

public error(message: string, title?: string): void {
this.messages.splice(0, 0, new Message(false, new Date(), message, title));
this.toasterService.error(message, title);
}

public sessionExpire(error): any {
return this.notificationSubject.next(error);
}

public clear(): void {
this.messages = new Array<Message>();
}

public get numberMessages(): number {
return this.messages.length;
}

public showErrorMessage(error): void {
if (error.error.httpStatus !== 401) {
this.error(error.error.message);
}
}
}


