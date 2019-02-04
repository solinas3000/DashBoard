import {
  Injectable,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef
} from '@angular/core'

  /**
   * Service used to dynamicaly load a component inside the rigth SideNavBar /
   * to use it, just change the variable in globalSharingVariable changeOpenEndSideNav(res) with res = {
      component: MyDynamicComponent,
      variable: whatever you need
    }
   * See openSideNav() line 155 in StructWorkspaceComponent for a example
   */
@Injectable()
export class ComponentFactoryService {
  rootViewContainer
  componentRef
  constructor(private resolver: ComponentFactoryResolver) {}

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }

  addDynamicComponent(res) {
    this.rootViewContainer.clear()
    const factory = this.resolver.resolveComponentFactory(res.component);
    this.componentRef = this.rootViewContainer.createComponent(factory);
    console.log(res.variable)
    this.componentRef.instance.data = res.variable;
  }
}
