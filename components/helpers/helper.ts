import { DragStart, DragUpdate } from "@krishna2323/react-beautiful-dnd";


export const onDragUpdateHandler = (ev:any) => {
  if (ev.destination) {
    // Removes the placeholder if it exists
    document.getElementById("placeholder")?.remove();

    // Tasks in the currently hovered over container
    const childTaskElements: HTMLCollection = document.querySelector(
      `#${ev.destination.droppableId}`
    )!.children;

    // Element just after the currently placed selected card
    const elementAfter = childTaskElements.item(ev.destination.index);

    // Selected Element
    let selectedElemet: HTMLCollection | NodeListOf<HTMLDivElement> =
      document.querySelectorAll(
        `[data-rbd-drag-handle-draggable-id="${ev.draggableId}"]`
      );
    let width = selectedElemet[0].offsetWidth;
    let height = selectedElemet[0].offsetHeight;

    // Adding the placeholder
    if (elementAfter) {
      elementAfter.insertAdjacentHTML(
        "beforebegin",
        getPlaceHolder(width, height)
      );
    }
  }
};

export const onDragStartHandler = (ev: any) => {
  // Removes the placeholder if it exists
  document.getElementById("placeholder")?.remove();
  // Tasks in the currently hovered over container
  const childTaskElements: HTMLCollection = document.querySelector(
    `#${ev.source.droppableId}`
  )!.children;

  // Element just after the currently placed selected card
  const elementAfter = childTaskElements.item(ev.source.index);

  // Selected Element
  let selectedElemet: HTMLCollection | NodeListOf<HTMLDivElement> =
    document.querySelectorAll(
      `[data-rbd-drag-handle-draggable-id="${ev.draggableId}"]`
    );
  let width = selectedElemet[0].offsetWidth;
  let height = selectedElemet[0].offsetHeight;
  if (elementAfter) {
    elementAfter.insertAdjacentHTML(
      "beforebegin",
      getPlaceHolder(width, height)
    );
  }
};

const getPlaceHolder = (
  width: number,
  height: number,
  translateY: number = 0
): string => {
  let placeholder = document.createElement("div");
  placeholder.style.width = `${width}px`;
  placeholder.style.height = `${height}px`;
  placeholder.style.background = "#adb5bd";
  placeholder.style.borderRadius = "8px";
  placeholder.style.marginBottom = "2.4rem";
  // placeholder.style.maxHeight=".1px"
  let html = `<div id="placeholder" style="width:${width}px;
                                    border-radius:10px;
                                    height:.1px;
                                    position:relative;
                                    display:block;
                          ">
                    <div id="placeholder-inner" style="position:absolute;
                                        top:0;
                                        left:0;
                                        border-radius:10px;
                                        width:${width}px;
                                        height:${height}px;
                                        transition:all .5s;
                                        transform:translate(0,${translateY}px);">
                    </div>
               </div>`;
  return html;
};
