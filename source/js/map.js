ymaps.ready(initMap);

function initMap() {
  var centerMap = [59.936326864825475, 30.321777768508905];
  if (window.matchMedia('(min-width: 1440px)').matches) {
    centerMap = [59.936326864825475, 30.3182];
  }

  var map = new ymaps.Map("contacts-map", {
    center: centerMap,
    zoom: 17,
    controls: []
  });

  map.behaviors.disable(['scrollZoom']);

  var mapMarker = new ymaps.Placemark([59.936326864825475, 30.321777768508905], {
    hintContent: "г. Санкт-Петербург, ул. Большая Конюшенная, д. 19/8, офис 101"
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/map-pin.png',
    iconImageSize: [62, 53],
    iconImageOffset: [-31, -53]
  });

  map.geoObjects.add(mapMarker);
}
