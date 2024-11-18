Module.register("MMM-Recyclecollection", {
  // Default configuration
  defaults: {
    updateInterval: 10000, // Update every 10 seconds
  },

  start: function () {
    this.sendSocketNotification("GET_COLLECTION_DATA");
  },

  // Handle the data received from node_helper.js
socketNotificationReceived: function (notification, payload) {
  console.log(" allookesNotification received:", notification);  // Log notification name
  console.log(" aallooookes Payload received:", payload);           // Log the payload

  if (notification === "COLLECTION_DATA") {
    console.log("Setting collection data...", JSON.stringify(payload, null, 2));
    this.collectionData = payload;  // Ensure this is being set
    console.log("this.collectionData set:", this.collectionData); // Verify the data is being set
    setTimeout(() => {
      this.updateDom();  // Ensure updateDom happens after data is set
    }, 0);
  }
  if (notification === "COLLECTION_ERROR") {
    console.error("Error fetching collection data:", payload);
    this.collectionData = [{ fractionName: "Error", timestamp: payload }];
    this.updateDom();
  }
},

getDom: function () {
  var wrapper = document.createElement("div");
  wrapper.style.fontSize = "18px";
  wrapper.style.fontFamily = "Arial, sans-serif";

  console.log("Collection Data in getDom:", this.collectionData);  // Add this log to debug

  if (this.collectionData && this.collectionData.length > 0) {
    this.collectionData.forEach(item => {
      var collectionItem = document.createElement("div");
      collectionItem.classList.add("collection-item");
      collectionItem.innerHTML = `
        <div><strong>${item.fractionName}</strong></div>
        <div>Collection Date: ${item.timestamp}</div>
      `;
      wrapper.appendChild(collectionItem);
    });
  } else {
    wrapper.innerHTML = "No collection data available.";
  }
  return wrapper;
}

});
