/*global XMLHttpRequest*/
/**
 * Contains hookFunctions for component travel-planner
 */
(function () {
  'use strict';

  // set namespace containing the german-states functions (i.e. hook functions)
  window.com_incowia_demo_polmerElementsDemo = {

    statesPolys: [],

    // Hook function to determine whether Hamburg poly should be added to or removed from the map
    updateHamburg: function (add, next) {
      var self = window.com_incowia_demo_polmerElementsDemo;
      if (self.statesPolys.length < 0) return;
      next(self.createUpdateMapObject(add, 0));
    },

    // Hook function to determine whether Niedersachsen poly should be added to or removed from the map
    updateNiedersachsen: function (add, next) {
      var self = window.com_incowia_demo_polmerElementsDemo;
      if (self.statesPolys.length < 0) return;
      next(self.createUpdateMapObject(add, 1));
    },

    // Hook function to determine whether Bremen poly should be added to or removed from the map
    updateBremen: function (add, next) {
      var self = window.com_incowia_demo_polmerElementsDemo;
      if (self.statesPolys.length < 0) return;
      next(self.createUpdateMapObject(add, 2));
    },

    // Hook function to determine whether Nordrhein Westfalen poly should be added to or removed from the map
    updateNordrheinW: function (add, next) {
      var self = window.com_incowia_demo_polmerElementsDemo;
      if (self.statesPolys.length < 0) return;
      next(self.createUpdateMapObject(add, 3));
    },

    // Hook function to determine whether Hessen poly should be added to or removed from the map
    updateHessen: function (add, next) {
      var self = window.com_incowia_demo_polmerElementsDemo;
      if (self.statesPolys.length < 0) return;
      next(self.createUpdateMapObject(add, 4));
    },

    // Hook function to determine whether Rheinland Pfalz poly should be added to or removed from the map
    updateRheinlandP: function (add, next) {
      var self = window.com_incowia_demo_polmerElementsDemo;
      if (self.statesPolys.length < 0) return;
      next(self.createUpdateMapObject(add, 5));
    },

    // Hook function to determine whether Baden Wuerttemberg poly should be added to or removed from the map
    updateBadenW: function (add, next) {
      var self = window.com_incowia_demo_polmerElementsDemo;
      if (self.statesPolys.length < 0) return;
      next(self.createUpdateMapObject(add, 6));
    },

    // Hook function to determine whether Bayern poly should be added to or removed from the map
    updateBayern: function (add, next) {
      var self = window.com_incowia_demo_polmerElementsDemo;
      if (self.statesPolys.length < 0) return;
      next(self.createUpdateMapObject(add, 7));
    },

    // Hook function to determine whether Saarland poly should be added to or removed from the map
    updateSaarland: function (add, next) {
      var self = window.com_incowia_demo_polmerElementsDemo;
      if (self.statesPolys.length < 0) return;
      next(self.createUpdateMapObject(add, 8));
    },

    // Hook function to determine whether Berlin poly should be added to or removed from the map
    updateBerlin: function (add, next) {
      var self = window.com_incowia_demo_polmerElementsDemo;
      if (self.statesPolys.length < 0) return;
      next(self.createUpdateMapObject(add, 9));
    },

    // Hook function to determine whether Brandenburg poly should be added to or removed from the map
    updateBrandenburg: function (add, next) {
      var self = window.com_incowia_demo_polmerElementsDemo;
      if (self.statesPolys.length < 0) return;
      next(self.createUpdateMapObject(add, 10));
    },

    // Hook function to determine whether Mecklenburg Vorpommern poly should be added to or removed from the map
    updateMecklengburgV: function (add, next) {
      var self = window.com_incowia_demo_polmerElementsDemo;
      if (self.statesPolys.length < 0) return;
      next(self.createUpdateMapObject(add, 11));
    },

    // Hook function to determine whether Sachsen poly should be added to or removed from the map
    updateSachsen: function (add, next) {
      var self = window.com_incowia_demo_polmerElementsDemo;
      if (self.statesPolys.length < 0) return;
      next(self.createUpdateMapObject(add, 12));
    },

    // Hook function to determine whether Sachsen Anhalt poly should be added to or removed from the map
    updateSachsenA: function (add, next) {
      var self = window.com_incowia_demo_polmerElementsDemo;
      if (self.statesPolys.length < 0) return;
      next(self.createUpdateMapObject(add, 13));
    },

    // Hook function to determine whether Thueringen poly should be added to or removed from the map
    updateThueringen: function (add, next) {
      var self = window.com_incowia_demo_polmerElementsDemo;
      if (self.statesPolys.length < 0) return;
      next(self.createUpdateMapObject(add, 14));
    },

    // Hook function to determine whether Schleswig Holstein poly should be added to or removed from the map
    updateSchleswigH: function (add, next) {
      var self = window.com_incowia_demo_polmerElementsDemo;
      if (self.statesPolys.length < 0) return;
      next(self.createUpdateMapObject(add, 15));
    },

    // create object that contains the info needed to update the map
    createUpdateMapObject: function (add, index) {
      var updateMapObject = {};
      updateMapObject.updateType = (add) ? 'add' : 'remove';
      updateMapObject.element = this.statesPolys[index];
      updateMapObject.elementType = 'poly';
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
  window.com_incowia_demo_polmerElementsDemo.loadPolys();
})();
