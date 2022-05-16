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

uniform vec2 u_resolution; // axis the paper
uniform vec2 u_mouse; // mouse position on paper
uniform float u_time; // the time (seconds)

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    gl_FragColor = vec4(1.9 * st.x, abs(st.x + sin(3.0 * sin(0.1 * u_time * st.y) * u_time)), 0.8, 1.0);
}