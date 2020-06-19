export default class MarkerManager {
    constructor(map) {
        this.map = map;
        this.markers = {};
    }

    updateMarkers(benches) {
        benches.forEach(bench => {
            if (!this.markers[bench.id]) {
                this.createMarkerFromBench(bench);
            }
        });
    }

    createMarkerFromBench(bench) {
        const marker = new google.maps.Marker({
            position: {lat: bench.lat, lng: bench.lng },
            map: this.map,
            title: bench.description
        })

        this.markers[bench.id] = marker;
    }
}