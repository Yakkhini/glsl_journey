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
uniform float u_time;

vec3 rgb2hsb( in vec3 c ){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz),
                 vec4(c.gb, K.xy),
                 step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r),
                 vec4(c.r, p.yzx),
                 step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)),
                d / (q.x + e),
                q.x);
}

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

void main() {
    vec3 colorA = hsb2rgb(vec3(0.5, 1.0, 0.8));
    vec3 colorB = hsb2rgb(vec3(0.9, 0.5333, 0.8235));
    vec3 colorC = vec3(0.4078, 0.2431, 0.0275);
    vec3 colorD = vec3(0.8706, 0.4, 0.4);
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy/u_resolution - smoothstep(0.0, 1.0, u_resolution) / 2.0;

    vec3 colorAlpha = mix(colorA, colorC, step(0.0, st.y - 0.3 * st.x) * step(0.0, 7.0 * st.x - st.y));
    vec3 colorBeta = mix(colorB, colorD, step(0.0, st.y - 0.3 * st.x) * step(0.0, 7.0 * st.x - st.y));

    float pct = abs(sin( (20.0 * abs(sin(u_time)) + 12.0) * sqrt(st.x * st.x + st.y * st.y)));

    // Mix uses pct (a value from 0-1) to
    // mix the two colors
    vec3 color1 = mix(colorAlpha, colorBeta, pct);
    vec3 color2 = mix(colorBeta, colorAlpha, pct);
    color = mix(color1, color2, abs(sin(0.5 * u_time)));

    gl_FragColor = vec4(color2,1.0);
}