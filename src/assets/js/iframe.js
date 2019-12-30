$(document).ready(function () {
  setupNavbarContextMenu();
  setupHeroContextMenu();
  setupFooterContextMenu();
});

function setupNavbarContextMenu() {
  let navbarItems = {
    "navbar-colours": {
      "name": "Colours"
    },
    "navbar-logo": {
      "name": "Logo",
      "items": {
        "navbar-options-logo": {"name": "Edit Design"},
        "navbar-layout-logo": {"name": "Set Position"}
      },
    },
    "navbar-menu": {
      "name": "Menu",
      "items": {
        "navbar-options-menu": {"name": "Manage Items"},
        "navbar-layout-menu": {"name": "Set Position"},
      },
    },
    "sep": "---------",
    "delete-component": {name: "Delete"}
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
      },
      items: heroItems
    });
  });
}

function setupFooterContextMenu() {
  let footerItems = {
    "footer-colours": {
      "name": "Colours"
    },
    "footer": {
      "name": "Footer",
      "items": {
        "footer-position": {"name": "Set Position"},
      },
    },
    "footer-copyright": {
      "name": "Copyright",
      "items": {
        "footer-options-copyright": {"name": "Edit Design"},
        "footer-layout-copyright": {"name": "Set Position"}
      },
    },
    "footer-social": {
      "name": "Social",
      "items": {
        "footer-options-social": {"name": "Manage Items"},
        "footer-layout-social": {"name": "Set Position"},
      },
    },
    "footer-menu": {
      "name": "Menu",
      "items": {
        "footer-options-menu": {"name": "Manage Items"},
        "footer-layout-menu": {"name": "Set Position"},
      },
    },
    "sep": "---------",
    "delete-component": {name: "Delete"}
  };

  $(function () {
    $.contextMenu({
      selector: '.footer-edit-component',
      trigger: 'right',
      autoHide: true,
      callback: function (key) {
        window.parent.window.postMessage({"for": "opsonion", "action": `${key}`}, '*')
      },
      items: footerItems
    });
  });

  $(function () {
    $.contextMenu({
      selector: '.footer-edit-button',
      trigger: 'left',
      autoHide: true,
      callback: function (key) {
        window.parent.window.postMessage({"for": "opsonion", "action": `${key}`}, '*')
      },
      items: footerItems
    });
  });
}
