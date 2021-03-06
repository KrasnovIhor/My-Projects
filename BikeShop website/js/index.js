// Initialize and add the map
function initMap() {
  // The location of BikeShop
  const odesa = { lat: 46.46827329746018, lng: 30.71849116976889 };
  // The map, centered at BikeShop
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: odesa,
  });
  // The marker, positioned at BikeShop
  const marker = new google.maps.Marker({
    position: odesa,
    map: map,
  });
}

