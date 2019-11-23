$(document).ready(function () {
  setupNavbarContextMenu();
  setupHeroContextMenu();
  setupGenericContextMenu();
});

function setupNavbarContextMenu() {
  let navbarItems = {
    "edit-logo": {name: "Edit Logo"},
    "manage-menu": {name: "Manage Menu"},
    "set-design": {name: "Set Design"},
    "set-layout": {name: "Set Layout"},
    "sep1": "---------",
    "delete-component": {name: "Delete Component"},
  };

  $(function () {
    $.contextMenu({
      selector: '.navbar-edit-component',
      trigger: 'right',
      autoHide: true,
      callback: function (key) {
        window.parent.window.postMessage({"for": "opsonion", "action": `${key}`}, '*')
      },
      items: navbarItems
    });
  });

  $(function () {
    $.contextMenu({
      selector: '.navbar-edit-button',
      trigger: 'left',
      autoHide: true,
      callback: function (key) {
        window.parent.window.postMessage({"for": "opsonion", "action": `${key}`}, '*')
      },
      items: navbarItems
    });
  });
}

function setupHeroContextMenu() {
  let heroItems = {
    "edit-logo": {name: "Edit Text"},
    "manage-menu": {name: "Edit Image"},
    "set-design": {name: "Set Design"},
    "set-layout": {name: "Set Layout"},
    "sep1": "---------",
    "delete-component": {name: "Delete Component"},
  };

  $(function () {
    $.contextMenu({
      selector: '.hero-edit-component',
      trigger: 'right',
      autoHide: true,
      callback: function (key) {
        let m = "clicked: " + key;
        console.log(m);
      },
      items: heroItems
    });
  });

  $(function () {
    $.contextMenu({
      selector: '.hero-edit-button',
      trigger: 'left',
      autoHide: true,
      callback: function (key) {
        let m = "clicked: " + key;
        console.log(m);
      },
      items: heroItems
    });
  });
}

function setupGenericContextMenu() {
  /*
   Generic components:
   - Features
   - Footer
  */

  let genericItems = {
    "edit-text": {name: "Edit Text"},
    "set-design": {name: "Set Design"},
    "set-layout": {name: "Set Layout"},
    "sep1": "---------",
    "delete-component": {name: "Delete Component"},
  };

  $(function () {
    $.contextMenu({
      selector: '.features-edit-component',
      trigger: 'right',
      autoHide: true,
      callback: function (key) {
        let m = "clicked: " + key;
        console.log(m);
      },
      items: genericItems
    });
  });

  $(function () {
    $.contextMenu({
      selector: '.features-edit-button',
      trigger: 'left',
      autoHide: true,
      callback: function (key) {
        let m = "clicked: " + key;
        console.log(m);
      },
      items: genericItems
    });
  });

  $(function () {
    $.contextMenu({
      selector: '.footer-edit-component',
      trigger: 'right',
      autoHide: true,
      callback: function (key) {
        let m = "clicked: " + key;
        console.log(m);
      },
      items: genericItems
    });
  });

  $(function () {
    $.contextMenu({
      selector: '.footer-edit-button',
      trigger: 'left',
      autoHide: true,
      callback: function (key) {
        let m = "clicked: " + key;
        console.log(m);
      },
      items: genericItems
    });
  });
}
