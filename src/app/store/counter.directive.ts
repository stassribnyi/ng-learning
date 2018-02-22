import {
  Directive, TemplateRef, Input, Attribute, SimpleChanges, ViewContainerRef, OnChanges
} from "@angular/core";

@Directive({
  selector: "[counterOf]"
})
export class CounterDirective implements OnChanges {
  constructor(private container: ViewContainerRef, private template: TemplateRef<Object>) { }

  @Input()
  counterOf: number;

  ngOnChanges(changes: SimpleChanges) {
    this.container.clear();
    for (let i = 0; i < this.counterOf; i++) {
      this.container.createEmbeddedView(this.template, new CounterDirectiveContext(i + 1));
    }
  }
}

class CounterDirectiveContext {
  constructor(public $implicit: any) { }
}
