import React from "react";
import MarkerManager from "../../util/marker_manager";

class BenchMap extends React.Component {

    componentDidMount() {
        const mapOptions = {
            center: { lat: 37.8207495, lng: -122.2516465},
            zoom: 13
        };

        this.map = new google.maps.Map(this.mapNode, mapOptions);
        this.MarkerManager = new MarkerManager(this.map);
        this.MarkerManager.updateMarkers(this.props.benches);

        this.map.addListener("idle", () => {
            const LatLngBounds = this.map.getBounds();
            const ne = LatLngBounds.getNorthEast();
            const sw = LatLngBounds.getSouthWest();

            const bounds = {
                northEast: { lat: ne.lat(), lng: ne.lng() },
                southWest: { lat: sw.lat(), lng: sw.lng() }
            }

            this.props.updateBounds(bounds)
        })
    }

    componentDidUpdate() {
        this.MarkerManager.updateMarkers(this.props.benches);
    }

    render() {
        // what is "ref" doing below? Something to do with getting the right element from the DOM?
        return (
            <div id="map-container" ref={ map => this.mapNode = map }></div>
        )
    }
}

export default BenchMap