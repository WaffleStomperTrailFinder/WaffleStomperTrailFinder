"use strict";angular.module("walkFilterApp",["ngAnimate","ngCookies","ngResource","ui-rangeSlider","ngSanitize","ngMaterial","ngMdIcons","rzModule","leaflet-directive","720kb.socialshare"]).config(["$logProvider","$locationProvider",function(a,b){console.log("app started"),a.debugEnabled(!1),b.html5Mode(!1),b.hashPrefix("map")}]),console.log("app loaded"),angular.module("walkFilterApp").controller("MainCtrl",["$scope","$rootScope","leafletData","$mdSidenav","$window","$timeout",function(a,b,c,d,e,f){b.canLoadMap=!1,a.updateSliders=function(){f(function(){b.$broadcast("rzSliderForceRender")},50),f(function(){b.$broadcast("rzSliderForceRender")},300)},b.selectedTabIndex=0,a.filterTab=0,a.$watch(function(){return b.selectedTabIndex},function(){a.updateSliders()},!0),a.toggleSidenav=function(c){a.updateSliders(),d(c).toggle(),1==b.minMapData.ready&&(b.minMapData.ready=!1,f(function(){b.minMapData.ready=!0},10))},a.$on("remoteOpenMap",function(a,c){d("right").open(),1==b.minMapData.ready&&(b.minMapData.ready=!1,f(function(){b.minMapData.ready=!0},10)),c&&!isNaN(c)&&(b.selectedTabIndex=c)}),a.menuContentStyles={height:"500px"};var g=function(){var b=jQuery(window).height()-177+64;a.menuContentStyles.height=b.toString()+"px"};g(),f(function(){g()},500),angular.element(e).bind("resize",function(){g(),f(function(){g()},10)})}]).config(["$mdThemingProvider",function(a){var b=a.extendPalette("light-blue",{contrastDefaultColor:"light",contrastDarkColors:["50"],50:"ffffff"});a.definePalette("customBlue",b),a.theme("default").primaryPalette("customBlue",{"default":"500","hue-1":"50"}).accentPalette("pink"),a.theme("input","default").primaryPalette("grey")}]),angular.module("walkFilterApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]});var app=angular.module("walkFilterApp");app.controller("MapCtrl",["$scope","$rootScope","$log","$q","data","$timeout","getwalkmap","leafletData","$mdSidenav","magicNumbers","locationString",function(a,b,c,d,e,f,g,h,i,j,k){console.log("map started"),L.Icon.Default.imagePath="./images",a.mapData=j.getMapSetup(),b.markerFilterConfig=j.getMenuSetup(),b.walkLookupList=[],b.walkShowTracker={},a.selectedMinMap=null,a.filterVal={shown:!0},b.minMapData=g.resetMinMap(),a.focusOnLastWalk=function(){var c=k.getInitalWalkHash(),d=e.getKeyFromMarkerHash(c.hash);if(d){var g=c.zoom;c.zoom?f(function(){b.$broadcast("remoteFocusWalk",d,g)},300):b.$broadcast("remoteFocusWalk",d),a.loadMinMapDetails(d)}},a.openSideBar=function(){b.$broadcast("remoteOpenMap",1)},a.$on("leafletDirectiveMarker.mainWalkMap.click",function(b,c){c.model&&c.model.data&&c.model.data.key&&(k.setWalkHash(e.getHashFromMarkerKey(c.model.data.key)),a.loadMinMapDetails(c.model.data.key))}),a.$on("remoteFocusWalk",function(b,c,d){_.forEach(a.mapData.markers,function(a,b){b==c&&1==a.focus&&(a.focus=!1)}),a.mapData.markers[c].focus=!0,d&&(a.mapData.setup.zoom=13,a.mapData.markers[c].focus=!0),f(function(){a.mapData.markers[c].focus=!0,a.mapData.setup.lat=a.mapData.markers[c].lat,a.mapData.setup.lng=a.mapData.markers[c].lng},10),f(function(){a.loadMinMapDetails(c,!0)},20)}),a.getWalkFile=function(a){j.isMobile()?b.minMapData.wait=!0:d.when(g.getWalkFileAndSettings(a,b.minMapData)).then(function(a){},function(a){b.minMapData.error=!0})},a.loadMinMapDetails=function(c,d){d||(1==b.selectedTabIndex&&(b.selectedTabIndex=null),f(function(){b.selectedTabIndex=1},500)),b.minMapData=g.resetMinMap(c),b.minMapData.selectedMarker=a.mapData.markers[c],a.getWalkFile(c)},d.when(e.getMarkers()).then(function(c){_.forEach(c,function(d,e){c[e].getMessageScope=function(){return a},c[e].compileMessage=!0;var f=d.data.title+" "+d.data.locationHintShort,g=d.data.locationHintShort;d.data.locationDetails&&d.data.locationDetails.postcode_localities,f=f+" "+d.data.locationDetails.postcode_localities.join(" "),g=g+" "+d.data.locationDetails.postcode_localities.join(" "),b.walkLookupList.push({title:d.data.title,location:d.data.locationHintShort,Duration:d.data.duration,Distance:d.data.distance_raw,Grade:d.data.grade,key:e,extra:{locationDetails:d.data.locationDetails,keywords:f,locationKeywords:g}}),b.walkShowTracker[e]=!0}),a.mapData.markers=c,b.markers=a.mapData.markers,a.focusOnLastWalk()},function(a){}),f(function(){h.getMap("mainWalkMap").then(function(c){f(function(){b.$broadcast("closeLoadingDialog")},3e3),a.mapData.map=c,l(a.mapData.map),e.addMapSearch(a.mapData.map),h.getLayers("mainWalkMap").then(function(a){b.walkMarkersLayers=a.overlays.walkMarkers._layers})})},100);var l=function(a){var b=L.control({position:"bottomright"});b.onAdd=function(a){var b=L.DomUtil.create("div","info legend");return b.innerHTML+='<strong style="padding:0;margin:0">Grade</strong> <table> <tr> <td> <div class="markerWrapperWrapper"> <div class="markerWrapper"> <div class="awesome-marker-icon-green awesome-marker  " title="Old River Circuit" style="  position:inherit;"><i class="fa fa-blind  icon-white"></i></div> </div> </div> </td> <td>1</td> </tr> <tr> <td> <div class="markerWrapperWrapper"> <div class="markerWrapper"> <div class="awesome-marker-icon-darkgreen awesome-marker " title="Old River Circuit" style="  position:inherit;"><i class="fa fa-blind  icon-white"></i></div> </div> </div> </td> <td>2</td> </tr> <tr> <td> <div class="markerWrapperWrapper"> <div class="markerWrapper"> <div class="awesome-marker-icon-blue awesome-marker " title="Old River Circuit" style="  position:inherit;"><i class="fa fa-blind  icon-white"></i></div> </div> </div> </td> </div> <td>3</td> </tr> <tr> <td> <div class="markerWrapperWrapper"> <div class="markerWrapper"> <div class="awesome-marker-icon-red awesome-marker " title="Old River Circuit" style="  position:inherit;"><i class="fa fa-blind  icon-white"></i></div> </div> </div> </td> <td>4</td> </tr> <tr> <td> <div class="markerWrapperWrapper"> <div class="markerWrapper"> <div class="awesome-marker-icon-darkpurple awesome-marker" title="Old River Circuit" style="  position:inherit;"><i class="fa fa-blind  icon-white"></i></div> </div> </div> </td> <td>5</td> </tr> </table>',b},b.addTo(a)}}]),angular.module("walkFilterApp").controller("ControlsCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("walkFilterApp").controller("DataLoaderCtrl",["$scope","$rootScope","$mdDialog",function(a,b,c){function d(a,c){a.hide=function(){c.hide()},a.cancel=function(){c.cancel()},a.answer=function(a){c.hide(a)},a.$on("closeLoadingDialog",function(a){c.cancel()}),b.canLoadMap=!0}d.$inject=["$scope","$mdDialog"],a.showAdvanced=function(b){c.show({controller:d,templateUrl:"views/templates/loading.tmpl.html",parent:angular.element(document.body),targetEvent:b,clickOutsideToClose:!0,fullscreen:a.customFullscreen}).then(function(a){},function(){})},a.showAdvanced()}]),angular.module("walkFilterApp").factory("data",["$http","infowindowFactory","$q","$rootScope","magicNumbers","$timeout","$window",function(a,b,c,d,e,f,g){function h(a){var b,c,d={};for(var e in a)b=a[e].formatted_address,c=L.latLng(a[e].geometry.location.lat(),a[e].geometry.location.lng()),d[b]=c;return d}var i=null;a.get("./config/processedWalkData.json").then(function(a){if(a.data.data)var b=e.uncompressJson(a.data.data);else var b=a.data;i=b}),a.get("./config/parkDetails.json").then(function(a){if(a.data.data)var b=e.uncompressJson(a.data.data);else var b=a.data;d.parksVic=b}),a.get("./config/hintFiles/processedWalkData.json").then(function(a){if(d.imageHintFile&&d.hintFile||(d.imageHintFile={},d.hintFile={}),a.data.data)var b=e.uncompressJson(a.data.data);else var b=a.data;_.forEach(b,function(a,b){d.hintFile[b]||(d.hintFile[b]=[]),!d.imageHintFile[b]&&a.thumb&&(d.imageHintFile[b]=[]),a.walkFrom="TrailHikingAu",a.walkFromUrl="https://www.trailhiking.com.au/",a.url||(a.url=a.walkFromUrl+a.page),d.hintFile[b].push(a),a.thumb&&d.imageHintFile[b].push(a.thumb)})});var j=e.getWalkToIgnore(),k={},l={},m=[-47.346267,106.699219,-10.239249,160.488281],n={},o=0,p=0,q=function(a){_.forEach(i,function(a,c){if(c=c.replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_").replace("-","_"),!j[c]&&(a.start&&a.start.lat&&a.start.lng||a.Latitude&&a.Longitude&&!isNaN(a.Latitude)&&!isNaN(a.Longitude)&&0!=a.Latitude&&0!=a.Longitude)){if(a.key=c,a.altkey=[c],c!==c.replace(/_/g,"-")&&a.altkey.push(c.replace(/_/g,"-")),a.locationDetails){var d=[],e=[];a.locationDetails.locality&&(d.push(a.locationDetails.locality.short_name),e.push(a.locationDetails.locality.long_name)),a.locationDetails.administrative_area_level_2&&(d.push(a.locationDetails.administrative_area_level_2.short_name),e.push(a.locationDetails.administrative_area_level_2.long_name)),a.locationDetails.administrative_area_level_1&&(d.push(a.locationDetails.administrative_area_level_1.short_name),e.push(a.locationDetails.administrative_area_level_1.long_name)),a.locationHintShort=d.join(", "),a.locationHintLong=e.join(", ")}if(a.shown=!0,a.hashStringID||(a.hashStringID=c),k[a.hashStringID]=c,l[c]=a.hashStringID,n[c]={layer:"walkMarkers"},a.start&&a.start.lat&&a.start.lng?(n[c].lat=Number(a.start.lat),n[c].lng=Number(a.start.lng),a.Latitude=Number(a.start.lat),a.Longitude=Number(a.start.lng)):(n[c].lat=Number(a.Latitude),n[c].lng=Number(a.Longitude)),0==n[c].lat||0==n[c].lng,a.duration.indexOf("day")>-1&&(a.duration_raw=48),a.grade_raw||(isNaN(a.grade)?a.grade==!isNaN(a.grade[0])?a.grade_raw=Number(a.grade[0])+.5:a.grade_raw=2:a.grade_raw=Number(a.grade)),n[c].data=a,a.gpsDetails&&(a.gpsDetails.totaleledown||a.gpsDetails.totaleleup)){var f=0;if(a.gpsDetails.totaleledown)var f=-1*a.gpsDetails.totaleledown;f<a.gpsDetails.totaleleup&&(f=a.gpsDetails.totaleleup),n[c].data.maxClimb=f,f>o&&(o=f,p=a)}n[c].message=b.getText(a),n[c].icon=b.getIcon(a,Math.round(Number(a.grade))-1),n[c].title=a.title}}),a.resolve(n)},r=15,s=function(a){0==r||d.imageHintFile&&d.parksVic&&i?(console.log("everthing seems to be ready will try now."),q(a)):(console.log("supporting data not ready yet, cant load makers yet, will try "+r+" more times."),r-=1,f(function(){s(a)},100))};return{getMarkers:function(){var a=c.defer();return s(a),a.promise},addMapSearch:function(a){function b(a,b){c.geocode({address:a,bounds:d,region:"AU"},b)}var c=new google.maps.Geocoder,d=new google.maps.LatLngBounds(new google.maps.LatLng(m[0],m[1]),new google.maps.LatLng(m[2],m[3]));a.addControl(new L.Control.Search({sourceData:b,formatData:h,markerLocation:!0,autoType:!1,autoCollapse:!0,minLength:2}))},getKeyFromMarkerHash:function(a){var b=null;return a&&k[a]&&(b=k[a]),b},getHashFromMarkerKey:function(a){var b=null;return a&&l[a]&&(b=l[a]),a}}}]),angular.module("walkFilterApp").factory("infowindowFactory",["magicNumbers","$rootScope",function(a,b){var c=function(a,c){var d="",a=a;d+=a.url&&a.thumb?"<a target='_blank' href='"+a.url+"'><h3>"+a.title+"</h3></a>":"<h3>"+a.title+"</h3>";var e="";return e=a.url&&a.thumb?"<a target='_blank' href='"+a.url+"'>"+a.title+"</a>":a.title,d="<md-card >",d+='<md-card-title>  <md-card-title-text>  <span class="md-headline">'+e+"</span>",a.locationHintShort&&(d+='<span class="md-subhead">',d+=a.locationHintShort,d+="</span>"),d+="</md-card-title-text> </md-card-title>",d+='<md-divider style="    margin: 0 16px;"></md-divider><md-card-content>',d+='<div layout="row" layout-xs="column"><div flex>',d+='<div class="walkPeramsList">',d+='<div class="walkPeram"> <span class="title"> Distance: </span><span class="value">'+a.distance+"</span></div>",d+='<div class="walkPeram"> <span class="title"> Duration: </span><span class="value">'+a.duration+"</span></div>",d+='<div class="walkPeram"> <span class="title"> Grade: </span><span class="value">'+a.grade+"</span></div>",d+='<div class="walkPeram"> <span class="title"> Style: </span><span class="value">'+a.style+"</span></div>",d+="<md-divider></md-divider>",d+="<a target='_blank' href='https://www.google.com/maps?saddr=My+Location&daddr="+a.Latitude+","+a.Longitude+"'> Directions </a><br>",d+="<a target='_blank' href='https://maps.google.com/?daddr="+a.Latitude+","+a.Longitude+"'>Show on map </a>",d+="</div>",d+='</div><div flex style="text-align:right" class="infoWindowImage" hide-xs>',a.thumb?d+="<img hide-xs style='height:108px;width:131px;' src='"+a.thumb+"'>":a.altkey?_.forEach(a.altkey,function(a,c){b.imageHintFile[a]&&b.imageHintFile[a][0]&&(d+=" <img hide-xs style='height:108px;width:131px;' src='"+b.imageHintFile[a][0]+"'>")}):d+=" ",d+=" ",d+="</div></div>",d+='<div hide-gt-md layout="row" style="padding-top:10px">',d+="<a hide-gt-md target='_blank' ng-click='openSideBar();' >View Map or more Information</a>",d+="</div>",d+="</md-card-content>",d+="</md-card>"};return{getText:function(a,b){var d=c(a);return d},getIcon:function(b,c){return{type:"awesomeMarker",icon:"blind",markerColor:a.getColors()[c],prefix:"fa"}}}}]),angular.module("walkFilterApp").factory("magicNumbers",function(){var a={great_dividing_trail:!0,great_south_west_walk:!0,the_great_ocean_walk:!0,mornington_peninsula_walk:!0,australian_alps_walking_track:!0,buller_huts_trail:!0,wilderness_coast_walk:!0,six_foot_track:!0},b={markers:{},setup:{lat:-37.8136,lng:144.9631,zoom:8},layers:{baselayers:{osm:{name:"OpenStreetMap",url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",type:"xyz",layerParams:{attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}},Thunderforest_OpenCycleMap:{name:"Thunderforest-OpenCycleMap",url:"https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png",type:"xyz",layerParams:{attribution:'&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}},HikeBike_HikeBike:{name:"BikeHike",url:"http://{s}.tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png",type:"xyz",layerParams:{attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}},openCycleMap:{name:"Open Cycle Map",url:"http://a.tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png",type:"xyz",layerParams:{attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}}},overlays:{walkMarkers:{name:"walkMarkers",type:"group",visible:!0,layerParams:{showOnSelector:!1}}},options:{position:"bottomleft"}}},c=["green","darkgreen","blue","red","darkpurple","cadetblue","purple","lightgreen","pink","red"],d=[{field:"distance_raw",title:"Distance",type:"slider",units:"km",value:[0,30],"default":[0,30],options:{floor:0,ceil:30}},{field:"duration_raw",title:"Duration",type:"slider",units:"hrs",value:[0,14],"default":[0,14],options:{floor:1,ceil:14}},{field:"maxClimb",title:"Max Climb",type:"slider",units:"m",value:[0,1300],"default":[0,1300],options:{floor:0,ceil:1300}},{field:"distance_from_state_capital_raw",title:"Distance from CBD",type:"slider",units:"km",value:[0,300],"default":[0,300],options:{floor:0,ceil:300}},{field:"grade_raw",title:"Grade",type:"slider",units:"",value:[1,5],"default":[1,5],options:{floor:1,ceil:5,showTicksValues:!0}},{id:"excludeOneWay",field:"style",title:"Exclude one way",type:"boolean",typeString:!0,trueValues:["return","circuit"],value:!1,"default":!1,resetOther:["onlyOneWay"]},{id:"onlyOneWay",field:"style",title:"Only show one way",type:"boolean",typeString:!0,trueValues:["one"],value:!1,"default":!1,resetOther:["excludeOneWay"]},{field:"dogs",title:"Dogs are OK",type:"boolean",typeBoolean:!0,value:!1,"default":!1},{field:"days",title:"Multi Day",type:"radio",value:"notSet","default":"notSet",typeRadio:"numbers",setup:{notSet:{"class":"md-primary",title:"All Walks"},oneDay:{"class":"md-warn",title:"Day Walks",min:0,max:2},multiDay:{title:"Multi Day",min:1,max:1e3}}}];return{getColors:function(){return c},getMenuSetup:function(){return d},getMapSetup:function(){return b},getWalkToIgnore:function(){return a},uncompressJson:function(a){a=window.atob(a),a=pako.inflate(a,{to:"string"});var a=JSON.parse(a);return a},isMobile:function(){var a=jQuery(window).width(),b=!1;return 1e3>a&&(b=!0),b}}}),angular.module("walkFilterApp").factory("getwalkmap",["$http","$q","$timeout","magicNumbers","leafletData",function(a,b,c,d,e){var f={},g=function(c){var e=b.defer(),g=c.replace(/_/g,"-"),h="./config/maps/"+g+".json";return f[h]?f[h].error?e.reject(null):e.resolve(f[h]):a({method:"GET",url:h}).then(function(a){if(a.data.data)var b=d.uncompressJson(a.data.data);else var b=a.data;f[h]=b,e.resolve(b)},function(a){f[h]={error:!0},e.reject(null)}),e.promise},h=function(a,b){var d=[],f=[];if(a.linestring&&a.geomArray)var d=a.linestring,f=a.geomArray;else a.geomArray&&_.forEach(a.geomArray,function(b,c){d[c]={lat:Number(b[1]),lng:Number(b[0])},f=a.geomArray});var g={line:{color:"#008000",weight:4,latlngs:d}},h={finish:{lat:Number(f[f.length-1][1]),lng:Number(f[f.length-1][0]),message:"finish",icon:{type:"awesomeMarker",icon:"flag",markerColor:"red",prefix:"fa"}},start:{lat:Number(f[0][1]),lng:Number(f[0][0]),message:"start",icon:{type:"awesomeMarker",icon:"blind",markerColor:"green",prefix:"fa"}}},i={type:"Feature",geometry:{type:"LineString",coordinates:f},properties:{stroke:"#6BC65F","stroke-width":5}},j=L.geoJson(i),k=j.getBounds().getCenter(),l={type:"Feature",geometry:{type:"Point",coordinates:[k.lng,k.lat]},properties:{}},m={path:g,center:l,feature:i,markers:h,mapSetup:{lat:l.geometry.coordinates[0],lng:l.geometry.coordinates[1],zoom:14}};return b.path=m.path,b.markers=m.markers,b.feature=m.feature,c(function(){b.ready=!0,b.wait=!1,b.error=!1,e.getMap(b.minMapID).then(function(a){b.minMapObject=a})},150),m},i=function(a,c){var d=b.defer();return b.when(g(a)).then(function(a){var b=h(a,c);d.resolve(b)},function(a){console.error("Error retreiving analysis data"),c.error=!0,d.reject(null)}),d.promise};return{getWalkFile:function(a){return ga("send","event",{eventCategory:"getWalk",eventAction:a,eventLabel:a}),g(a)},getWalkFileAndSettings:function(a,b){return ga("send","event",{eventCategory:"getWalk",eventAction:a,eventLabel:a}),i(a,b)},getMinMapSettings:function(a,b){return h(a,b)},resetMinMap:function(a){var b={minMapID:"minMap_elevation",path:{},controls:{fullscreen:{position:"topleft"}},markers:{},selectedMarker:{},feature:{},wait:!1,ready:!1,error:!1,key:a};return b}}}]),angular.module("walkFilterApp").directive("mapfilters",["$rootScope","$timeout",function(a,b){return{restrict:"E",templateUrl:"views/directives/filters.html",scope:{markerfilterconfig:"="},link:function(c,d,e){c.isDebouncingFilters=!1;var f=function(){c.$broadcast("rzSliderForceRender"),_.forEach(c.markerfilterconfig,function(a,b){if("slider"===a.type&&(a.options.id=a.field,a.options.onChange=function(a){c.filterMarkers()},a.units)){var d=a.units;a.options.translate=function(a){return a+d}}})};c.filterMarkers=function(a,d){c.isDebouncingFilters=!0,c.filterTimeout&&b.cancel(c.filterTimeout),c.filterTimeout=b(function(){c.filterMarkersDebounced(a,d)},300)},c.filterMarkersDebounced=function(d,e){c.loadingBarClear&&b.cancel(c.loadingBarClear),c.loadingBarClear=b(function(){c.isDebouncingFilters=!1},1e3),b(function(){c.$apply(),a.$apply()},10);var f=a.markers;e&&e.resetOther&&_.forEach(c.markerfilterconfig,function(a,b){a.id&&_.forEach(e.resetOther,function(b){a.id==b&&(a.value=a["default"])})}),b.cancel(c.timeoutPromise),c.timeoutPromise=b(function(){var b=JSON.parse(JSON.stringify(c.markerfilterconfig));_.forEach(b,function(a,c){if("slider"===a.type){var d=Number(a.value[0]),e=Number(a.value[1]);d<=a.options.floor&&(b[c].value[0]=-1e10),e>=a.options.ceil&&(b[c].value[1]=1e10)}}),_.forEach(f,function(c,d){var e=!0;_.forEach(b,function(a){var b=a.field,d=c.data[b];if("slider"===a.type){var f=Number(a.value[0]),g=Number(a.value[1]);!d||e&&d&&d>=f&&g>=d||(e=!1)}if("boolean"===a.type&&a.typeString&&a.value===!0){var h=!1,i=d.toLowerCase();_.forEach(a.trueValues,function(a){i.indexOf(a.toLowerCase())>-1&&(h=!0)}),h||(e=!1)}"boolean"===a.type&&a.typeBoolean&&a.value===!0&&(d===!0||(e=!1)),"radio"===a.type&&"numbers"===a.typeRadio&&a.value&&a.setup[a.value]&&a.setup[a.value].max&&(a.setup[a.value].min<d&&a.setup[a.value].max>d||(e=!1))}),c.shown!==e&&(f[d].shown=e,a.walkShowTracker[d]=e)}),_.forEach(a.walkMarkersLayers,function(a,b){if(a.options.data.key){var c=a.options.data.key;f[c].shown===!1?(L.DomUtil.addClass(a._icon,"hiddenMarker"),L.DomUtil.addClass(a._shadow,"hiddenMarker")):(L.DomUtil.removeClass(a._icon,"hiddenMarker"),L.DomUtil.removeClass(a._shadow,"hiddenMarker"))}})},300),d||ga("send","event",{eventCategory:"filters",eventAction:"changedOrUpdated",eventLabel:"changedOrUpdated"})},c.resetFilters=function(){ga("send","event",{eventCategory:"filters",eventAction:"reset",eventLabel:"reset"}),_.forEach(c.markerfilterconfig,function(a,b){c.markerfilterconfig[b].value=JSON.parse(JSON.stringify(a["default"]))}),c.filterMarkers(!0)},c.$on("resetFilters",function(a){c.resetFilters(!0)}),f(),b(function(){c.filterMarkers(!0),f()},1500),b(function(){c.filterMarkers(!0)},3e3)}}}]),angular.module("walkFilterApp").directive("infopanel",["$rootScope",function(a){return{restrict:"E",templateUrl:"views/directives/infoPanel.html",scope:{minmapdata:"="},link:function(a,b,c){}}}]),angular.module("walkFilterApp").directive("elevationmap",["$rootScope","$timeout","leafletData",function(a,b,c){return{restrict:"E",templateUrl:"views/directives/elivationmap.html",scope:{minmapdata:"="},link:function(a,d,e){var f;a.ready=!1,b(function(){a.mapId=a.minmapdata.minMapID,c.getMap(a.mapId).then(function(c){a.elevationMap=c,b(function(){g(),a.ready=!0,a.elevationMap.on("fullscreenchange",function(){a.elevationMap.isFullscreen()})},300)})},10);var g=function(){if(a.elevationMap){var b=a.minmapdata.feature;f=L.control.elevation({position:"bottomright",theme:"steelblue-theme",width:jQuery("#"+a.mapId).width(),height:125,useHeightIndicator:!1}),a.controls={fullscreen:{position:"topleft"}},f.addTo(a.elevationMap);var c=new L.Control.Fullscreen;c.addTo(a.elevationMap);var d=L.geoJson(b,{onEachFeature:f.addData.bind(f)}).addTo(a.elevationMap);a.elevationMap.fitBounds(d,{paddingBottomRight:[0,200]})}}}}}]),angular.module("walkFilterApp").directive("walklist",["$rootScope","$timeout",function(a,b){return{restrict:"E",templateUrl:"views/directives/walklist.html",scope:{walks:"="},link:function(b,c,d){b.oldRadioVal="title",b.ascendingOrderBy=!1,b.doSomething=function(a){a==b.oldRadioVal&&(b.ascendingOrderBy=!b.ascendingOrderBy),b.oldRadioVal=a},b.checkPeram=function(a){var b=a[0];return b&&b===b.toUpperCase()?!0:!1},b.focusOnMarker=function(b,c){a.walkShowTracker[b]||a.$broadcast("resetFilters"),a.$broadcast("remoteFocusWalk",b,c)}}}}]),angular.module("walkFilterApp").factory("mapevents",function(){var a=42;return{someMethod:function(){return a}}}),angular.module("walkFilterApp").factory("locationString",["$location",function(a){var b=a.hash(),c=a.search();return{getInitalWalkHash:function(){var a=!1;if(b.indexOf("walk=")>-1&&b.indexOf("&id=")>-1){var c=b.split("walk=")[1].split("&id=")[0];return b.indexOf("zoom=true")>-1&&(a=!0),{hash:c,zoom:a}}return{hash:null,zoom:a}},getInitalSearch:function(){return c},setHash:function(b){b&&a.hash(b)},setWalkHash:function(b){b&&a.hash("walk="+b+"&id="+Math.round(1e5*Math.random(10)))},setSearch:function(b){b&&a.search(hash)}}}]),angular.module("walkFilterApp").directive("elevationmapwarning",["$q","getwalkmap",function(a,b){return{restrict:"E",templateUrl:"views/directives/elevationmapwarning.html",scope:{minmapdata:"="},link:function(c,d,e){c.getWalkFile=function(){var d=c.minmapdata.key;a.when(b.getWalkFileAndSettings(d,c.minmapdata)).then(function(a){},function(a){minmapdata.error=!0})}}}}]),angular.module("walkFilterApp").controller("LoadingdialogCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("walkFilterApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/directives/elevationmapwarning.html",'<div ng-if="minmapdata.selectedMarker.title"> <h2 style="padding: 0;margin: 0 0 5px 0; font-size: 24px;">{{minmapdata.selectedMarker.title}}</h2> <a ng-click="getWalkFile()">Click here to load the elevation map.</a> </div>'),a.put("views/directives/elivationmap.html",'<div ng-if="minmapdata.selectedMarker.title"> <h2 style="padding: 0;margin: 0 0 5px 0; font-size: 24px;">{{minmapdata.selectedMarker.title}}</h2> <leaflet ng-if="minmapdata&&minmapdata.ready" id="{{minmapdata.minMapID}}" xcontrols="controls" paths="minmapdata.path" markers="minmapdata.markers" defaults="{scrollWheelZoom: false}" height="350px" width="100%"> </leaflet> </div>'),a.put("views/directives/filters.html",'<div> <h1 style="padding:0;margin:0">Filters</h1> <div style="height: 0;    overflow: visible;    margin: -2px -16px 16px -16px"> <div ng-show="isDebouncingFilters"> <md-progress-linear md-mode="indeterminate"></md-progress-linear> </div> </div> <div ng-repeat="(key, value) in markerfilterconfig"> <div ng-if="value.type==\'slider\'"> <strong>{{value.title}}:</strong> <div layout="row"> <span flex="100"> <rzslider rz-slider-model="value.value[0]" rz-slider-high="value.value[1]" rz-slider-options="value.options"></rzslider> </span> </div> <br> </div> <div ng-if="value.type==\'boolean\'"> <md-switch style="margin-top:0" ng-model="value.value" aria-label="{{value.title}}" ng-change="filterMarkers(false,value)"> {{ value.title }} : {{value.value}} </md-switch> </div> <div ng-if="value.type==\'radio\'"> <md-input-container class="md-block" flex-gt-sm style="margin-top:0; margin-bottom:0"> <label style="margin-bottom: 10px;color:black">{{ value.title }}:</label> <div class="clearfix"></div> <br> <md-radio-group ng-model="value.value" ng-change="filterMarkers()"> <md-radio-button ng-value="key" class="{{radioItem.class}}" ng-repeat="(key, radioItem) in value.setup">{{radioItem.title}}</md-radio-button> </md-radio-group> </md-input-container> <div class="clearfix"></div> </div> </div> <md-divider></md-divider> <section> <md-button class="md-raised md-warn" ng-click="resetFilters()">Reset</md-button> </section> </div>'),a.put("views/directives/infoPanel.html",'<div ng-if="minmapdata.selectedMarker.title" class="walkPeramsList"> <div ng-if="false"> <a href="#" socialshare socialshare-provider="twitter" socialshare-text="720kb AngularJS Socialshare" socialshare-hashtags="angularjs, angular-socialshare" socialshare-url="http://720kb.net"> Share me </a> </div> <div ng-if="minmapdata.error"> <h1>map failed to load</h1></div> <div> <div layout="column" ng-if="minmapdata.selectedMarker.data.locationHintShort"> <div flex> <div class="walkPeram" title="{{minmapdata.selectedMarker.data.locationHintLong}}"> <span class="title"> Location: </span> <span class="" style="padding-top:12px" ng-if="minmapdata.selectedMarker.data.locationHintShort"> {{minmapdata.selectedMarker.data.locationHintShort}}, </span> </div> </div> <md-divider style=""></md-divider> </div> <md-divider style="" ng-if="minmapdata.selectedMarker.data.location"></md-divider> <div layout="row"> <div flex> <div class="walkPeram"> <span class="title">Distance:</span> {{minmapdata.selectedMarker.data.distance}} </div> <div class="walkPeram" title="Tobler\'s hiking function"> <span class="title">Duration:</span> {{minmapdata.selectedMarker.data.duration}} (thf) </div> <div class="walkPeram"> <span class="title">Grade:</span> {{minmapdata.selectedMarker.data.grade}} </div> <div class="walkPeram"> <span class="title">Style:</span> {{minmapdata.selectedMarker.data.style}} </div> <div class="walkPeram" title="Distance As the crow flies"> <span class="title">From CBD:</span> {{minmapdata.selectedMarker.data.distance_from_state_capital}} <span>(acf)</span> </div> <div class="walkPeram" ng-if="minmapdata.selectedMarker.data.url"> <span class="title">Walk from:</span> <a target="_blank" ng-href="{{minmapdata.selectedMarker.data.url}}">trailhiking.com.au</a> </div> </div> <div flex> <div class="walkPeram"> <span class="title">Max Altitude:</span> {{minmapdata.selectedMarker.data.gpsDetails.maxele}}m </div> <div class="walkPeram"> <span class="title">Min Altitude:</span> {{minmapdata.selectedMarker.data.gpsDetails.minele}}m </div> <div class="walkPeram"> <span class="title">Total Climb:</span> {{minmapdata.selectedMarker.data.gpsDetails.totaleleup}}m </div> <div class="walkPeram"> <span class="title">Total Descent:</span> {{minmapdata.selectedMarker.data.gpsDetails.totaleledown}}m </div> <div class="walkPeram" ng-if="minmapdata.selectedMarker.data.gpsUrl"> <span class="title">GPX File:</span> <a target="_blank" ng-href="{{minmapdata.selectedMarker.data.gpsUrl}}">Download</a> </div> <span class="title">Google:</span> <a target="_blank" ng-href="https://www.google.com/maps?saddr=My+Location&daddr={{minmapdata.selectedMarker.data.Latitude}},{{minmapdata.selectedMarker.data.Longitude}}"><nobr>Directions To Start</nobr></a>, <a target="_blank" ng-href="https://maps.google.com/?daddr={{minmapdata.selectedMarker.data.Latitude}},{{minmapdata.selectedMarker.data.Longitude}}"> <nobr>Show On Map</nobr> </a> </div> </div> <div layout="row" ng-if="minmapdata.selectedMarker.data.days>1"> <div flex> <md-divider></md-divider> <div class="walkPeram"> <span class="title">Overnight Hike:</span> </div> <div class="walkPeram"> <span class="title">Days:</span> {{minmapdata.selectedMarker.data.days | number : 2}} days </div> <div class="walkPeram"> <span class="title">Distance Per Day:</span> {{minmapdata.selectedMarker.data.distancePerDay | number : 2}}km </div> <div class="walkPeram"> <span class="title">Duration Per Day:</span> {{minmapdata.selectedMarker.data.durationPerDay | number : 2}}hrs </div> </div> </div> </div> <div ng-repeat="keyName in minmapdata.selectedMarker.data.altkey" ng-if="minmapdata.selectedMarker.data.altkey"> <div ng-if="$root.hintFile[keyName]&&minmapdata.selectedMarker.data.altkey.indexOf(keyName)> -1"> <div ng-repeat="(jIndex, detail) in $root.hintFile[keyName]"> <md-divider style=""></md-divider> <div layout="row"> <div flex> <div> <span class="title">Hint File <span class="walkPeram" ng-if="detail.walkFromUrl&&detail.walkFrom"> From: <a target="_blank" ng-href="{{detail.walkFromUrl}}">{{detail.walkFrom}}</a> </span> <br> <div class="walkPeram" ng-if="detail.url"> <span class="title">Blog Post:</span> <a target="_blank" ng-href="{{detail.url}}">{{detail.title}}</a> </div> <div class="walkPeram" ng-if="detail.distance"> <span class="title">Distance:</span> {{detail.distance}} </div> <div class="walkPeram" ng-if="detail.duration"> <span class="title">Duration:</span> {{detail.duration}} </div> <div class="walkPeram" ng-if="detail.grade"> <span class="title">Grade:</span> {{detail.grade}} </div> <div class="walkPeram" ng-if="detail.style"> <span class="title">Style:</span> {{detail.style}} </div> <div class="walkPeram" ng-if="detail.gpsUrl"> <span class="title">GPX File:</span> <a target="_blank" ng-href="{{detail.gpsUrl}}">Download</a> </div> </span></div> </div> </div> </div> </div> </div> <div layout="column" ng-repeat="(key, value) in minmapdata.selectedMarker.data.parks"> <md-divider style=""></md-divider> <div flex ng-if="$root.parksVic[key]"> <div class="walkPeram"> <span class="title">Hint File From: <a target="_blank" ng-href="http://parkweb.vic.gov.au/">Parks Victoria</a></span> <br> <span class="title">Park Details: </span><a target="_blank" ng-href="{{$root.parksVic[key].parkDetails[0].url}}">{{value}}({{key}})</a> <div class="walkPeram"> {{$root.parksVic[key].parkDetails[0].description}} <br> <span class="title">Park Rating: </span>{{$root.parksVic[key].parkDetails[0].rating}} </div> </div> </div> </div> </div>'),a.put("views/directives/walklist.html",'<div> <div> <md-input-container class="md-block" style="margin:0;margin-top:5px" flex-gt-sm> <label>Title Filter</label> <input ng-model="search.title" ng-model-options="{ debounce: 300 }"> </md-input-container> <md-input-container class="md-block" style="margin:0" flex-gt-sm> <label>Location Keyword Filter</label> <input ng-model="search.extra.locationKeywords" ng-model-options="{ debounce: 300 }"> </md-input-container> <md-switch ng-model="showAllVals" style="margin:0;margin-top:-15px" aria-label="Switch 1" ng-init="false" class="md-warn"> Show Filtered Out Walks: {{ showAllVals }} </md-switch> <p>Order by:<span class="radioValue">{{ selectedOrderBy }}</span> </p> <md-radio-group ng-model="selectedOrderBy" ng-init="selectedOrderBy = \'title\'" ng-click="doSomething(selectedOrderBy)"> <md-radio-button value="title" class="md-primary">Title</md-radio-button> <md-radio-button value="Distance"> Distance </md-radio-button> <md-radio-button value="Grade">Grade</md-radio-button> </md-radio-group> <div class="clearfix"></div> <md-switch ng-model="ascendingOrderBy" aria-label="Switch 1" ng-init="false" class="md-warn" style=";margin-top:0"> Ascending: {{ ascendingOrderBy }} </md-switch> </div> <md-divider></md-divider> <md-list class="md-dense" flex> <md-list-item class="md-2-line" ng-repeat="walk in walks  | filter : search | orderBy:selectedOrderBy:ascendingOrderBy" ng-hide="!$root.walkShowTracker[walk.key]&&!showAllVals" ng-click="focusOnMarker(walk.key, false)" ng-dblclick="focusOnMarker(walk.key, true)"> <img ng-src="images/icons/grade{{walk.Grade}}.png" class="md-avatar" alt="{{todos[0].who}}"> <div class="md-list-item-text"> <h3 ng-click="focusOnMarker(walk.key, false)" class="listHeading">{{walk.title}}</h3> <h3 ng-click="focusOnMarker(walk.key, false)" class="listHeading">{{walk.location}}</h3> <p><span ng-repeat="(peram, detail) in walk" ng-if="checkPeram(peram) && detail!=null"><strong>{{peram}}:</strong>{{detail}} <span ng-if="peram ==\'Distance\' ">km </span></span> </p> </div> </md-list-item> </md-list> </div>'),
a.put("views/main.html",""),a.put("views/map.html",'<div ng-controller="MapCtrl" class="row" height="100%" style="height:100%;margin:0;padding: 0;width:100%"> <leaflet ng-if="$root.canLoadMap" id="mainWalkMap" layers="mapData.layers" controls paths="minMapData.path" lf-center="mapData.setup" width="100%" height="100%" style="height:100%" markers="mapData.markers"></leaflet> </div> <style>.leaflet-control-layers-toggle {\n    background-image: url(images/layers.1888ea9e.png);\n    width: 36px;\n    height: 36px;\n}</style>'),a.put("views/templates/loading.tmpl.html",'<md-dialog aria-label="Mango (Fruit)"> <form ng-cloak> <md-toolbar> <div class="md-toolbar-tools"> <h2>Welcome to Trail Finder</h2> <span flex></span> <md-button ng-click="cancel()">Close </md-button> </div> </md-toolbar> <md-dialog-content> <div class="md-dialog-content"> <h2>Loading data..</h2> <p> Loading map and trails data. </p> <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took. </p> <md-progress-linear class="md-warn" md-mode="indeterminate"></md-progress-linear> </div> </md-dialog-content> <md-dialog-actions layout="row"> <md-button flex ng-click="cancel()"> Close </md-button> </md-dialog-actions> </form> </md-dialog>')}]);