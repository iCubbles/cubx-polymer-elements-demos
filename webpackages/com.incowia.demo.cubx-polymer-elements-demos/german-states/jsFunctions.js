/*global XMLHttpRequest*/
/**
 * Contains hookFunctions for component travel-planner
 */
(function () {
  'use strict';

  // set namespace containing the german-states functions (i.e. hook functions)
  window.com_incowia_demo_polymerElementsDemos_germanStates = {

    statesPolys: [],

    // Hook function to determine whether Hamburg poly should be added to or removed from the map
    updateState: function (changeObject, next) {
      var self = window.com_incowia_demo_polymerElementsDemos_germanStates;
      if (self.statesPolys.length < 0) return;
      next(self.createUpdatePolyObject(changeObject.newValue, changeObject.customValue.index));
    },

    // create object that contains the info needed to update the map
    createUpdatePolyObject: function (add, index) {
      var updateMapObject = {};
      updateMapObject.action = (add) ? 'addPoly' : 'removePoly';
      updateMapObject.element = this.statesPolys[index];
      return updateMapObject;
    },

    // Load Polys from kml file
    loadPolys: function () {
      var self = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          self.parseKml(xhttp.responseXML);
        }
      };
      xhttp.open('GET', '../data/polys.kml', false);
      xhttp.send();
    },

    // Parse kml data and save it in statesPolys array
    parseKml: function (kml) {
      for (var i = 0; i < kml.getElementsByTagName('Placemark').length; i++) {
        var points = [];
        var polyXml = kml.getElementsByTagName('Placemark')[i];
        var coordinates = polyXml.getElementsByTagName('coordinates')[0].firstChild.nodeValue.split(' ');
        for (var k = 0; k < coordinates.length; k++) {
          var point = coordinates[k].split(',');
          points.push({longitude: point[0], latitude: point[1]});
        }
        var name = polyXml.getElementsByTagName('SimpleData')[3].firstChild.nodeValue;
        var poly = {
          closed: true,
          fillColor: 'red',
          fillOpacity: 0.25,
          strokeWeight: 1,
          points: points,
          id: name + 'Poly'
        };
        this.statesPolys.push(poly);
      }
    }
  };
  window.com_incowia_demo_polymerElementsDemos_germanStates.loadPolys();

  var webpackageViewer = document.querySelector('german-states');
  document.addEventListener('cifReady', function () {
    webpackageViewer.setCheckAll(true);
  });
})();
