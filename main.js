function main() {
    var kanvas = document.getElementById("kanvas");
    var gl = kanvas.getContext("webgl");

    // Vertex shader
    var vertexShaderCode = 
    "void main() {" +
    "}";
    var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject);

    // Fragment shader
    var fragmentShaderCode = `
    void main() {

    }
    `;
    var vertexShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject);

    var shaderProgram = gl.createProgram(); // wadah dari executable (.exe)
    gl.attachShader(shaderProgram, vertexShaderObject);
    gl.attachShader(shaderProgram, fragmentShaderObject);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.clearColor(1.0, 0.5, 0.0, 1.0);
    //            Merah, Hijau, Biru, Transparansi
    gl.clear(gl.COLOR_BUFFER_BIT);

}