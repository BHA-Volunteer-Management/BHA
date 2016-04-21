import AssignmentModule from './assignment'
import AssignmentController from './assignment.controller';
import AssignmentComponent from './assignment.component';
import AssignmentTemplate from './assignment.html';

describe('Assignment', () => {
  let $rootScope, $httpBackend, $componentController, makeController;

  beforeEach(window.module(AssignmentModule.name));
  beforeEach(inject((_$rootScope_, _$httpBackend_, _$componentController_) => {
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $componentController = _$componentController_;

    makeController = () => {
      return $componentController(AssignmentModule.name, {'$scope': $rootScope, '$uibModal': {}})
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    it('initializes with futureAssignments fetched from the API', () => {
      $httpBackend.expectGET(api + '/assignments/').respond({'results': [0, 1]});
      let controller = makeController();
      $httpBackend.flush();
      expect(controller).to.have.property('futureAssignments');
      expect(controller.futureAssignments).to.have.length(2);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AssignmentComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AssignmentTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AssignmentController);
      });
  });
});
