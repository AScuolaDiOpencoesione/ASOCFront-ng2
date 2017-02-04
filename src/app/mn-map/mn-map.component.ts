/// <reference path="../../../typings/index.d.ts" />


import { ViewChild, ContentChildren,OnInit, Inject, forwardRef,  Component,Directive, AfterViewInit, Input, Output, EventEmitter, QueryList, ElementRef, ApplicationRef  } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BackendManagerService } from '../backend-manager.service'
import 'rxjs/add/operator/toPromise';


/**
 * Represents the generic layer
 */
export interface LeafLayer{
  getLayer():L.Layer|Promise<L.Layer>;
  addToMap(m, bls, dls);
  getName():string;
  isBase():boolean;
}

export abstract class LeafLayerBase implements LeafLayer{
  abstract getLayer():L.Layer|Promise<L.Layer>;
  abstract isBase():boolean;

  protected name:string;
  getName():string{
    return this.name;
  }
  addToMap(m, bls, dls){
    let l = this.getLayer();
    m.addLayer(l);
    if(this.isBase())
      bls[this.getName()] = l;
    else
      dls[this.getName()] = l;
  }
}

/**
 * Marker for Marker Layer
 * @param lon: Longitude of the marker
 */
@Directive({
  selector: '[marker]',
})
export class Marker{
  @Input() lon:number;
  @Input() lat:number;
  @Input() icon:string;
  @Input() color:string;
  @Input() size:string;
  
  @Input() data:any;
  @Input() set geo_data(value){
    if (value){
      this.data = value;
      this.parent.redraw();
    }
  }
  @Output() datachange = new EventEmitter<any>();

  constructor(@Inject(forwardRef(() => MarkerLayer)) private parent:MarkerLayer){}

  addMarker(lyr){
    let m = this.get_marker();
    if (m != null){
      lyr.addLayer(m);
      m.openPopup();
    }
  }
  
  get_marker(){

    if (this.data == null){
      if (this.lat !== undefined)
        return L.marker([this.lat, this.lon]);
      else return null;
    } else {
      if (this.data.geometry) {
        if (this.data.geometry.coordinates[0] != 0) {
          let pop = "<div><h3>"+this.data.properties.RagioneSociale+"</h3><p>"+this.data.properties.Indirizzo+", "+this.data.properties.Frazione + " "+this.data.properties.Comune+"</p></div>";
          return L.marker(this.data.geometry.coordinates).bindPopup(pop).openPopup();
        }
      }
    }
  }
} 

/**
 * Marker Layer 
 * @param lon: Longitude of the marker
 */
@Directive({
  selector: 'markerLayer',
})
export class MarkerLayer extends LeafLayerBase{
  @Input() name:string;
  @ContentChildren(Marker) dataLayers: QueryList<Marker>;
  
  layer;
  
  getLayer(){
    this.layer =  L.featureGroup();
    this.redraw();
    return this.layer;
  }
  
  redraw(){
    this.layer.clearLayers();
    this.dataLayers.forEach(element => {
      element.addMarker(this.layer);
    });
  }
  
  isBase(){
    return false;
  }
} 

/**
 * Marker Layer 
 * @param lon: Longitude of the marker
 */
@Directive({
  selector: 'drawLayer',
})
export class DrawLayer extends LeafLayerBase{
  @Input() name:string;
  @ContentChildren(Marker) dataLayers: QueryList<Marker>;
  
  layer;
  
  getLayer(){
    this.layer =  L.featureGroup();
    this.redraw();
    return this.layer;
  }
  
  redraw(){
    this.layer.clearLayers();
    this.dataLayers.forEach(element => {
      element.addMarker(this.layer);
    });
  }
  
  isBase(){
    return false;
  }
} 

/**
 * Tile Layer 
 * @param lon: Longitude of the marker
 */
@Directive({
  selector: 'mapboxlayer',
})
export class MapboxLayer extends LeafLayerBase{
  @Input() name:string;
  @Input() owner:string;
  @Input() id:string;
  @Input() token:string;
  @Input() minzoom:number = 1;
  @Input() maxzoom:number = 20;

  getLayer(){
    let url = "https://api.mapbox.com/styles/v1/"+this.owner+"/"+this.id+"/tiles/256/{z}/{x}/{y}?access_token="+this.token;
    console.log(url);
    let attribution = "";
    return L.tileLayer(url, {minZoom: this.minzoom, maxZoom: this.maxzoom, attribution: attribution});
  }
  isBase(){
    return true;
  }
} 


