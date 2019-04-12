function onOpen(e) {
  SpreadsheetApp.getUi().createMenu("Advanced")
  .addItem("Add Event", "addEvent")
  .addItem("Build Sheet", "createSheet")
  .addToUi();
}

function openDialog(temp, title){
  Logger.log(temp);
  //var html = HtmlService.createHtmlOutputFromFile(temp);
  var template = HtmlService.createTemplateFromFile(temp);
  template.calid="100";
  var html = template.evaluate().setTitle(title);
  SpreadsheetApp.getUi()
  .showModalDialog(html, title) // Or DocumentApp or SlidesApp or FormApp.
      //.showSidebar(html);
 
}

function addEvent(){
  openDialog("newEvent", "Event 1");
}

function createSheet(){
  openDialog("formInput","Event 2");
}