function onOpen(e) {
  SpreadsheetApp.getUi().createMenu("Advanced")
  .addItem("Add Event", "addEvent")
  .addItem("Build Sheet", "createSheet")
  .addToUi();
}

function openDialog(temp, title){
  var template = HtmlService.createTemplateFromFile(temp);
  template.calid= CalendarApp.getDefaultCalendar().getId();
  var html = template.evaluate().setTitle(title);
  SpreadsheetApp.getUi()
  .showModalDialog(html, title);
 
}

function addEvent(){
  openDialog("newEvent", "Event 1");
}

function createSheet(){
  openDialog("formInput","Event 2");
}