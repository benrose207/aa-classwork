export default class MarkerManager {
    constructor(map) {
        this.map = map;
        this.markers = {};
    }

    updateMarkers(benches) {
        let benchesObj = {};
        benches.forEach(bench => {
            if (!this.markers[bench.id]) {
                this.createMarkerFromBench(bench);
            }
            benchesObj[bench.id] = true;
        });

        Object.keys(this.markers).forEach(markerId => {
            if (!benchesObj[markerId]) {
                this.removeMarkers(markerId);
            }
        })
    }

    createMarkerFromBench(bench) {
        const marker = new google.maps.Marker({
            position: {lat: bench.lat, lng: bench.lng },
            map: this.map,
            title: bench.description
        })

        this.markers[bench.id] = marker;
    }

    removeMarkers(markerId) {
        this.markers[markerId].setMap(null);
        delete this.markers[markerId];
    }
}