/*
Copyright (c) 2022 Yakkhini
GLSL_Journey is licensed under Mulan PSL v2.
You can use this software according to the terms and conditions of the Mulan PSL v2.
You may obtain a copy of Mulan PSL v2 at:
         http://license.coscl.org.cn/MulanPSL2
THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
See the Mulan PSL v2 for more details.
*/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line

float Plot(vec2 st) {
    return smoothstep(abs(sin(u_time + (3.1415926) / 2.0)) * abs(cos(st.x)), 0.0, abs(st.y - 1.0 + st.x));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    float y = smoothstep(1.0,-1.0,sin(u_time));

    vec3 color = vec3(y + 0.35,y,y);
    //Plot a line using Plot function
    float pct = Plot(st);
    color = (1.0 - pct) * color + pct * vec3(1.0,0.7,1.0);
    gl_FragColor = vec4(color,1.0);

}