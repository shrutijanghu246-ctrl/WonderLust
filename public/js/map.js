const mapDiv = document.getElementById("map");

if (mapDiv) {
  console.log("raw:", mapDiv.dataset.coordinates);

  const mapToken = mapDiv.dataset.token;
  const coordinates = JSON.parse(mapDiv.dataset.coordinates);
  const location = mapDiv.dataset.location; // plain string, no JSON.parse needed
  const map = new mapboxgl.Map({
    container: "map",
    accessToken: mapToken,
    style: "mapbox://styles/mapbox/standard",
    center: coordinates,
    zoom: 9,
  });

  const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h4>${location}</h4><p>Exact location will be provided after booking</p>`,
      ),
    )
    .addTo(map);
}

console.log("location:", mapDiv.dataset.location);
