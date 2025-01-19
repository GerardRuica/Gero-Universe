import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

/**
 * Component that shows a single item of the sidebar
 */
@Component({
  selector: 'sidebar-item',
  imports: [CommonModule],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss',
})
export class SidebarItemComponent implements AfterViewInit {
  /** To know if item logo area has or not logo */
  @ViewChild('itemLogoArea', { static: false }) itemLogoAreaRef!: ElementRef;

  /** Title of the item */
  @Input() title: string = '';
  /** Url to redirect */
  @Input() url: string = '';

  /** Boolean indicating if tme has or not logo */
  public hasItemLogo: boolean = false;

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
    this.hasItemLogo = this.itemLogoAreaRef.nativeElement.childNodes.length > 0;
    this.changeDetectorRef.detectChanges();
  }
}
