import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

/**
 * Component to show multiple sidebar items which are displayed in a drop-down menu
 */
@Component({
  selector: 'sidebar-item-container',
  imports: [CommonModule],
  templateUrl: './sidebar-item-container.component.html',
  styleUrl: './sidebar-item-container.component.scss',
})
export class SidebarItemContainerComponent implements AfterViewInit {
  /** To know if logo area has or not logo */
  @ViewChild('logoArea', { static: false }) logoAreaRef!: ElementRef;

  /** Boolean to indicate if container is opened or closed */
  public opened: boolean = false;
  /** Boolean indicating if item container has or not logo */
  public hasLogo: boolean = false;

  /**
   * Constructor of the class
   *
   * @param {ChangeDetectorRef} changeDetectorRef To force change detection after update
   */
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  /**
   * To initialize vars after view init
   */
  public ngAfterViewInit() {
    this.hasLogo = this.logoAreaRef.nativeElement.childNodes.length > 0;
    this.changeDetectorRef.detectChanges();
  }

  /**
   * To open or close container
   */
  public toggleOpened() {
    this.opened = !this.opened;
  }
}
