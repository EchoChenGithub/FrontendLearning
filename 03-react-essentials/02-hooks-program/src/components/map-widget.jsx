import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

export class MapWidget {
    constructor(domNode) {
        this.map = L.map(domNode, {
            zoomControl: false,
            doubleClickZoom: false,
            boxZoom: false,
            keyboard: false,
            scrollWheelZoom: false,
            zoomAnimation: false,
            touchZoom: false,
            zoomSnap: 0.1
        });
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(this.map);
        this.map.setView([0, 0], 0);
    }
    setZoom(level) {
        this.map.setZoom(level);
    }
}