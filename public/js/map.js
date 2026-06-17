const mapToken = document.getElementById("map").dataset.token;

const map = new mapboxgl.Map({
  container: "map",
  accessToken: mapToken,
  style: "mapbox://styles/mapbox/standard",
  center: [77.209, 28.613], //starting postion [lng, lat]
  zoom: 5,
});
