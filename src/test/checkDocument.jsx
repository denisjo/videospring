var React = require('react');
var ReactAddons    = require('react/addons')
var ReactTestUtils = React.addons.TestUtils;
var Contract = require('../../components/Contract.jsx');
var Accordion = require('../../components/Accordion.jsx');

var appConstants = require('../../constants/ContractTemplateConstants');


var expect = require('expect');


describe('Contract', () => {
  var contractActions ;
  var DocumentUIStore ;
  let _document;

  beforeEach(() => {
      jasmine.clock().install(); // Mock out the built in timers
      contractActions = require('../../actions/ContractActions');
      DocumentUIStore = require('../../stores/DocumentUIStore');

      contractActions.receiveContract();
      _document = DocumentUIStore.getDocument();

    });

  afterEach(() => {
   jasmine.clock().uninstall();
 });

  it('is appearing', () => {
    var contract = <Contract/>;
    var test = ReactTestUtils.renderIntoDocument(contract);

    expect(test).toBeTruthy();

  });

  it("Click expand all document", function () {
    var docType = appConstants.DOCUMENT_ACCORDION;
    var accordion = _document.accordion;

    jasmine.clock().tick(); // Advance the clock to the next tick

    var _updateParent = function () {
      return 'fake';
    }
    var accordionCompnent =  <Accordion type={docType}  accordion={accordion} updateParent={_updateParent}/>;
    var accordionDoc = ReactTestUtils.renderIntoDocument(accordionCompnent);

    expect(DocumentUIStore.getDocument().accordion.expand).toBe(false);

    ReactTestUtils.Simulate.click(accordionDoc.refs.documentAccordionId);


    expect(DocumentUIStore.getDocument().accordion.expand).toBe(true);
    /*** Double check if the title (UI) is ok ***/
    expect(accordionDoc.props.accordion.title).toBe("Collapse document");
  });

  it("Click expand first chapter", function () {
    var chapterType = appConstants.CHAPTER_ACCORDION;
    // 0 is 'chapterId1'
    let _chapterToTest = DocumentUIStore.getChapters()[0];
    let chapterId = _chapterToTest.id;

    var accordion = _chapterToTest.accordion;


    jasmine.clock().tick(); // Advance the clock to the next tick

    var _updateParent = function () {
      return 'fake';
    }

    var accordionCompnent =  <Accordion objectId={chapterId} type={chapterType}  accordion={accordion} updateParent={_updateParent}/>;
    var accordionDoc = ReactTestUtils.renderIntoDocument(accordionCompnent);

    expect(_chapterToTest.accordion.expand).toBe(false);

    ReactTestUtils.Simulate.click(accordionDoc.refs.chapterAccordionId);

    expect(_chapterToTest.accordion.expand).toBe(true);
    /*** Double check if the title (UI) is ok ***/
    expect(accordionDoc.props.accordion.title).toBe("Collapse chapter");
  });

  it("Open Side bar", function () {
    var contract = <Contract/>;
    var contractBody = ReactTestUtils.renderIntoDocument(contract);

    expect(contractBody.state.contractTemplate.openSideBar).toBe(false);


    ReactTestUtils.Simulate.click(contractBody.refs.linkSlideBar);
    jasmine.clock().tick(); // Advance the clock to the next tick

    expect(contractBody.state.contractTemplate.openSideBar).toBe(true);
    /*** Double check with the value within the store ***/
    expect(DocumentUIStore.getDocument().openSideBar).toBe(true);

  });

});
