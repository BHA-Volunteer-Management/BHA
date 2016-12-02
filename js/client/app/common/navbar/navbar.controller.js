class NavbarController {
  constructor(User) {
    "ngInject";
    this.name = 'navbar';
    this.user = User;
    this.navCollapsed = true;
    this.imgSrc = require('./logo.png');
  }
}

NavbarController.$inject = ['User'];
export default NavbarController;
