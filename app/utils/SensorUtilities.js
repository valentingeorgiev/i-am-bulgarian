/**
 * Device sensor utility class.
 */
export class SensorUtilities{
    /**
     * Computes the inclination matrix I as well as the rotation matrix
     * R transforming a vector from the device coordinate system to the
     * world's coordinate system which is defined as a direct orthonormal basis,
     * where:
     * X is defined as the vector product Y.Z (It is tangential to
     * the ground at the device's current location and roughly points East).
     * Y is tangential to the ground at the device's current location and
     * points towards the magnetic North Pole.
     * Z points towards the sky and is perpendicular to the ground.
     */
    static getRotationMatrix(I, R, gravity, geomagnetic){
      let Ax = gravity[0];
      let Ay = gravity[1];
      let Az = gravity[2];
      const normsqA = (Ax * Ax + Ay * Ay + Az * Az);
      const g = 9.81;
      const freeFallGravitySquared = 0.01 * g * g;
      if (normsqA < freeFallGravitySquared) {
        // gravity less than 10% of normal value
        return false;
      }
      const Ex = geomagnetic[0];
      const Ey = geomagnetic[1];
      const Ez = geomagnetic[2];
      let Hx = Ey * Az - Ez * Ay;
      let Hy = Ez * Ax - Ex * Az;
      let Hz = Ex * Ay - Ey * Ax;
      const normH = Math.sqrt(Hx * Hx + Hy * Hy + Hz * Hz);
      if (normH < 0.1) {
        // device is close to free fall (or in space?), or close to
        // magnetic north pole. Typical values are  > 100.
        return false;
      }
      const invH = 1.0 / normH;
      Hx *= invH;
      Hy *= invH;
      Hz *= invH;
      const invA = 1.0 / Math.sqrt(Ax * Ax + Ay * Ay + Az * Az);
      Ax *= invA;
      Ay *= invA;
      Az *= invA;
      const Mx = Ay * Hz - Az * Hy;
      const My = Az * Hx - Ax * Hz;
      const Mz = Ax * Hy - Ay * Hx;
      if (R != null) {
        if (R.length == 9) {
          R[0] = Hx;     R[1] = Hy;     R[2] = Hz;
          R[3] = Mx;     R[4] = My;     R[5] = Mz;
          R[6] = Ax;     R[7] = Ay;     R[8] = Az;
        } else if (R.length == 16) {
          R[0]  = Hx;    R[1]  = Hy;    R[2]  = Hz;   R[3]  = 0;
          R[4]  = Mx;    R[5]  = My;    R[6]  = Mz;   R[7]  = 0;
          R[8]  = Ax;    R[9]  = Ay;    R[10] = Az;   R[11] = 0;
          R[12] = 0;     R[13] = 0;     R[14] = 0;    R[15] = 1;
        }
      }
      if (I != null) {
        // compute the inclination matrix by projecting the geomagnetic
        // vector onto the Z (gravity) and X (horizontal component
        // of geomagnetic vector) axes.
        const invE = 1.0 / Math.sqrt(Ex * Ex + Ey * Ey + Ez * Ez);
        const c = (Ex * Mx + Ey * My + Ez * Mz) * invE;
        const s = (Ex * Ax + Ey * Ay + Ez * Az) * invE;
        if (I.length == 9) {
          I[0] = 1;     I[1] = 0;     I[2] = 0;
          I[3] = 0;     I[4] = c;     I[5] = s;
          I[6] = 0;     I[7] = -s;     I[8] = c;
        } else if (I.length == 16) {
          I[0] = 1;     I[1] = 0;     I[2] = 0;
          I[4] = 0;     I[5] = c;     I[6] = s;
          I[8] = 0;     I[9] = -s;     I[10] = c;
          I[3] = I[7] = I[11] = I[12] = I[13] = I[14] = 0;
          I[15] = 1;
        }
      }
    }
}