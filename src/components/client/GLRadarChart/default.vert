#version 300 es

#define PI radians(180.)

uniform int vertexCount;
uniform int dashCount;
uniform float weights[20];
uniform int type;
uniform float rotation;
uniform float breathe;

uniform vec4 backgroundColor;
uniform vec4 dataColor;
uniform vec4 lineColor;
uniform vec4 outlineColor;
uniform vec4 dataOutlineColor;
uniform vec4 centerPointColor;  // 중앙점 색상 추가

out float v_type;
out vec4 v_backgroundColor;
out vec4 v_dataColor;
out vec4 v_lineColor;
out vec4 v_outlineColor;
out vec4 v_dataOutlineColor;
out vec4 v_centerPointColor;

vec2 ori = vec2(0, 0);

vec2 rotate(vec2 v, float angle) {
    return vec2(v.x * cos(angle) - v.y * sin(angle), v.x * sin(angle) + v.y * cos(angle));
}

vec2 breatheEffect(vec2 v) {
    float scale = 1. + sin(breathe) * .2;
    return v * scale;
}

vec2 getPolygonVertexById(int id) {
    float angle = PI * 2. / float(vertexCount);
    return vec2(sin(angle * float(id)), cos(angle * float(id))) * weights[id % vertexCount];
}

vec2 createPolygon(int id) {
    int triangleId = id / 3;
    int vertexId = id % 3;
    if (vertexId == 0) {
        return ori;
    }
    return getPolygonVertexById(triangleId + vertexId);
}

vec2 createCenterPoint() {
    return ori;
}

vec2 createRadialDashedLine(int id) {
    float width = .01;
    int totalVerticesPerLine = 6 * dashCount;
    int lineId = id / totalVerticesPerLine;    // 몇 번째 선인지 (0, 1, 2)
    int vertexId = id % totalVerticesPerLine;  // 해당 선의 vertex 번호
    
    // lineId에 해당하는 꼭지점 위치 계산
    vec2 endVertex = getPolygonVertexById(lineId);
    vec2 direction = normalize(endVertex - ori);
    vec2 perpendicular = vec2(-direction.y, direction.x);
    vec2 offset = perpendicular * width;
    
    float totalLength = length(endVertex);
    float dashLength = totalLength / float(dashCount * 2);
    int dashId = vertexId / 6;
    int dashVertexId = vertexId % 6;
    
    vec2 dashStart = ori + direction * (dashLength * float(dashId * 2));
    vec2 dashEnd = ori + direction * (dashLength * float(dashId * 2 + 1));
    
    // 각 dash의 6개 vertex 위치 결정
    if (dashVertexId == 0) return dashStart + offset;
    if (dashVertexId == 1) return dashStart - offset;
    if (dashVertexId == 2) return dashEnd + offset;
    if (dashVertexId == 3) return dashStart - offset;
    if (dashVertexId == 4) return dashEnd + offset;
    return dashEnd - offset;
}

vec2 createOutline(int id) {
    float width = .01;
    int vertexId = id % 4;
    int lineId = id / 4;
    
    vec2 vertex = getPolygonVertexById(lineId + 1);
    vec2 nextVertex = getPolygonVertexById(lineId + 2);
    vec2 direction = normalize(vertex - nextVertex);
    vec2 perpendicular = vec2(-direction.y, direction.x);
    vec2 offset = perpendicular * width;
    
    if (vertexId == 0) return vertex + offset;
    if (vertexId == 1) return vertex - offset;
    if (vertexId == 2) return nextVertex + offset;
    return nextVertex - offset;
}

void main() {
    v_type = float(type);
    v_backgroundColor = backgroundColor;
    v_dataColor = dataColor;
    v_lineColor = lineColor;
    v_outlineColor = outlineColor;
    v_dataOutlineColor = dataOutlineColor;
    v_centerPointColor = centerPointColor;

    vec2 position;
    
    if (type == 0) {
        // Background polygon
        position = createPolygon(gl_VertexID);
    } else if (type == 1) {
        // Data polygon
        position = breatheEffect(rotate(createPolygon(gl_VertexID), rotation));
    } else if (type == 2) {
        // Center point
        position = createCenterPoint();
        gl_PointSize = 5.0;  // 중앙점 크기
    } else if (type == 3) {
        // Outline
        position = createOutline(gl_VertexID);
    } else if (type == 4) {
        // Radial dashed lines (중심에서 각 꼭지점)
        position = createRadialDashedLine(gl_VertexID);
    } else if (type == 5) {
        // Data outline
        position = breatheEffect(rotate(createOutline(gl_VertexID), rotation));
    }
    
    gl_Position = vec4(position, 0, 1);
}