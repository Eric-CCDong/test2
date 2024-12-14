class HorizontalTabs {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.myScroll = null;
    this.tabs = this.container.querySelector(".tabs").children;
    this.activeIndex = 0; // Default to the first tab being active
    this.eventListeners = []; // Store event listeners

    this.init();
    this.addClickEventListeners();
  }

  init() {
    if (!this.container) return;

    this.myScroll = new IScroll(this.container, {
      scrollX: true, // Enable horizontal scrolling
      scrollY: false, // Disable vertical scrolling
      mouseWheel: true, // Enable mouse wheel support
      click: true, // Enable click events
      bounce: true, // Enable rubber band effect
      interactiveScrollbars: true, // Enable interactive scrollbars
      shrinkScrollbars: "scale", // Scale the scrollbars
      fadeScrollbars: true, // Fade in/out the scrollbars
      preventDefault: false, // Prevent default actions
    });

    window.addEventListener("resize", () => this.onResize());
  }

  onResize() {
    setTimeout(() => {
      if (this.myScroll) {
        this.myScroll.refresh();
      }
    }, 0);
  }

  destroy() {
    if (this.myScroll) {
      this.myScroll.destroy();
      this.myScroll = null;
    }
  }

  addClickEventListeners() {
    for (let i = 0; i < this.tabs.length; i++) {
      this.tabs[i].addEventListener("click", () => this.onClick(i));
    }
  }

  onClick(index) {
    if (index === this.activeIndex) return;

    // Remove active class from the current tab
    this.tabs[this.activeIndex].classList.remove("active");

    // Set the clicked tab as active
    this.tabs[index].classList.add("active");
    this.activeIndex = index;

    // Trigger all event listeners with the clicked tab's index
    this.eventListeners.forEach((listener) => listener(index));
  }

  // Add an event listener for tab clicks
  addEventListener(type, listener) {
    if (type === "tabclick") {
      this.eventListeners.push(listener);
    }
  }

  // Remove an event listener for tab clicks
  removeEventListener(type, listener) {
    if (type === "tabclick") {
      this.eventListeners = this.eventListeners.filter((l) => l !== listener);
    }
  }
}

// Export the class for use in other files (if using modules)
// export default HorizontalTabs;
