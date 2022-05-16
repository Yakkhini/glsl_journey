#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // axis the paper
uniform vec2 u_mouse; // mouse position on paper
uniform float u_time; // the time (seconds)

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    gl_FragColor = vec4(1.9 * st.x, abs(st.x + sin(3.0 * sin(0.1 * u_time * st.y) * u_time)), 0.8, 1.0);
}