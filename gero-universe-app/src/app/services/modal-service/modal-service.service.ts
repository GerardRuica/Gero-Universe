import { Injectable, ViewContainerRef, ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalComponent } from '../../shared/ui/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private componentRef!: ComponentRef<ModalComponent>;
  private componentSubscriber!: Subject<string>;

  openModal(
    entry: ViewContainerRef,
    options?: { size?: string; title?: string }
  ) {
    entry.clear();
    this.componentRef = entry.createComponent(ModalComponent);
    this.componentRef.instance.title = options?.title;
    this.componentRef.instance.size = options?.size;
    this.componentRef.instance.closeEvent.subscribe(() => this.closeModal());
    this.componentRef.instance.submitEvent.subscribe(() => this.confirm());
    this.componentSubscriber = new Subject<string>();
    return this.componentSubscriber.asObservable();
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm() {
    this.componentSubscriber.next('confirm');
    this.closeModal();
  }
}
