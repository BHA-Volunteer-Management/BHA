import NotificationsModalController from './notificationsModal.controller';

describe('NotificationsModal', () => {
  let $rootScope, makeController, $scope, uibModalInstance, http, volunteerList, Enums;
  
  beforeEach(inject(($injector) => {
    uibModalInstance = {
      close: function() {},
      dismiss: function(str) {}
    };
    
    http = {
      post: function(url, obj) {}
    };
    
    Enums = {
      carriers: {
        0: "Sprint",
        1: "Verizon",
        2: "AT&T",
        3: "Other"
      },
      preferred_contact: {
        0: "Email",
        1: "Text",
        2: "Both"
      }
    };
    
    volunteerList = [{
      id: 1,
      first_name: "Tom",
      last_name: "Jones",
      contact: {
        phone_number: "6177778772",
        carrier: 1,
        email: "a@b.com",
        preferred_contact: 0
      }
    }, {
      id: 2,
      first_name: "Bob",
      last_name: "Smith",
      contact: {
        phone_number: "2207318972",
        carrier: 3,
        email: "hi@b.com",
        preferred_contact: 1
      }
    }, {
      id: 3,
      first_name: "Rob",
      last_name: "Smits",
      contact: {
        phone_number: "1670892037",
        carrier: 2,
        email: "rob@b.com",
        preferred_contact: 1
      }
    }];
    
    makeController = ($scope) => {
      return new NotificationsModalController($scope, {}, uibModalInstance, http, volunteerList, Enums);
    };
  }));

  describe('Controller', () => {
    it('properly initializes list of selected volunteers', () => {
      var $scope = {};
      var volunteerList = [{
        id: 1,
        first_name: "Tom",
        last_name: "Jones",
        contact: {
          phone_number: "6177778772",
          carrier: 1,
          email: "a@b.com",
          preferred_contact: 0
        }
      }, {
        id: 2,
        first_name: "Bob",
        last_name: "Smith",
        contact: {
          phone_number: "2207318972",
          carrier: 3,
          email: "hi@b.com",
          preferred_contact: 1
        }
      }, {
        id: 3,
        first_name: "Rob",
        last_name: "Smits",
        contact: {
          phone_number: "1670892037",
          carrier: 2,
          email: "rob@b.com",
          preferred_contact: 1
        }
      }];
      
      let controller = makeController($scope);
      expect($scope).to.have.property('allVolunteers');
      expect($scope).to.have.property('selectedVolunteers');
      expect($scope.selectedVolunteers.length).to.equal(3);
      
      for (var i = 0; i < 3; i++) {
        var curObj = $scope.selectedVolunteers[i];
        expect(curObj).to.have.property('id');
        
        if (curObj.id === 1) {
          expect(curObj).to.have.property('fullName');
          expect(curObj.fullName).to.equal('Tom Jones');
          expect(curObj).to.have.property('phoneNumber');
          expect(curObj.phoneNumber).to.equal('6177778772');
          expect(curObj).to.have.property('carrier');
          expect(curObj.carrier).to.equal(1);
          expect(curObj).to.have.property('email');
          expect(curObj.email).to.equal('a@b.com');
          expect(curObj).to.have.property('showEmail');
          expect(curObj.showEmail).to.equal(true);
          expect(curObj).to.have.property('onlyEmail');
          expect(curObj.showEmail).to.equal(true);
        } else if (curObj.id === 2) {
          expect(curObj).to.have.property('fullName');
          expect(curObj.fullName).to.equal('Bob Smith');
          expect(curObj).to.have.property('phoneNumber');
          expect(curObj.phoneNumber).to.equal('2207318972');
          expect(curObj).to.have.property('carrier');
          expect(curObj.carrier).to.equal(3);
          expect(curObj).to.have.property('email');
          expect(curObj.email).to.equal('hi@b.com');
          expect(curObj).to.have.property('showEmail');
          expect(curObj.showEmail).to.equal(true);
          expect(curObj).to.have.property('onlyEmail');
          expect(curObj.showEmail).to.equal(true);
        } else {
          expect(curObj.id).to.equal(3);
          expect(curObj).to.have.property('fullName');
          expect(curObj.fullName).to.equal('Rob Smits');
          expect(curObj).to.have.property('phoneNumber');
          expect(curObj.phoneNumber).to.equal('1670892037');
          expect(curObj).to.have.property('carrier');
          expect(curObj.carrier).to.equal(2);
          expect(curObj).to.have.property('email');
          expect(curObj.email).to.equal('rob@b.com');
          expect(curObj).to.have.property('showEmail');
          expect(curObj.showEmail).to.equal(false);
          expect(curObj).to.have.property('onlyEmail');
          expect(curObj.showEmail).to.equal(false);
        }
      }
    });
    
    it('removes a volunteer from the list on x click', () => {
      var $scope = {};
      var volunteerList = [{
        id: 1,
        first_name: "Tom",
        last_name: "Jones",
        contact: {
          phone_number: "6177778772",
          carrier: 1,
          email: "a@b.com",
          preferred_contact: 0
        }
      }, {
        id: 2,
        first_name: "Bob",
        last_name: "Smith",
        contact: {
          phone_number: "2207318972",
          carrier: 3,
          email: "hi@b.com",
          preferred_contact: 1
        }
      }, {
        id: 3,
        first_name: "Rob",
        last_name: "Smits",
        contact: {
          phone_number: "1670892037",
          carrier: 2,
          email: "rob@b.com",
          preferred_contact: 1
        }
      }];
      
      let controller = makeController($scope);
      expect($scope).to.have.property('removeFromTable');
      $scope.removeFromTable($scope.selectedVolunteers[1]);
      expect($scope.selectedVolunteers.length).to.equal(2);
      for (var i = 0; i < 2; i++) {
        expect($scope.selectedVolunteers[i].id).not.to.equal(2);
      }
    });
    
    it('generates the correct post object', () => {
      var $scope = {};
      var volunteerList = [{
        id: 1,
        first_name: "Tom",
        last_name: "Jones",
        contact: {
          phone_number: "6177778772",
          carrier: 1,
          email: "a@b.com",
          preferred_contact: 0
        }
      }, {
        id: 2,
        first_name: "Bob",
        last_name: "Smith",
        contact: {
          phone_number: "2207318972",
          carrier: 3,
          email: "hi@b.com",
          preferred_contact: 1
        }
      }, {
        id: 3,
        first_name: "Rob",
        last_name: "Smits",
        contact: {
          phone_number: "1670892037",
          carrier: 2,
          email: "rob@b.com",
          preferred_contact: 1
        }
      }];
      
      let controller = makeController($scope);
      expect($scope).to.have.property('notificationSubject');
      expect($scope).to.have.property('notificationMessage');
      expect($scope).to.have.property('getPostObject');
      
      $scope.notificationSubject = "BHA Assignment";
      $scope.notificationMessage = "Hello, there is a new assignment for you!";
      let postObj = $scope.getPostObject();
      
      expect(postObj).to.have.property('subject');
      expect(postObj).to.have.property('message');
      expect(postObj).to.have.property('emails');
      expect(postObj).to.have.property('texts');
      
      expect(postObj.subject).to.equal("BHA Assignment");
      expect(postObj.message).to.equal("Hello, there is a new assignment for you!");
      
      let postEmails = postObj.emails;
      expect(postEmails.length).to.equal(2);
      
      var numProperEmails = 0;
      for (var i = 0; i < 2; i++) {
        var curObj = postEmails[i];
        expect(curObj).to.have.property('email');
        expect(curObj).to.have.property('id');
        if (curObj.id === 1 && curObj.email === "a@b.com") {
          numProperEmails++;
        }
        
        if (curObj.id === 2 && curObj.email === "hi@b.com") {
          numProperEmails++;
        }
      }
      
      expect(numProperEmails).to.equal(2);
      
      let postTexts = postObj.texts;
      expect(postTexts.length).to.equal(1);
      expect(postTexts[0]).to.have.property('id');
      expect(postTexts[0]).to.have.property('phoneNumber');
      expect(postTexts[0]).to.have.property('carrier');
      expect(postTexts[0].id).to.equal(3);
      expect(postTexts[0].phoneNumber).to.equal('1670892037');
      expect(postTexts[0].carrier).to.equal('AT&T');
    });
    
    it('properly checks and unchecks Force All on other updates', () => {
      var $scope = {};
      var volunteerList = [{
        id: 1,
        first_name: "Tom",
        last_name: "Jones",
        contact: {
          phone_number: "6177778772",
          carrier: 1,
          email: "a@b.com",
          preferred_contact: 0
        }
      }, {
        id: 2,
        first_name: "Bob",
        last_name: "Smith",
        contact: {
          phone_number: "2207318972",
          carrier: 3,
          email: "hi@b.com",
          preferred_contact: 1
        }
      }, {
        id: 3,
        first_name: "Rob",
        last_name: "Smits",
        contact: {
          phone_number: "1670892037",
          carrier: 2,
          email: "rob@b.com",
          preferred_contact: 1
        }
      }];
      
      let controller = makeController($scope);
      expect($scope).to.have.property('updateEmailAll');
      expect($scope).to.have.property('emailAll');
      expect($scope.emailAll).to.equal(false);
      let checkVolunteer = $scope.selectedVolunteers[2];
      checkVolunteer.showEmail = true;
      $scope.updateEmailAll();
      expect($scope.emailAll).to.equal(true);
      checkVolunteer.showEmail = false;
      $scope.updateEmailAll();
      expect($scope.emailAll).to.equal(false);
    });
    
    it('Forces all email on check Force All', () => {
      var $scope = {};
      var volunteerList = [{
        id: 1,
        first_name: "Tom",
        last_name: "Jones",
        contact: {
          phone_number: "6177778772",
          carrier: 1,
          email: "a@b.com",
          preferred_contact: 1
        }
      }, {
        id: 2,
        first_name: "Bob",
        last_name: "Smith",
        contact: {
          phone_number: "2207318972",
          carrier: 3,
          email: "hi@b.com",
          preferred_contact: 1
        }
      }, {
        id: 3,
        first_name: "Rob",
        last_name: "Smits",
        contact: {
          phone_number: "1670892037",
          carrier: 2,
          email: "rob@b.com",
          preferred_contact: 1
        }
      }];
      
      let controller = makeController($scope);
      expect($scope.emailAll).to.equal(false);
      expect($scope).to.have.property('forceEmailAll');
      $scope.emailAll = true;
      $scope.forceEmailAll();
      for (var i; i < $scope.selectedVolunteers.length; i++) {
        expect($scope.selectedVolunteers[i].showEmail).to.equal(true);
      }
    });
    
    /*
    it('disables notify button when no selections', () => {
      let controller = makeController();
      expect(controller).to.have.property('notifyModalOpen');
      expect(controller.notifyModalOpen).to.equal(false);

      expect(controller).to.have.property('selectedVolunteers');
      expect(controller.selectedVolunteers).to.have.length(0);

      expect(controller).to.have.property('notifyButtonEnabled');
      expect(controller.notifyButtonEnabled).to.equal(false);
    });

    it('enables notify button when one selection', () => {
      let controller = makeController();
      controller.selectVolunteer(1);
      expect(controller.selectedVolunteers).to.have.length(1);
      expect(controller.notifyButtonEnabled).to.equal(true);
    });

    it('adds volunteer to selected list when volunteer is selected', () => {
      let controller = makeController();
      controller.selectVolunteer(1);
      expect(controller.selectedVolunteers.indexOf(1)).to.be.above(-1);
    });

    it('removes volunteer from selected list when volunteer is deselected', () => {
      let controller = makeController();
      controller.selectVolunteer(1);
      controller.selectVolunteer(2);
      controller.selectVolunteer(3);
      controller.deselectVolunteer(2);
      expect(controller.selectedVolunteers.indexOf(2)).to.equal(-1);
    });

    it('retrieves correct information about a volunteer', () => {
      let controller = makeController();
      let volunteer1 = {
        id: 1,
        firstName: 'John',
        lastName: 'Smith',
        languages; ['Spanish'],
        email: 'john@smith.com',
        phoneNumber: '6178762348',
        preferredContact: 'Email'
    };

      controller.selectVolunteer(1);
      let volunteerInfo = controller.getVolunteerInfo(1);
      expect(volunteerInfo).to.have.property('email');
      expect(volunteerInfo.email).to.equal('john@smith.com');

      expect(volunteerInfo).to.have.property('firstName');
      expect(volunteerInfo.email).to.equal('John');

      expect(volunteerInfo).to.have.property('lastName');
      expect(volunteerInfo.email).to.equal('Smith');

      expect(volunteerInfo).to.have.property('phoneNumber');
      expect(volunteerInfo.phoneNumber).to.equal('6178762348');

      expect(volunteerInfo).to.have.property('preferredContact');
      expect(volunteerInfo.preferredContact).to.equal('Email');
    });


    it('places volunteers in correct table', () => {
      let controller = makeController();
      let volunteer1 = {
        id: 1,
        firstName: 'John',
        lastName: 'Smith',
        languages; ['Spanish'],
        email: 'john@smith.com',
        phoneNumber: '6178762348',
        preferredContact: 'Email'
    };

      let volunteer2 = {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        languages; ['Spanish'],
        email: 'jane@smith.com',
        phoneNumber: '6178562348',
        preferredContact: 'Text'
    };

      controller.selectVolunteer(1);
      controller.selectVolunteer(2);

      let emailVolunteers = controller.getEmailVolunteers();
      let textVolunteers = controller.getTextVolunteers();

      expect(emailVolunteers.indexOf(2)).to.equal(-1);
      expect(emailVolunteers.indexOf(1)).to.be.above(-1);
      expect(emailVolunteers.indexOf(1)).to.equal(-1);
      expect(emailVolunteers.indexOf(2)).to.be.above(-1);
    });*/
  });
});
