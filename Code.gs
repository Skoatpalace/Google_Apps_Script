function onOpen(e) {
  SpreadsheetApp.getUi().createMenu("Advanced").addItem("Add Event", "addEvent").addItem("Build Sheet", "createSheet").addToUi();
}

function eventMaker(data) {
  var calendar = CalendarApp.getCalendarById(data.calid);
  var event = calendar.createEvent(data.title, new Date(data.start), new Date(data.end), {
    description: data.description
    , location: "TBA"
  });
  SpreadsheetApp.getActiveSpreadsheet().toast("Event Added " + event.getOriginalCalendarId(), "Create Event");
  return {
    "eventId": event.getOriginalCalendarId()
  };
}

function eventChecker(data) {
  var holder = getEvents(data);
  SpreadsheetApp.getActiveSpreadsheet().toast("Sheet Created " + holder.sheetname, "Finding events");
  return holder;
}

function getEvents(data) {
  var temp = data.wordy.split(",");
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var newSheetName = new Date().toJSON().slice(0, 10);
  var checkExist = ss.getSheetByName(newSheetName);
  if (checkExist) {
    newSheetName += "-" + ss.getSheets().length;
  }
  var sheet = ss.insertSheet(newSheetName);
  sheet.appendRow(["ID", "Title", "Update", "Location", "Start", "End", "Description", "Guest"]);
  var cal = CalendarApp.getCalendarById(data.calid);
  var events = cal.getEvents(new Date(data.start), new Date(data.end));
  var myEvents = [];
  for (var x = 0; x < events.length; x++) {
    var tempArray = [];
    var tempTitle = events[x].getTitle().toLowerCase();
    var found = false;
    temp.forEach(function (item) {
      if (tempTitle.indexOf(item.trim().toLowerCase()) !== -1) {
        found = true;
      }
    })
    if (found) {
      tempArray.push(events[x].getOriginalCalendarId());
      tempArray.push(events[x].getTitle());
      tempArray.push(events[x].getLastUpdated());
      tempArray.push(events[x].getLocation());
      tempArray.push(events[x].getStartTime());
      tempArray.push(events[x].getEndTime());
      tempArray.push(events[x].getDescription());
      tempArray.push(events[x].getGuestList());
      myEvents.push(tempArray);
    }
  }
  sheet.getRange(2, 1, myEvents.length, myEvents[0].length).setValues(myEvents);
  return {
    "sheetname": newSheetName
  }
}

function doGet(e) {
  var template = HtmlService.createTemplateFromFile("newEvent");
  template.calid = CalendarApp.getDefaultCalendar().getId();
  var html = template.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);
  return html;
}

function openDialog(temp, title) {
  var template = HtmlService.createTemplateFromFile(temp);
  template.calid = CalendarApp.getDefaultCalendar().getId();
  var html = template.evaluate().setTitle(title);
  SpreadsheetApp.getUi().showModalDialog(html, title);
}

function addEvent() {
  openDialog("newEvent", "Add New Event");
}

function createSheet() {
  openDialog("formInput", "Search Calendar");
}