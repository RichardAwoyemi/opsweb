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
        "navbar-options-logo": { "name": "Edit Design" },
        "navbar-layout-logo": { "name": "Set Position" }
      },
    },
    "navbar-menu": {
      "name": "Menu",
      "items": {
        "navbar-options-menu": { "name": "Manage Items" },
        "navbar-layout-menu": { "name": "Set Position" },
      },
    },
    "sep": "---------",
    "delete-component": { name: "Delete" }
  };

  $(function () {
    $.contextMenu({
      selector: '.navbar-edit-component',
      trigger: 'right',
      autoHide: true,
      callback: function (key) {
        window.parent.window.postMessage({ "for": "opsonion", "action": `${ key }` }, '*')
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
        window.parent.window.postMessage({ "for": "opsonion", "action": `${ key }` }, '*')
      },
      items: navbarItems
    });
  });
}

function setupHeroContextMenu() {
  let heroItems = {
    "hero-colours": {
      name: "Colours"
    },
    "hero": {
      "name": "Hero",
      "items": {
        "hero-layout": { "name": "Set Position" }
      }
    },
    "hero-heading": {
      "name": "Heading",
      "items": {
        "hero-options-heading": { "name": "Edit Design" },
        "hero-layout-heading": { "name": "Set Position" }
      }
    },
    "hero-subheading": {
      "name": "Subheading",
      "items": {
        "hero-options-subheading": { "name": "Edit Design" },
        "hero-layout-subheading": { "name": "Set Position" }
      }
    },
    "hero-button": {
      "name": "Button",
      "items": {
        "hero-options-button": { "name": "Edit Design" },
        "hero-layout-button": { "name": "Set Position" }
      }
    },
    "sep1": "---------",
    "delete-component": { name: "Delete" }
  };

  $(function () {
    $.contextMenu({
      selector: '.hero-edit-component',
      trigger: 'right',
      autoHide: true,
      callback: function (key) {
        window.parent.window.postMessage({ "for": "opsonion", "action": `${ key }` }, '*')
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
        window.parent.window.postMessage({ "for": "opsonion", "action": `${ key }` }, '*')
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
        "footer-position": { "name": "Set Position" },
      },
    },
    "footer-copyright": {
      "name": "Copyright",
      "items": {
        "footer-options-copyright": { "name": "Edit Design" },
        "footer-layout-copyright": { "name": "Set Position" }
      },
    },
    "footer-social": {
      "name": "Social",
      "items": {
        "footer-options-social": { "name": "Manage Items" },
        "footer-layout-social": { "name": "Set Position" },
      },
    },
    "footer-menu": {
      "name": "Menu",
      "items": {
        "footer-options-menu": { "name": "Manage Items" },
        "footer-layout-menu": { "name": "Set Position" },
      },
    },
    "sep": "---------",
    "delete-component": { name: "Delete" }
  };

  $(function () {
    $.contextMenu({
      selector: '.footer-edit-component',
      trigger: 'right',
      autoHide: true,
      callback: function (key) {
        window.parent.window.postMessage({ "for": "opsonion", "action": `${ key }` }, '*')
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
        window.parent.window.postMessage({ "for": "opsonion", "action": `${ key }` }, '*')
      },
      items: footerItems
    });
  });
}