/**
 * Tile Layer 
 * @param lon: Longitude of the marker
 */
@Directive({
  selector: 'tile_layer',
})
export class BaseLayer extends LeafLayerBase{
  @Input() name:string;
  @Input() url:string;
  @Input() attribution:string;
  @Input() minzoom:number = 1;
  @Input() maxzoom:number = 20;

  getLayer(){
    return L.tileLayer(this.url, {minZoom: this.minzoom, maxZoom: this.maxzoom, attribution: this.attribution});
  }
  isBase(){
    return true;
  }
} 

/**
 * Standard Tile Layer 
 * @param name: one of "osm", "bing", "google", ""
 */
@Directive({
  selector: 'namedlayer',
})
export class NamedLayer extends LeafLayerBase {
  @Input() layer:string;

  configs = {
    osms:{name:"OpenStreetMap", url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution:"Map data © <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors", minzoom:1, maxzoom:19},
    osm:{name:"OpenStreetMap", url:"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution:"Map data © <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors", minzoom:1, maxzoom:19},
    positron:{name:"Carto Positron", url:"http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>', minzoom:1, maxzoom:19},
    darkmatter:{name:"Carto Positron", url:"http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png", attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>', minzoom:1, maxzoom:19},
  };

  getLayer(){
    if(Object.keys(this.configs).indexOf(this.layer) >= 0){
      let lyr = this.configs[this.layer];
      return L.tileLayer(lyr.url, {minZoom: lyr.minzoom, maxZoom: lyr.maxzoom, attribution: lyr.attribution});
    }
    return null;
  } 
  isBase(){
    return true;
  }
  getName(){
    if(this.layer in this.configs){
      return this.configs[this.layer].name;
    }
    return "";
  }
} 

@Directive({
  selector: 'datalayer',
})
export class DataLayer extends LeafLayerBase {
  @Input() type:string;
  @Input() mode:string;
  @Input() src:string;
  @Input() aggregator:string;
  @Input() field:string;

  @Input() basestyle:any={};
  @Input() propertystyle:any={};
  @Input() styledproperty:string;
  
  @Output() areaclick = new EventEmitter<any>();

  constructor(private http:Http){
    super();
  }

  the_style(basestyle, styledproperty, propertystyle){
    return function(feature){
      let gstyle = basestyle;
      let v = feature.properties[styledproperty];
      let astyle = propertystyle[v];
      Object.assign(gstyle, astyle);
      return gstyle;
    }
  }
  
  getLayer():Promise<L.Layer>{
    if (this.type == "geojson")
      return new Promise<L.Layer>((resolve, react) =>{
        this.http.get(this.aggregator).toPromise().then(x=>{
          console.log(x);
          resolve(L.geoJSON(x.json(), {
            style:this.the_style(this.basestyle, this.styledproperty, this.propertystyle),
            onEachFeature:(feature, lyr) => {
              lyr.on({
                click:(e)=>{
                  this.areaclick.emit({
                    field:feature.properties[this.field], 
                    feature:feature
                  });
                }
              });
            }
          }));
        });
      });
    return null;
  } 
  isBase(){
    return false;
  }
  addToMap(m, bls, dls){
    this.getLayer().then(x=>{
      m.addLayer(x);
      dls.push(x);
    });
  }
} 


/**
 * Tile Layer 
 * @param lon: Longitude of the marker
 */
@Directive({
  selector: 'cityosbglayer',
})
export class CityOSBackgroundLayer extends LeafLayerBase{
  @Input() conf:any;
  @Input() conf2:any;
  
  the_conf = null;
  
  name:string;
  url:string;
  attribution:string;
  minzoom:number = 1;
  maxzoom:number = 20;

  ngOnInit(){
    
    if (this.conf)
      this.the_conf = this.conf;
    else 
      this.the_conf = this.conf2;
    
    this.name = this.the_conf.name;
    this.url = this.the_conf.url;
    this.attribution = this.the_conf.attribution;
  }

  getLayer(){
    return L.tileLayer(this.url, {minZoom: this.minzoom, maxZoom: this.maxzoom, attribution: this.attribution});
  }
  isBase(){
    return true;
  }
} 

@Directive({
  selector: 'cityoslayer',
})
export class CityOSLayer extends LeafLayerBase {
  @Input() mappingSpace:number;
  @Input() userSpace:number;
  
  @Input() clustered:boolean = true;
  @Input() filter_cat:string = null;
  @Input() filter_tag:string = null;
  
  @Output() itemclick = new EventEmitter<any>();
  

  items;
  styles;

  int_styles = {}

  constructor(private bms:BackendManagerService,private appref: ApplicationRef, @Inject(forwardRef(() => MnMapComponent)) private parent:MnMapComponent){
    super();
  }
  
  createIcon(style:any){
    let opts = {
      iconUrl: style.icon,
      iconSize:     [style.icon_size_x, style.icon_size_y], // size of the icon
      iconAnchor:   [style.icon_anchor_x, style.icon_anchor_y], // point of the icon which will correspond to marker's location
      popupAnchor:  [style.popup_anchor_x, style.popup_anchor_y] // point from which the popup should open relative to the iconAnchor
    };
    return opts;
    //return L.icon(opts);
  }
  
  makeLegend(){
    console.log(this.styles);
  }
  
  getLayer():Promise<L.Layer>{
    let filter = {};
    if (this.filter_cat)
      filter["category"] = this.filter_cat;
    if (this.filter_tag)
      filter["tag"] = this.filter_tag;
      
    return new Promise<L.Layer>((resolve, react) =>{
      this.bms.setPaging(false).setActiveApp("spaces/"+this.mappingSpace+"/styles").getAll().then(s=>{
        this.styles = s;
        this.parent.legend = this.styles;
        for(let style of this.styles){
          this.int_styles[style.slug] = this.createIcon(style);
        }
        console.log(this.int_styles);
        this.bms.setPaging(false).setActiveApp("spaces/"+this.mappingSpace+"/geolocations").getAll(filter).then(x=>{
          console.log(x);
          let geoj = L.geoJSON(x , {
            pointToLayer:(feature, latlng) =>{
              if (feature.properties.types[0] in this.int_styles)
                return L.marker(latlng, {icon:L.icon(this.int_styles[feature.properties.types[0]])});
              else 
                return L.marker(latlng);
            },
            onEachFeature:(feature, layer) =>{
              if(feature.properties["media"].length > 0)
                layer.bindPopup("<div class='popup'><a href='#/locations/"+feature.properties["id"]+"'><img width=300 height=300 src='http://api.cityopensource.com/pic?size=300x300&img="+feature.properties["media"][0]["s3_file"]+"'></a><span class='title'>"+feature.properties["name"]+"</span></div>");
              else
                layer.bindPopup("<div class='popup'><span class='title'>"+feature.properties["name"]+"</span></div>");
            }
          });
          if(this.clustered){
            let clayer = new L.MarkerClusterGroup();
            clayer.addLayers([geoj]);
            resolve( clayer );
          } else 
            resolve( geoj );
        });
      });
    });
  }
  
  isBase(){
    return false;
  }
  
  addToMap(m, bls, dls){
    this.getLayer().then(x=>{
      m.addLayer(x);
      dls["CityOS"] = x;
    });
  }
} 


@Directive({
  selector: 'cityosnearby',
})
export class CityOSNearbyLayer extends LeafLayerBase {
  @Input() mappingSpace:number;
  @Input() userSpace:number;
  
  @Output() itemclick = new EventEmitter<any>();

  @Input() items:any[];
  public styles;

  int_styles = {}

  constructor(private bms:BackendManagerService){
    super();
  }
  
  createIcon(style:any){
    let opts = {
      iconUrl: style.icon,
      iconSize:     [style.icon_size_x, style.icon_size_y], // size of the icon
      iconAnchor:   [style.icon_anchor_x, style.icon_anchor_y], // point of the icon which will correspond to marker's location
      popupAnchor:  [style.popup_anchor_x, style.popup_anchor_y] // point from which the popup should open relative to the iconAnchor
    };
    return opts;
    //return L.icon(opts);
  }
  
  getLayer():Promise<L.Layer>{
    return new Promise<L.Layer>((resolve, react) =>{
      this.bms.setPaging(false).setActiveApp("spaces/"+this.mappingSpace+"/styles").getAll().then(s=>{
        this.styles = s;
        for(let style of this.styles){
          this.int_styles[style.slug] = this.createIcon(style);
        }
        console.log(this.int_styles);
        
        let lyr = L.layerGroup([]);
        for (let itm of this.items){
          let m = L.marker(itm.point.coordinates.reverse(), {icon:L.icon(this.int_styles[itm.types[0]])});
          lyr.addLayer(m);
        }
        resolve( lyr );  
      });
    });
  } 
  isBase(){
    return false;
  }
  addToMap(m, bls, dls){
    this.getLayer().then(x=>{
      m.addLayer(x);
      dls["CityOS"] = x;
    });
  }
} 



@Component({
  selector: '[mn-map]',
  templateUrl: './mn-map.component.html',
  styleUrls: ['./mn-map.component.css'],
})
export class MnMapComponent {

  private makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < 5; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
  }
  
  @Input() conf:any;
  @Input() map_id:string;
  
  @Input() center:number[] = [51.505,-0.09];
  @Input() minzoom:number = 0;
  @Input() maxzoom:number = 20;
  @Input() startzoom:number = 13;
  
  @Input() controls = true;
  @Input() scrollZoom = false;
  @Input() zoomControl = true;
  
  @Input() legend = [];
  @Input() show_legend = true;
  
  @Input() draggable = true;
  
  @Input() start_marker;
  
  toggled = true;
  
  @ContentChildren(BaseLayer) baseLayers: QueryList<LeafLayer>;
  @ContentChildren(NamedLayer) namedLayers: QueryList<LeafLayer>;
  @ContentChildren(DataLayer) dataLayers: QueryList<LeafLayer>;
  @ContentChildren(MarkerLayer) markerLayers: QueryList<LeafLayer>;
  @ContentChildren(CityOSLayer) cityoslayer: QueryList<LeafLayer>;
  @ContentChildren(CityOSNearbyLayer) cityosnearbylayer: QueryList<LeafLayer>;
  @ContentChildren(CityOSBackgroundLayer) cityosbglayer: QueryList<LeafLayer>;
  @ContentChildren(MapboxLayer) mapboxLayers: QueryList<LeafLayer>;

  @Output() click:EventEmitter<any> = new EventEmitter();
  @Output() movestart:EventEmitter<any> = new EventEmitter();
  @Output() moveend:EventEmitter<any> = new EventEmitter();

  public map;
  
  layers:Array<LeafLayer> = [];

  private addLayer(layer:LeafLayer){
    this.layers.push(layer);
  }
  
  toggleLegend(){
    this.toggled = !this.toggled;
  }
  
  grid_unit:number = 170;
  grid_gutter:number = 15;
 
  constructor(private elementRef: ElementRef){
     if(this.map_id == null)
      this.map_id = this.makeid();
  }

  protected prepareLayers(){
    this.baseLayers.forEach(element => {
      this.addLayer(element);
    });
	  this.namedLayers.forEach(element => {
      this.addLayer(element);
    });
    this.dataLayers.forEach(element => {
      this.addLayer(element);
    });
    this.markerLayers.forEach(element => {
      this.addLayer(element);
    });
    this.mapboxLayers.forEach(element => {
      this.addLayer(element);
    });
    this.cityoslayer.forEach(element => {
      this.addLayer(element);
    });
    this.cityosbglayer.forEach(element => {
      this.addLayer(element);
    });
  }

  ngAfterViewInit() {
    try{
      this.map = L.map(this.map_id, {
        minZoom:this.minzoom, 
        maxZoom:this.maxzoom, 
        scrollWheelZoom:this.scrollZoom,
        zoomControl: this.zoomControl
      }).setView([this.center[0], this.center[1]], this.startzoom);
      
      this.prepareLayers();
  
      let bls = {};
      let dls = {};
  
      for(let lyr of this.layers){
        lyr.addToMap(this.map, bls, dls);
      }
      this.map._onResize(); 
  
      if(this.controls)
        L.control.layers(bls, dls, {position: 'bottomleft'}).addTo(this.map);
        
      if(this.start_marker){
        this.setZoom(18);
        this.setCenter(this.start_marker);
        this.addMarker(this.start_marker);
      }
    } catch (ex){
      console.log(ex);
    }
  }
  
  setCenter(lonlat){
    this.map.panTo(lonlat);
  }
  
  setZoom(zoom){
    this.map.setZoom(zoom);
  }
  
  search_marker = null;
  addMarker(lonlat){
    if (this.search_marker)
      this.map.removeLayer(this.search_marker);
    this.search_marker = L.marker(lonlat, {"draggable":this.draggable});
    this.search_marker.addTo(this.map);
    this.setCenter(lonlat);
    this.setZoom(18);
  }
  
  
  getGeojson(){
    return this.search_marker.toGeoJSON();
  }
}

