var canvas, gl;

// Vertices and indices of ALL objects that will be drawn on screen.
var vertices = [];
var indices = [];

// VertexBufferObject and IndexBufferObject for rendering.
var VBO;
var IBO;

function initialize() {
    console.log("Initializing...")

    // Create canvas, check if WebGL is supported.
    canvas = document.getElementById("game");
    gl = canvas.getContext("webgl");
    if (!gl) {
        console.error("ERROR: WebGL is not supported.");
    }
    
    // Set viewport & clear color.
    gl.viewport(0, 0, canvas.width, canvas.height);
    //gl.clearColor(1.0, 1.0, 0.8, 1.0);
    gl.clearColor(0.1, 0.1, 0.1, 1.0);

    // Load shaders.
    var program = initialize_shaders(gl, "shaders/vshader.glsl", "shaders/fshader.glsl");
    gl.useProgram(program);

    // Create a buffer to bind player vertices & indices to, and buffer.
    VBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    
    IBO = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    // Get position attribute location, and bind the buffer to that attribute.
    var positionAttribLocation = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(
        positionAttribLocation,      // Attribute location
        2,                          // Number of elements per attribute
        gl.FLOAT,                   // Data type of element
        gl.FLASE,
        5 * Float32Array.BYTES_PER_ELEMENT,     // Size of each vertex
        0                                       // Offset of the specific attribute
    );

    // Get color attribute location, and bind the buffer to that attribute.
    var colorAttribLocation = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(
        colorAttribLocation,             // Attribute location
        3,                              // Number of elements per attribute
        gl.FLOAT,                       // Data type of element
        gl.FLASE,
        5 * Float32Array.BYTES_PER_ELEMENT,     // Size of each vertex
        2 * Float32Array.BYTES_PER_ELEMENT      // Offset of the specific attribute
    );

    // Enable attributes.
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    // Start game loop.
    gl.useProgram(program);
    gl.clear(gl.COLOR_BUFFER_BIT);
    setInterval(game_loop, 20);
}

// gl.drawElements(gl.TRIANGLES, player.indices.length, gl.UNSIGNED_SHORT, 0);