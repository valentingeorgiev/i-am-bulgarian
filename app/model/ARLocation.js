/**
 * A data class representing a geographic location.
 * Contains helper methods for converting to various coordinate bases.
 */
export class ARLocation{
    static WGS84_A = 6378137.0;                  // WGS 84 semi-major axis constant in meters
    static WGS84_E2 = 0.00669437999014;          // square of WGS 84 eccentricity
    static R = 6371e3;                           // mean radius of the Earth in meters

    constructor(latitude, longitude, altitude){
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.inECEF = ARLocation.WSG84toECEF(latitude, longitude, altitude);
    }

    /**
     * Helper function to convert degrees to radians.
     */
    static toRadians(degrees){
        return degrees * (Math.PI/180);
    }
    
    /**
     * Converts World Geodetic System coordinates to an Earth Centred Earth Fixed coordinate vector.
     * Conversion from a WGS84 datum to ECEF is used as an intermediate step in converting
     * velocities to the north east down coordinate system.
     * @link https://en.wikipedia.org/wiki/Geographic_coordinate_conversion#From_geodetic_to_ECEF_coordinates
     */
    static WSG84toECEF(latitude, longitude, altitude) {
        let radLat = this.toRadians(latitude);
        let radLon = this.toRadians(longitude);

        let cosLat = Math.cos(radLat);
        let sinLat = Math.sin(radLat);
        let cosLon = Math.cos(radLon);
        let sinLon = Math.sin(radLon);

        let N = this.WGS84_A / Math.sqrt(1.0 - this.WGS84_E2 * sinLat * sinLat);
        let x = (N + altitude) * cosLat * cosLon;
        let y = (N + altitude) * cosLat * sinLon;
        let z = (N * (1.0 - this.WGS84_E2) + altitude) * sinLat;

        return [x, y, z];
    }

    /**
     * Calculates the Navigation coordinate vector [EAST, NORTH, UP] based on
     * a current reference location and a point of interest.
     * @link https://en.wikipedia.org/wiki/Geographic_coordinate_conversion#From_ECEF_to_ENU
     */
    static ECEFtoENU(currentLocation, POI){
        let radLat = this.toRadians(currentLocation.latitude);
        let radLon = this.toRadians(currentLocation.longitude);

        let cosLat = Math.cos(radLat);
        let sinLat = Math.sin(radLat);
        let cosLon = Math.cos(radLon);
        let sinLon = Math.sin(radLon);

        let dx = currentLocation.inECEF[0] - POI.inECEF[0];
        let dy = currentLocation.inECEF[1] - POI.inECEF[1];
        let dz = currentLocation.inECEF[2] - POI.inECEF[2];

        let east = -sinLon*dx + cosLon*dy;

        let north = -sinLat*cosLon*dx - sinLat*sinLon*dy + cosLat*dz;

        let up = cosLat*cosLon*dx + cosLat*sinLon*dy + sinLat*dz;

        // 1 is appended as Matrix.multiplyMV expects a 4 element vector
        return [east, north, up, 1];
    }

    /**
     * Calculates the distance in meters between two locations based on their latitude and longitude
     * using the haversine formula.
     * @link https://www.movable-type.co.uk/scripts/latlong.html
     */
    static distanceTo(l1, l2){
        const phi1 = this.toRadians(l1.latitude);
        const phi2 = this.toRadians(l2.latitude);
        const deltaPhi = this.toRadians(l2.latitude - l1.latitude);
        const deltaLambda = this.toRadians(l2.longitude - l1.longitude);

        const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
                  Math.cos(phi1) * Math.cos(phi2) *
                  Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const d = this.R * c;

        return d;
    }
}