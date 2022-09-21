function main() {
  var kanvas = document.getElementById('kanvas');
  var gl = kanvas.getContext('webgl');

  var vertices = [
    0.5, 0.5, 0.0, 1.0, 1.0, // A: kanan atas (biru langit)
    0.0, 0.0, 1.0, 0.0, 1.0, // B: bawah tengah (magenta)
    -0.5, 0.5, 1.0, 1.0, 0.0, // C: kiri atas (kuning)
    0.0, 1.0, 1.0, 1.0, 1.0, //D: atas tengah (putih)
  ];

  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(vertices),
    gl.STATIC_DRAW
  );

  // Vertex shader
  var vertexShaderCode = `
    attribute vec2 aPosition;
    attribute vec3 aColor;
    uniform float uTheta;
    varying vec3 vColor;
    void main() {
      float x = -sin(uTheta) * aPosition.x + cos(uTheta) * aPosition.x;
      float y = cos(uTheta) * aPosition.x + sin(uTheta) * aPosition.y;
      gl_Position = vec4(x, y, 0.0, 1.0);
      vColor = aColor;
    }
  `;
  var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShaderObject, vertexShaderCode);
  gl.compileShader(vertexShaderObject);

  // Fragment shader
  var fragmentShaderCode = `
    precision mediump float;
    varying vec3 vColor;
    void main() {
      gl_FragColor = vec4(vColor, 1.0);
    }
  `;
  var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
  gl.compileShader(fragmentShaderObject);

  var shaderProgram = gl.createProgram(); // wadah dari executable (.exe)
  gl.attachShader(shaderProgram, vertexShaderObject);
  gl.attachShader(shaderProgram, fragmentShaderObject);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  var theta = 0;

  var uTheta = gl.UniformLocation(shaderProgram, 'uTheta');

  // Kita mengajari GPU bagaimana caranya mengoleksi
  // nilai posisi dari ARRAY_BUFFER
  // untuk setiap verteks yang sedang diproses
  var aPosition = gl.getAttribLocation(shaderProgram, 'aPosition');
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 
    5 * Float32Array.BYTES_PER_ELEMENT, 
    0);
  gl.enableVertexAttribArray(aPosition);

  var aColor = gl.getAttribLocation(shaderProgram, 'aColor');
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 
    5 * Float32Array.BYTES_PER_ELEMENT, 
    2 * Float32Array.BYTES_PER_ELEMENT);
  gl.enableVertexAttribArray(aColor);

  function render() {
    setTimeout(function(){
      gl.clearColor(1.0, 0.65, 0.0, 1.0);
    //            Merah, Hijau, Biru, Transparansi
      gl.clear(gl.COLOR_BUFFER_BIT);
      theta += 0.1;
      gl.uniform1f(uTheta, theta);
      // var vektor2D = [x, y];
      // gl.uniform2f(uTheta, vektor2D[0], vektor2D[1]);
      // gl.uniform2fv(uTheta, vektor2D)
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }, 1000/30)
    
  }
  render()
}
