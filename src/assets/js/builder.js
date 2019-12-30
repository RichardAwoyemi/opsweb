let builderShowcaseId, componentIconClass, builderShowcase, currentElement, currentElementChangeFlag,
  elementRectangle, countdown, dragOverQueueProcessTimer, htmlToInsert, components;

let singleUseComponents = [
  '<app-builder-navbar></app-builder-navbar>',
  '<app-builder-hero></app-builder-hero>',
  '<app-builder-footer></app-builder-footer>'
];

let container = document.querySelector('body');

let observer = new MutationObserver(function () {
  preloadDragFeedbackImages();
});

observer.observe(container, {
  childList: true,
  attributes: true,
  characterData: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true
});

function builderShowcaseLoaded() {
  builderShowcaseId = '#builder-showcase';
  componentIconClass = '.component-icon';
  builderShowcase = $(builderShowcaseId).get(0).contentWindow;

  $(document).ready(function () {
    preloadDragFeedbackImages();
  });

  $(document).on('dragstart', componentIconClass, function (e) {
    componentDragStarted(e);
  });

  $(document).on('dragend', componentIconClass, function () {
    componentDragEnded(builderShowcase);
  });

  let onShowcaseDragEnter = function (e) {
    listenForShowcaseDragEnterEvents(e)
  };

  let onShowcaseDragover = function (e) {
    listenForShowcaseDragOverEvents(e);
  };

  let onShowcaseDrop = function (e) {
    listenForShowcaseDropEvent(e);
  };

  builderShowcase.addEventListener('dragenter', onShowcaseDragEnter, false);
  builderShowcase.addEventListener('dragover', onShowcaseDragover, false);
  builderShowcase.addEventListener('drop', onShowcaseDrop, false);
}

function preloadDragFeedbackImages() {
  const dragElements = document.querySelectorAll('.component-icon');
  let images = {};
  for (let dragElement of dragElements) {
    let src = dragElement.dataset.src;
    let img = new Image();
    img.src = src;
    images[src] = img;
    dragElement.addEventListener('dragstart', (e) => {
      let src = e.currentTarget["dataset"].src;
      let img = images[src];
      e.dataTransfer.setDragImage(img, 0, 0);
      e.dataTransfer.setData('text/uri-list', src);
    });
  }
}

function componentDragStarted(e) {
  dragOverQueueProcessTimer = setInterval(function () {
    dragDropFunctions.processDragOverQueue();
  }, 100);
  htmlToInsert = e.originalEvent.srcElement.dataset.insertHtml;
}

function componentDragEnded() {
  clearInterval(dragOverQueueProcessTimer);
}

function listenForShowcaseDragEnterEvents(e) {
  e.preventDefault();
  e.stopPropagation();
  currentElement = $(e.target);
  currentElementChangeFlag = true;
  elementRectangle = e.target.getBoundingClientRect();
  countdown = 1;
}

function listenForShowcaseDragOverEvents(e) {
  e.preventDefault();
  e.stopPropagation();
  if (countdown % 15 !== 0 && currentElementChangeFlag === false) {
    countdown = countdown++;
    return;
  }
  e = e || e.event;
  const x = e.screenX;
  const y = e.screenY;
  countdown = countdown++;
  currentElementChangeFlag = false;
  const mousePosition = {x: x, y: y};
  dragDropFunctions.addEntryToDragOverQueue(currentElement, elementRectangle, mousePosition);
}

function listenForShowcaseDropEvent(e) {
  addComponent(e);
  e.preventDefault();
  e.stopPropagation();
}

function addComponent(e) {
  if (htmlToInsert) {
    if (htmlToInsert !== '<app-builder-placeholder></app-builder-placeholder>') {
      const componentId = $(e.target).parent().parent().parent().parent().attr("id");
      if (componentId) {
        const tempComponentIndex = componentId.split('-');
        const componentIndex = parseInt(tempComponentIndex[1]);
        let componentExists = false;

        components = JSON.parse(sessionStorage.getItem('components'));
        for (let i = 0; i < components.length; i++) {
          if (components[i] === htmlToInsert) {
            if (isInArray(components[i], singleUseComponents))
              componentExists = true;
          }
          if (i === componentIndex) {
            if (components[i] === "<app-builder-placeholder></app-builder-placeholder>") {
              components[i] = htmlToInsert;
            }
          }
        }

        if (componentExists === false) {
          components.splice(componentIndex, 0, "<app-builder-placeholder></app-builder-placeholder>");
          components.splice(componentIndex + 2, 0, "<app-builder-placeholder></app-builder-placeholder>");
          components = dedupeAdjacent(components, '<app-builder-placeholder></app-builder-placeholder>');
          sessionStorage.setItem('components', JSON.stringify(components));
          window.parent.window.postMessage({"for": "opsonion", "action": "component-added", "data": components}, '*')
        } else {
          window.parent.window.postMessage({"for": "opsonion", "action": "component-exists"}, '*')
        }

        htmlToInsert = null;
      }
    }
  }
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function dedupeAdjacent(a, targets) {
  return a.filter((e, i) => e !== a[i - 1] || !targets.includes(e))
}

// The drag over event gets fired whenever the mouse moves. This results in too many events
// which can be very costly and make the UI super slow. In order to prevent this from
// happening, we need to filter out the events and process only the a few of them instead.

const dragDropFunctions = {
  dragOverQueue: [],
  addEntryToDragOverQueue: function ($element, elementRectangle, mousePosition) {
    const newEvent = [$element, elementRectangle, mousePosition];
    this.dragOverQueue.push(newEvent);
  },
  processDragOverQueue: function () {
    this.dragOverQueue = [];
  }
};
