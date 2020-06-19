import React from "react";
import MarkerManager from "../../util/marker_manager";
import { withRouter } from "react-router-dom";

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
            
            this.props.updateFilter(bounds)
        })

        this.map.addListener("click", (e) => this._handleclick(e.latLng))
    }

    _handleclick(coords) {
        this.props.history.push({
            pathname: "benches/new",
            search: `lat=${coords.lat()}&lng=${coords.lng()}`
        });
    }

    componentDidUpdate() {
        this.MarkerManager.updateMarkers(this.props.benches);
    }

    render() {
        return (
            <div 
                id="map-container" 
                ref={ map => this.mapNode = map }
            >
            </div>
        )
    }
}

export default withRouter(BenchMap);