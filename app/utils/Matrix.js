/**
 * Matrix math utilities. These methods operate on OpenGL ES format
 * matrices and vectors stored in floating point arrays.
 */
export class Matrix{
    /**
     * Multiply a 4 element vector by a 4x4 matrix and store the result in a 4
     * element column vector.
     * In matrix notation: result = lhs x rhs
     */
    static multiplyMV(resultVector, resultVectorOffset, lhsMatrix, lhsMatrixOffset, rhsVector, rhsVectorOffset){
      resultVector[resultVectorOffset + 0] = lhsMatrix[lhsMatrixOffset + 0] * rhsVector[rhsVectorOffset + 0] + lhsMatrix[lhsMatrixOffset + 4] * rhsVector[rhsVectorOffset + 1] + lhsMatrix[lhsMatrixOffset + 8] * rhsVector[rhsVectorOffset + 2] + lhsMatrix[lhsMatrixOffset + 12] * rhsVector[rhsVectorOffset + 3];
      resultVector[resultVectorOffset + 1] = lhsMatrix[lhsMatrixOffset + 1] * rhsVector[rhsVectorOffset + 0] + lhsMatrix[lhsMatrixOffset + 5] * rhsVector[rhsVectorOffset + 1] + lhsMatrix[lhsMatrixOffset + 9] * rhsVector[rhsVectorOffset + 2] + lhsMatrix[lhsMatrixOffset + 13] * rhsVector[rhsVectorOffset + 3];
      resultVector[resultVectorOffset + 2] = lhsMatrix[lhsMatrixOffset + 2] * rhsVector[rhsVectorOffset + 0] + lhsMatrix[lhsMatrixOffset + 6] * rhsVector[rhsVectorOffset + 1] + lhsMatrix[lhsMatrixOffset + 10] * rhsVector[rhsVectorOffset + 2] + lhsMatrix[lhsMatrixOffset + 14] * rhsVector[rhsVectorOffset + 3];
      resultVector[resultVectorOffset + 3] = lhsMatrix[lhsMatrixOffset + 3] * rhsVector[rhsVectorOffset + 0] + lhsMatrix[lhsMatrixOffset + 7] * rhsVector[rhsVectorOffset + 1] + lhsMatrix[lhsMatrixOffset + 11] * rhsVector[rhsVectorOffset + 2] + lhsMatrix[lhsMatrixOffset + 15] * rhsVector[rhsVectorOffset + 3];
    }

    /**
     * Multiply two 4x4 matrices together and store the result in a third 4x4 matrix. 
     * In matrix notation: result = lhs x rhs.
     * Due to the way matrix multiplication works, the result matrix will have the same
     * effect as first multiplying by the rhs matrix, then multiplying by the lhs matrix.
     */
    static multiplyMM(result, resultOffset, lhs, rhs){
      result[resultOffset + 0] = rhs[0] * lhs[0] + rhs[1] * lhs[4] + rhs[2] * lhs[8] + rhs[3] * lhs[12];
      result[resultOffset + 1] = rhs[0] * lhs[1] + rhs[1] * lhs[5] + rhs[2] * lhs[9] + rhs[3] * lhs[13];
      result[resultOffset + 2] = rhs[0] * lhs[2] + rhs[1] * lhs[6] + rhs[2] * lhs[10] + rhs[3] * lhs[14];
      result[resultOffset + 3] = rhs[0] * lhs[3] + rhs[1] * lhs[7] + rhs[2] * lhs[11] + rhs[3] * lhs[15];

      result[resultOffset + 4] = rhs[4] * lhs[0] + rhs[5] * lhs[4] + rhs[6] * lhs[8] + rhs[7] * lhs[12];
      result[resultOffset + 5] = rhs[4] * lhs[1] + rhs[5] * lhs[5] + rhs[6] * lhs[9] + rhs[7] * lhs[13];
      result[resultOffset + 6] = rhs[4] * lhs[2] + rhs[5] * lhs[6] + rhs[6] * lhs[10] + rhs[7] * lhs[14];
      result[resultOffset + 7] = rhs[4] * lhs[3] + rhs[5] * lhs[7] + rhs[6] * lhs[11] + rhs[7] * lhs[15];

      result[resultOffset + 8] = rhs[8] * lhs[0] + rhs[9] * lhs[4] + rhs[10] * lhs[8] + rhs[11] * lhs[12];
      result[resultOffset + 9] = rhs[8] * lhs[1] + rhs[9] * lhs[5] + rhs[10] * lhs[9] + rhs[11] * lhs[13];
      result[resultOffset + 10] = rhs[8] * lhs[2] + rhs[9] * lhs[6] + rhs[10] * lhs[10] + rhs[11] * lhs[14];
      result[resultOffset + 11] = rhs[8] * lhs[3] + rhs[9] * lhs[7] + rhs[10] * lhs[11] + rhs[11] * lhs[15];

      result[resultOffset + 12] = rhs[12] * lhs[0] + rhs[13] * lhs[4] + rhs[14] * lhs[8] + rhs[15] * lhs[12];
      result[resultOffset + 13] = rhs[12] * lhs[1] + rhs[13] * lhs[5] + rhs[14] * lhs[9] + rhs[15] * lhs[13];
      result[resultOffset + 14] = rhs[12] * lhs[2] + rhs[13] * lhs[6] + rhs[14] * lhs[10] + rhs[15] * lhs[14];
      result[resultOffset + 15] = rhs[12] * lhs[3] + rhs[13] * lhs[7] + rhs[14] * lhs[11] + rhs[15] * lhs[15];
  }

    /**
     * Create a visual representation of perspective projection that is used
     * to convert a 3D point in the world coordinate space to the 2D point on the screen.
     * Defined by a projection matrix in terms of six clip planes.
     */
    static frustumM(matrix, offset, left, right, bottom, top, near, far){
      let r_width  = 1.0 / (right - left);
      let r_height = 1.0 / (top - bottom);
      let r_depth  = 1.0 / (near - far);
      let x = 2.0 * (near * r_width);
      let y = 2.0 * (near * r_height);
      let A = 2.0 * ((right + left) * r_width);
      let B = (top + bottom) * r_height;
      let C = (far + near) * r_depth;
      let D = 2.0 * (far * near * r_depth);
      matrix[offset + 0] = x;
      matrix[offset + 5] = y;
      matrix[offset + 8] = A;
      matrix[offset +  9] = B;
      matrix[offset + 10] = C;
      matrix[offset + 14] = D;
      matrix[offset + 11] = -1.0;
      matrix[offset +  1] = 0.0;
      matrix[offset +  2] = 0.0;
      matrix[offset +  3] = 0.0;
      matrix[offset +  4] = 0.0;
      matrix[offset +  6] = 0.0;
      matrix[offset +  7] = 0.0;
      matrix[offset + 12] = 0.0;
      matrix[offset + 13] = 0.0;
      matrix[offset + 15] = 0.0;
    }
}