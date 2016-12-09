"use strict";angular.module("walkFilterApp",["ngAnimate","ngCookies","ngResource","ngSanitize","ngMaterial","ngMdIcons","rzModule","leaflet-directive","ui.slider","ui.bootstrap","ui.bootstrap-slider"]).config(["$logProvider","$locationProvider",function(a,b){console.log("app started"),a.debugEnabled(!1),b.html5Mode(!1),b.hashPrefix("map")}]),console.log("app loaded"),angular.module("walkFilterApp").controller("MainCtrl",["$scope","$rootScope","leafletData","$mdSidenav","$window","$timeout",function(a,b,c,d,e,f){a.toggleSidenav=function(a){d(a).toggle(),1==b.minMapData.ready&&(b.minMapData.ready=!1,f(function(){b.minMapData.ready=!0},10))},a.$on("remoteOpenMap",function(b){a.toggleSidenav("right")}),a.menuContentStyles={height:"500px"};var g=function(){var b=jQuery(window).height()-177;a.menuContentStyles.height=b.toString()+"px"};g(),f(function(){g()},500),angular.element(e).bind("resize",function(){g(),f(function(){g()},10)})}]).config(["$mdThemingProvider",function(a){var b=a.extendPalette("light-blue",{contrastDefaultColor:"light",contrastDarkColors:["50"],50:"ffffff"});a.definePalette("customBlue",b),a.theme("default").primaryPalette("customBlue",{"default":"500","hue-1":"50"}).accentPalette("pink"),a.theme("input","default").primaryPalette("grey")}]),angular.module("walkFilterApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]});var app=angular.module("walkFilterApp");app.controller("MapCtrl",["$scope","$rootScope","$log","$q","data","$timeout","getwalkmap","leafletData","$mdSidenav","magicNumbers","locationString",function(a,b,c,d,e,f,g,h,i,j,k){console.log("map started"),L.Icon.Default.imagePath="./images",a.mapData=j.getMapSetup(),b.markerFilterConfig=j.getMenuSetup(),a.selectedMinMap=null,a.filterVal={shown:!0},a.focusOnLastWalk=function(){var c=k.getInitalWalkHash(),d=e.getKeyFromMarkerHash(c.hash);if(d){var g=c.zoom;c.zoom?f(function(){b.$broadcast("remoteOpenMap",d,g)},300):b.$broadcast("remoteOpenMap",d),a.loadMinMapDetails(d)}},a.openSideBar=function(){b.$broadcast("remoteOpenMap")},a.$on("leafletDirectiveMarker.mainWalkMap.click",function(b,c){c.model&&c.model.data&&c.model.data.key&&(k.setWalkHash(e.getHashFromMarkerKey(c.model.data.key)),a.loadMinMapDetails(c.model.data.key))}),a.$on("remoteOpenMap",function(b,c,d){a.mapData.markers[c].focus=!0,a.mapData.markers[c]&&a.mapData.markers[c].shown&&(d&&(a.mapData.setup.zoom=13,a.mapData.setup.lat=a.mapData.markers[c].lat,a.mapData.setup.lng=a.mapData.markers[c].lng),a.mapData.markers[c].focus=!1,f(function(){a.mapData.markers[c].focus=!0,a.mapData.setup.lat=a.mapData.markers[c].lat,a.mapData.setup.lng=a.mapData.markers[c].lng},1))}),a.resetMinMap=function(){b.minMapData=null,b.minMapData={minMapID:"minMap_elevation",path:{},controls:{fullscreen:{position:"topleft"}},markers:{},selectedMarker:{},feature:{},ready:!1,error:!1}},a.resetMinMap(),a.loadMinMapDetails=function(c){b.selectedTabIndex=null,f(function(){b.selectedTabIndex=1},500),a.resetMinMap(),b.minMapData.selectedMarker=a.mapData.markers[c],a.getWalkFile(c)},a.getWalkFile=function(a){d.when(g.getWalkFile(a)).then(function(a){var c=g.getMinMapSettings(a);b.minMapData.path=c.path,b.minMapData.markers=c.markers,b.minMapData.feature=c.feature,f(function(){b.minMapData.ready=!0,h.getMap(b.minMapData.minMapID).then(function(a){b.minMapObject=a})},150)},function(a){console.error("Error retreiving analysis data"),b.minMapData.error=!0})},d.when(e.getMarkers()).then(function(c){_.forEach(c,function(b,d){c[d].getMessageScope=function(){return a},c[d].compileMessage=!0}),a.mapData.markers=c,b.markers=a.mapData.markers,a.focusOnLastWalk()},function(a){}),f(function(){h.getMap("mainWalkMap").then(function(c){a.mapData.map=c,l(a.mapData.map),e.addMapSearch(a.mapData.map),h.getLayers("mainWalkMap").then(function(a){b.walkMarkersLayers=a.overlays.walkMarkers._layers})})},50);var l=function(a){var b=L.control({position:"bottomright"});b.onAdd=function(a){var b=L.DomUtil.create("div","info legend");return b.innerHTML+='<strong style="padding:0;margin:0">Grade</strong> <table> <tr> <td> <div class="markerWrapperWrapper"> <div class="markerWrapper"> <div class="awesome-marker-icon-green awesome-marker  " title="Old River Circuit" style="  position:inherit;"><i class="fa fa-blind  icon-white"></i></div> </div> </div> </td> <td>1</td> </tr> <tr> <td> <div class="markerWrapperWrapper"> <div class="markerWrapper"> <div class="awesome-marker-icon-darkgreen awesome-marker " title="Old River Circuit" style="  position:inherit;"><i class="fa fa-blind  icon-white"></i></div> </div> </div> </td> <td>2</td> </tr> <tr> <td> <div class="markerWrapperWrapper"> <div class="markerWrapper"> <div class="awesome-marker-icon-blue awesome-marker " title="Old River Circuit" style="  position:inherit;"><i class="fa fa-blind  icon-white"></i></div> </div> </div> </td> </div> <td>3</td> </tr> <tr> <td> <div class="markerWrapperWrapper"> <div class="markerWrapper"> <div class="awesome-marker-icon-red awesome-marker " title="Old River Circuit" style="  position:inherit;"><i class="fa fa-blind  icon-white"></i></div> </div> </div> </td> <td>4</td> </tr> <tr> <td> <div class="markerWrapperWrapper"> <div class="markerWrapper"> <div class="awesome-marker-icon-darkpurple awesome-marker" title="Old River Circuit" style="  position:inherit;"><i class="fa fa-blind  icon-white"></i></div> </div> </div> </td> <td>5</td> </tr> </table>',b},b.addTo(a)}}]),angular.module("walkFilterApp").controller("ControlsCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("walkFilterApp").controller("DataloaderCtrl",function(){}),angular.module("walkFilterApp").factory("data",["$http","infowindowFactory","$q","$rootScope","magicNumbers",function(a,b,c,d,e){function f(a){var b,c,d={};for(var e in a)b=a[e].formatted_address,c=L.latLng(a[e].geometry.location.lat(),a[e].geometry.location.lng()),d[b]=c;return d}console.log("data started"),a.get("./config/parkDetails.json").then(function(a){d.parksVic=a.data}),d.hintFile={},d.imageHintFile={},a.get("./config/hintFiles/processedWalkData.json").then(function(a){_.forEach(a.data,function(a,b){d.hintFile[b]||(d.hintFile[b]=[]),!d.imageHintFile[b]&&a.thumb&&(d.imageHintFile[b]=[]),a.walkFrom="TrailHikingAu",a.walkFromUrl="https://www.trailhiking.com.au/",a.url||(a.url=a.walkFromUrl+a.page),d.hintFile[b].push(a),a.thumb&&d.imageHintFile[b].push(a.thumb)})});var g=e.getWalkToIgnore(),h={},i={},j=[-47.346267,106.699219,-10.239249,160.488281],k={},l=0,m=0,n=function(){var d=c.defer();return a.get("./config/processedWalkData.json").then(function(a){_.forEach(a.data,function(a,c){if(c=c.replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_"),!g[c]&&(a.start&&a.start.lat&&a.start.lng||a.Latitude&&a.Longitude&&!isNaN(a.Latitude)&&!isNaN(a.Longitude)&&0!=a.Latitude&&0!=a.Longitude)){if(a.key=c,a.altkey=[c],c!==c.replace(/_/g,"-")&&a.altkey.push(c.replace(/_/g,"-")),a.shown=!0,a.hashStringID||(a.hashStringID=c),h[a.hashStringID]=c,i[c]=a.hashStringID,k[c]={layer:"walkMarkers"},a.start&&a.start.lat&&a.start.lng?(k[c].lat=Number(a.start.lat),k[c].lng=Number(a.start.lng),a.Latitude=Number(a.start.lat),a.Longitude=Number(a.start.lng)):(k[c].lat=Number(a.Latitude),k[c].lng=Number(a.Longitude)),0==k[c].lat||0==k[c].lng,a.duration.indexOf("day")>-1&&(a.duration_raw=48),a.grade_raw||(isNaN(a.grade)?a.grade==!isNaN(a.grade[0])?a.grade_raw=Number(a.grade[0])+.5:a.grade_raw=2:a.grade_raw=Number(a.grade)),k[c].data=a,a.gpsDetails&&(a.gpsDetails.totaleledown||a.gpsDetails.totaleleup)){var d=0;if(a.gpsDetails.totaleledown)var d=-1*a.gpsDetails.totaleledown;d<a.gpsDetails.totaleleup&&(d=a.gpsDetails.totaleleup),k[c].data.maxClimb=d,d>l&&(l=d,m=a)}k[c].message=b.getText(a),k[c].icon=b.getIcon(a,Math.round(Number(a.grade))-1),k[c].title=a.title}}),d.resolve(k)}),d.promise};return{getMarkers:function(){return n()},addMapSearch:function(a){function b(a,b){c.geocode({address:a,bounds:d,region:"AU"},b)}var c=new google.maps.Geocoder,d=new google.maps.LatLngBounds(new google.maps.LatLng(j[0],j[1]),new google.maps.LatLng(j[2],j[3]));a.addControl(new L.Control.Search({sourceData:b,formatData:f,markerLocation:!0,autoType:!1,autoCollapse:!0,minLength:2}))},getKeyFromMarkerHash:function(a){var b=null;return a&&h[a]&&(b=h[a]),b},getHashFromMarkerKey:function(a){var b=null;return a&&i[a]&&(b=i[a]),a}}}]),angular.module("walkFilterApp").factory("infowindowFactory",["magicNumbers","$rootScope",function(a,b){var c=function(a,c){var d="",a=a;d+=a.url&&a.thumb?"<a target='_blank' href='"+a.url+"'><h3>"+a.title+"</h3></a>":"<h3>"+a.title+"</h3>";var e="";return e=a.url&&a.thumb?"<a target='_blank' href='"+a.url+"'>"+a.title+"</a>":a.title,d="<md-card >",d+='<md-card-title>  <md-card-title-text>  <span class="md-headline">'+e+"</span>",a.location&&(d+='<span class="md-subhead">',d+=a.location+" ("+a.closest_town+","+a.state+")",d+="</span>"),d+="</md-card-title-text> </md-card-title>",d+='<md-divider style="    margin: 0 16px;"></md-divider><md-card-content>',d+='<div layout="row" layout-xs="column"><div flex>',d+='<div class="walkPeramsList">',d+='<div class="walkPeram"> <span class="title"> Distance: </span><span class="value">'+a.distance+"</span></div>",d+='<div class="walkPeram"> <span class="title"> Duration: </span><span class="value">'+a.duration+"</span></div>",d+='<div class="walkPeram"> <span class="title"> Grade: </span><span class="value">'+a.grade+"</span></div>",d+='<div class="walkPeram"> <span class="title"> Style: </span><span class="value">'+a.style+"</span></div>",d+="<md-divider></md-divider>",d+="<a target='_blank' href='https://www.google.com/maps?saddr=My+Location&daddr="+a.Latitude+","+a.Longitude+"'> Directions </a><br>",d+="<a target='_blank' href='https://maps.google.com/?daddr="+a.Latitude+","+a.Longitude+"'>Show on map </a>",d+="</div>",d+='</div><div flex style="text-align:right" class="infoWindowImage" hide-xs>',a.thumb?d+="<img hide-xs style='height:108px;width:131px;' src='"+a.thumb+"'>":a.altkey?_.forEach(a.altkey,function(a,c){b.imageHintFile[a]&&b.imageHintFile[a][0]&&(d+=" <img hide-xs style='height:108px;width:131px;' src='"+b.imageHintFile[a][0]+"'>")}):d+=" ",d+=" ",d+="</div></div>",d+='<div hide-gt-md layout="row" style="padding-top:10px">',d+="<a hide-gt-md target='_blank' ng-click='openSideBar();' >View Map or more Information</a>",d+="</div>",d+="</md-card-content>",d+="</md-card>"};return{getText:function(a,b){var d=c(a);return d},getIcon:function(b,c){return{type:"awesomeMarker",icon:"blind",markerColor:a.getColors()[c],prefix:"fa"}}}}]),angular.module("walkFilterApp").factory("magicNumbers",function(){var a={great_dividing_trail:!0,great_south_west_walk:!0,the_great_ocean_walk:!0,mornington_peninsula_walk:!0,australian_alps_walking_track:!0,buller_huts_trail:!0,wilderness_coast_walk:!0,six_foot_track:!0},b={markers:{},setup:{lat:-37.8136,lng:144.9631,zoom:8},layers:{baselayers:{osm:{name:"OpenStreetMap",url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",type:"xyz",layerParams:{attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}},Thunderforest_OpenCycleMap:{name:"Thunderforest-OpenCycleMap",url:"https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png",type:"xyz",layerParams:{attribution:'&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}},HikeBike_HikeBike:{name:"BikeHike",url:"http://{s}.tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png",type:"xyz",layerParams:{attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}},openCycleMap:{name:"Open Cycle Map",url:"http://a.tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png",type:"xyz",layerParams:{attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}}},overlays:{walkMarkers:{name:"walkMarkers",type:"group",visible:!0,layerParams:{showOnSelector:!1}}},options:{position:"bottomleft"}}},c=["green","darkgreen","blue","red","darkpurple","cadetblue","purple","lightgreen","pink","red"],d=[{field:"distance_raw",title:"Distance",type:"slider",units:"km",value:[0,30],"default":[0,30],options:{floor:0,ceil:30}},{field:"duration_raw",title:"Duration",type:"slider",units:"hrs",value:[0,14],"default":[0,14],options:{floor:1,ceil:14}},{field:"maxClimb",title:"Max Climb",type:"slider",units:"m",value:[0,1300],"default":[0,1300],options:{floor:0,ceil:1300}},{field:"distance_from_state_capital_raw",title:"Distance from CBD",type:"slider",units:"km",value:[0,300],"default":[0,300],options:{floor:0,ceil:300}},{field:"grade_raw",title:"Grade",type:"slider",units:"",value:[1,5],"default":[1,5],options:{floor:1,ceil:5}},{field:"style",title:"Exclude one way",type:"boolean",trueValues:["return","circuit"],value:!1,"default":!1},{field:"style",title:"Only show one way",type:"boolean",trueValues:["one"],value:!1,"default":!1}];return{getColors:function(){return c},getMenuSetup:function(){return d},getMapSetup:function(){return b},getWalkToIgnore:function(){return a}}}),angular.module("walkFilterApp").factory("getwalkmap",["$http","$q",function(a,b){var c={},d=function(d){var e=b.defer(),f=d.replace(/_/g,"-"),g="./config/maps/"+f+".json";return c[g]?c[g].error?e.reject(null):e.resolve(c[g]):a.get(g).success(function(a){c[g]=a,e.resolve(a)}).error(function(a){c[g]={error:!0},e.reject(null)}),e.promise};return{getWalkFile:function(a){return ga("send","event",{eventCategory:"getWalk",eventAction:a,eventLabel:a}),d(a)},getMinMapSettings:function(a){var b=[],c=[];if(a.linestring&&a.geomArray)var b=a.linestring,c=a.geomArray;else a.geomArray?_.forEach(a.geomArray,function(d,e){b[e]={lat:Number(d[1]),lng:Number(d[0])},c=a.geomArray}):a.mapData?_.forEach(JSON.parse(a.mapData),function(a,d){b[d]={lat:Number(a[0]),lng:Number(a[1])},c[d]=[Number(a[1]),Number(a[0])]}):a.theMapArray&&_.forEach(a.theMapArray,function(a,d){b[d]={lat:Number(a[1]),lng:Number(a[0])},c[d]=[Number(a[0]),Number(a[1])]});var d={line:{color:"#008000",weight:4,latlngs:b}},e={finish:{lat:Number(c[c.length-1][1]),lng:Number(c[c.length-1][0]),message:"finish",icon:{type:"awesomeMarker",icon:"flag",markerColor:"red",prefix:"fa"}},start:{lat:Number(c[0][1]),lng:Number(c[0][0]),message:"start",icon:{type:"awesomeMarker",icon:"blind",markerColor:"green",prefix:"fa"}}},f=turf.linestring(c,{stroke:"#6BC65F","stroke-width":5}),g=turf.centroid(f);return{path:d,center:g,feature:f,markers:e,mapSetup:{lat:g.geometry.coordinates[0],lng:g.geometry.coordinates[1],zoom:14}}}}}]),angular.module("walkFilterApp").directive("mapfilters",["$rootScope","$timeout",function(a,b){return{restrict:"E",templateUrl:"views/directives/filters.html",scope:{markerfilterconfig:"="},link:function(c,d,e){c.filterMarkers=function(b){b||ga("send","event",{eventCategory:"filters",eventAction:"changedOrUpdated",eventLabel:"changedOrUpdated"});var d=a.markers,e=JSON.parse(JSON.stringify(c.markerfilterconfig));_.forEach(e,function(a,b){if("slider"==a.type){var c=Number(a.value[0]),d=Number(a.value[1]);c<=a.options.floor&&(e[b].value[0]=-1e10),d>=a.options.ceil&&(e[b].value[1]=1e10)}}),_.forEach(d,function(a,b){var c=!0,f=Number(a.data.Latitude),g=Number(a.data.Longitude);_.forEach(e,function(b){var d=b.field,e=a.data[d];if("slider"==b.type){var h=Number(b.value[0]),i=Number(b.value[1]);!e||c&&e&&e>=h&&i>=e||(c=!1,f=0,g=0)}if("boolean"==b.type&&1==b.value){var j=!1,k=e.toLowerCase();_.forEach(b.trueValues,function(a){k.indexOf(a.toLowerCase())>-1&&(j=!0)}),j||(c=!1,f=0,g=0)}}),d[b].lat!=f,a.shown!=c&&(d[b].shown=c)}),_.forEach(a.walkMarkersLayers,function(a,b){if(a.options.data.key){var c=a.options.data.key;0==d[c].shown?(L.DomUtil.addClass(a._icon,"hiddenMarker"),L.DomUtil.addClass(a._shadow,"hiddenMarker")):(L.DomUtil.removeClass(a._icon,"hiddenMarker"),L.DomUtil.removeClass(a._shadow,"hiddenMarker"))}})},c.resetFilters=function(){ga("send","event",{eventCategory:"filters",eventAction:"reset",eventLabel:"reset"}),_.forEach(c.markerfilterconfig,function(a,b){c.markerfilterconfig[b].value=JSON.parse(JSON.stringify(a["default"]))}),c.filterMarkers(!0)},b(function(){c.filterMarkers(!0)},1500),b(function(){c.filterMarkers(!0)},3e3)}}}]).filter("markerFilter",function(){return function(a,b){return a}}),angular.module("walkFilterApp").directive("minimap",["$rootScope",function(a){return{restrict:"E",templateUrl:"views/directives/minimap.html",scope:{minmapdata:"="},link:function(a,b,c){}}}]),angular.module("walkFilterApp").directive("elevationmap",["$rootScope","$timeout","leafletData",function(a,b,c){return{restrict:"E",templateUrl:"views/directives/elivationmap.html",scope:{minmapdata:"="},link:function(a,d,e){var f;a.ready=!1,b(function(){a.mapId=a.minmapdata.minMapID,c.getMap(a.mapId).then(function(c){a.elevationMap=c,b(function(){g(),a.ready=!0,a.elevationMap.on("fullscreenchange",function(){a.elevationMap.isFullscreen()})},300)})},10);var g=function(){if(a.elevationMap){var b=a.minmapdata.feature;f=L.control.elevation({position:"bottomright",theme:"steelblue-theme",width:jQuery("#"+a.mapId).width(),height:125,useHeightIndicator:!1}),a.controls={fullscreen:{position:"topleft"}},f.addTo(a.elevationMap);var c=new L.Control.Fullscreen;c.addTo(a.elevationMap);var d=L.geoJson(b,{onEachFeature:f.addData.bind(f)}).addTo(a.elevationMap);a.elevationMap.fitBounds(d,{paddingBottomRight:[0,200]})}}}}}]),angular.module("walkFilterApp").directive("walklist",["$rootScope",function(a){return{restrict:"E",templateUrl:"views/directives/walklist.html",scope:{walks:"="},link:function(b,c,d){b.focusOnMarker=function(b,c){a.$broadcast("remoteOpenMap",b,c)}}}}]),angular.module("walkFilterApp").factory("mapevents",function(){var a=42;return{someMethod:function(){return a}}}),angular.module("walkFilterApp").factory("locationString",["$location",function(a){var b=a.hash(),c=a.search();return{getInitalWalkHash:function(){var a=!1;if(b.indexOf("walk=")>-1&&b.indexOf("&id=")>-1){var c=b.split("walk=")[1].split("&id=")[0];return b.indexOf("zoom=true")>-1&&(a=!0),{hash:c,zoom:a}}return{hash:null,zoom:a}},getInitalSearch:function(){return c},setHash:function(b){b&&a.hash(b)},setWalkHash:function(b){b&&a.hash("walk="+b+"&id="+Math.round(1e5*Math.random(10)))},setSearch:function(b){b&&a.search(hash)}}}]),angular.module("walkFilterApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/directives/elivationmap.html",'<div ng-if="minmapdata.selectedMarker.title"> <h2 style="padding: 0;margin: 0 0 5px 0; font-size: 24px;">{{minmapdata.selectedMarker.title}}</h2> <leaflet ng-if="minmapdata&&minmapdata.ready" id="{{minmapdata.minMapID}}" xcontrols="controls" paths="minmapdata.path" markers="minmapdata.markers" defaults="{scrollWheelZoom: false}" height="350px" width="100%"> </leaflet> </div>'),a.put("views/directives/filters.html",'<div> <h1 style="padding:0;margin:0">Filters</h1> <div ng-repeat="(key, value) in markerfilterconfig"> <div ng-if="value.type==\'slider\'"> <strong>{{value.title}}</strong> <div layout="row"> <span flex="15">{{value.value[0]}} {{value.units}}</span> <span flex="65"> <slider ng-change="filterMarkers()" sliderid="value.field" ng-model="value.value" min="value.options.floor" step="1" max="value.options.ceil" range="true" ng-model-options="{ debounce: 100 }" slider-tooltip="hide"></slider> </span> <span flex="5"> </span> <span layout="colum" flex="15">{{value.value[1]}} {{value.units}}</span> </div> <br> </div> <div ng-if="value.type==\'boolean\'"> <md-switch ng-model="value.value" aria-label="{{value.title}}" ng-change="filterMarkers()"> {{ value.title }} : {{value.value}} </md-switch> </div> <md-divider></md-divider> </div> <section> <md-button class="md-raised md-warn" ng-click="resetFilters()">Reset</md-button> </section> </div>'),a.put("views/directives/minimap.html",'<div ng-if="minmapdata.selectedMarker.title" class="walkPeramsList"> <div ng-if="minmapdata.error"> <h1>map failed to load</h1></div> <div> <div layout="column" ng-if="minmapdata.selectedMarker.data.location"> <div flex> <div class="walkPeram"> <span class="title"> Location: </span>{{minmapdata.selectedMarker.data.location}}, {{minmapdata.selectedMarker.data.closest_town}}({{minmapdata.selectedMarker.data.state}}) </div> </div> </div> <md-divider style="" ng-if="minmapdata.selectedMarker.data.location"></md-divider> <div layout="row"> <div flex> <div class="walkPeram"> <span class="title">Distance:</span> {{minmapdata.selectedMarker.data.distance}} </div> <div class="walkPeram" title="Tobler\'s hiking function"> <span class="title">Duration:</span> {{minmapdata.selectedMarker.data.duration}} (thf) </div> <div class="walkPeram"> <span class="title">Grade:</span> {{minmapdata.selectedMarker.data.grade}} </div> <div class="walkPeram"> <span class="title">Style:</span> {{minmapdata.selectedMarker.data.style}} </div> <div class="walkPeram" title="Distance As the crow flies"> <span class="title">From CBD:</span> {{minmapdata.selectedMarker.data.distance_from_state_capital}} <span>(acf)</span> </div> <div class="walkPeram" ng-if="minmapdata.selectedMarker.data.url"> <span class="title">Walk from:</span> <a target="_blank" ng-href="{{minmapdata.selectedMarker.data.url}}">trailhiking.com.au</a> </div> </div> <div flex> <div class="walkPeram"> <span class="title">Max Altitude:</span> {{minmapdata.selectedMarker.data.gpsDetails.maxele}}m </div> <div class="walkPeram"> <span class="title">Min Altitude:</span> {{minmapdata.selectedMarker.data.gpsDetails.minele}}m </div> <div class="walkPeram"> <span class="title">Total Climb:</span> {{minmapdata.selectedMarker.data.gpsDetails.totaleleup}}m </div> <div class="walkPeram"> <span class="title">Total Descent:</span> {{minmapdata.selectedMarker.data.gpsDetails.totaleledown}}m </div> <div class="walkPeram" ng-if="minmapdata.selectedMarker.data.gpsUrl"> <span class="title">GPX File:</span> <a target="_blank" ng-href="{{minmapdata.selectedMarker.data.gpsUrl}}">Download</a> </div> <span class="title">Google:</span> <a target="_blank" ng-href="https://www.google.com/maps?saddr=My+Location&daddr={{minmapdata.selectedMarker.data.Latitude}},{{minmapdata.selectedMarker.data.Longitude}}">Directions</a>, <a target="_blank" ng-href="https://maps.google.com/?daddr={{minmapdata.selectedMarker.data.Latitude}},{{minmapdata.selectedMarker.data.Longitude}}"> <nobr>Show On Map</nobr> </a> </div> </div> </div> <div ng-repeat="keyName in minmapdata.selectedMarker.data.altkey" ng-if="minmapdata.selectedMarker.data.altkey"> <div ng-if="$root.hintFile[keyName]&&minmapdata.selectedMarker.data.altkey.indexOf(keyName)> -1"> <div ng-repeat="(jIndex, detail) in $root.hintFile[keyName]"> <md-divider style=""></md-divider> <div layout="row"> <div flex> <div> <span class="title">Hint file <span class="walkPeram" ng-if="detail.walkFromUrl&&detail.walkFrom"> from: <a target="_blank" ng-href="{{detail.walkFromUrl}}">{{detail.walkFrom}}</a> </span> <br> <div class="walkPeram" ng-if="detail.url"> <span class="title">Blog Post:</span> <a target="_blank" ng-href="{{detail.url}}">{{detail.title}}</a> </div> <div class="walkPeram" ng-if="detail.distance"> <span class="title">Distance:</span> {{detail.distance}} </div> <div class="walkPeram" ng-if="detail.duration"> <span class="title">Duration:</span> {{detail.duration}} </div> <div class="walkPeram" ng-if="detail.grade"> <span class="title">Grade:</span> {{detail.grade}} </div> <div class="walkPeram" ng-if="detail.style"> <span class="title">Style:</span> {{detail.style}} </div> <div class="walkPeram" ng-if="detail.gpsUrl"> <span class="title">GPX File:</span> <a target="_blank" ng-href="{{detail.gpsUrl}}">Download</a> </div> </span></div> </div> </div> </div> </div> </div> <md-divider style=""></md-divider> <div layout="column" ng-repeat="(key, value) in minmapdata.selectedMarker.data.parks"> <div flex ng-if="$root.parksVic[key]"> <div class="walkPeram"> <span class="title">From Hint Files:</span> <br> <span class="title">Park Details: </span><a target="_blank" ng-href="{{$root.parksVic[key].parkDetails[0].url}}">{{value}}({{key}})</a> <div class="walkPeram"> {{$root.parksVic[key].parkDetails[0].description}} <br> <span class="title">Park Rating: </span>{{$root.parksVic[key].parkDetails[0].rating}} </div> </div> </div> </div> </div>'),a.put("views/directives/walklist.html",'<div> <div ng-repeat="(key, value) in walks" ng-click="focusOnMarker(value.data.key, false)" ng-dblclick="focusOnMarker(value.data.key, true)" ng-if="true||value.shown"> {{value.data.title}} </div> </div>'),a.put("views/main.html",""),a.put("views/map.html",'<div ng-controller="MapCtrl" class="row" height="100%" style="height:100%;margin:0;padding: 0;width:100%"> <leaflet id="mainWalkMap" layers="mapData.layers" controls paths="minMapData.path" lf-center="mapData.setup" width="100%" height="100%" style="height:100%" markers="mapData.markers | markerFilter:markerFilterConfig "></leaflet> </div> <style>.leaflet-control-layers-toggle {\n    background-image: url(images/layers.1888ea9e.png);\n    width: 36px;\n    height: 36px;\n}</style>')}]);