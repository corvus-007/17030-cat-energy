ymaps.ready(initMap);

function initMap() {
  var contactsMap = document.getElementById('contacts-map');

  if (contactsMap) {
    contactsMap.classList.remove('contacts__map--no-js');
  }

  var centerMap = [59.938680, 30.323103];
  var pinSize = [62, 53];
  var pinOffset = [-31, -53];

  if (window.matchMedia('(min-width: 768px)').matches) {
    pinSize = [124, 106];
    pinOffset = [-62, -106];
  }
  if (window.matchMedia('(min-width: 1440px)').matches) {
    centerMap = [59.938985, 30.3182];
  }

  var map = new ymaps.Map(contactsMap, {
    center: centerMap,
    zoom: 17,
    controls: []
  });

  map.behaviors.disable(['scrollZoom']);

  var mapMarker = new ymaps.Placemark([59.938680, 30.323103], {
    hintContent: "г. Санкт-Петербург, ул. Большая Конюшенная, д. 19/8, офис 101"
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/map-pin.png',
    iconImageSize: pinSize,
    iconImageOffset: pinOffset
  });

  map.geoObjects.add(mapMarker);
}
