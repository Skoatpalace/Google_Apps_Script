function onOpen(e) {
  SpreadsheetApp.getUi().createMenu("Advanced").addItem("Add Event", "addEvent").addItem("Build Sheet", "createSheet").addToUi();
}

function eventMaker(data) {
  var calendar = CalendarApp.getCalendarById(data.calid);
  var event = calendar.createEvent(data.title, new Date(data.start), new Date(data.end), {
    description: data.description
    , location: "TBA"
  });
  SpreadsheetApp.getActiveSpreadsheet().toast("Event Added " + event.getId(), "Create Event");
  return {
    "eventId": event.getId()
  };
}

function eventChecker(data) {
  var holder = getEvents(data);
  SpreadsheetApp.getActiveSpreadsheet().toast("Sheet Created " + holder.sheetname, "Finding events");
  return holder;
}

function getEvents(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var newSheetName = new Date().toJSON().slice(0, 10);
  var checkExist = ss.getSheetByName(newSheetName);
  if (checkExist) {
    newSheetName += "-" + ss.getSheets().length;
  }
  var sheet = ss.insertSheet(newSheetName);
  sheet.appendRow(["ID", "Title", "Update", "Location", "Start", "End", "Description", "Guest"]);
  return {
    "sheetname": newSheetName
  }
}

function openDialog(temp, title) {
  var template = HtmlService.createTemplateFromFile(temp);
  template.calid = CalendarApp.getDefaultCalendar().getId();
  var html = template.evaluate().setTitle(title);
  SpreadsheetApp.getUi().showModalDialog(html, title);
}

function addEvent() {
  openDialog("newEvent", "event 1");
}

function createSheet() {
  openDialog("formInput", "event 2");
}