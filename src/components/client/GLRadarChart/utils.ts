import { RadarChartStyle } from './types';

/* eslint-disable no-unused-vars */
export enum PaintType {
  Background = 0,
  Data = 1,
  Lines = 2,
  Outline = 3,
  DashedLines = 4,
  DataOutline = 5,
  CenterPoint = 6, // 중앙 점을 위한 새로운 타입 추가
}
/* eslint-enable no-unused-vars */

export const initializeGL = (chart: HTMLCanvasElement, vert: string, frag: string) => {
  const gl = chart.getContext('webgl2', {
    premultipliedAlpha: false,
  });
  if (!gl) throw new Error('WebGL2 not supported');

  gl.clear(gl.COLOR_BUFFER_BIT);

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  if (!vertexShader || !fragmentShader) throw new Error('Failed to create shader');

  gl.shaderSource(vertexShader, vert);
  gl.shaderSource(fragmentShader, frag);
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  const program = gl.createProgram();
  if (!program) throw new Error('Failed to create program');

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  gl.useProgram(program);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  return gl;
};

export const paintGL = (
  gl: WebGL2RenderingContext,
  paintType: PaintType,
  paintLocation: WebGLUniformLocation | null,
  weightsLocation: WebGLUniformLocation | null,
  vertices: Float32Array,
  points: number,
  dashCountLocation?: WebGLUniformLocation | null,
  dashCount?: number
) => {
  const contextBase = paintType === PaintType.Lines
    || paintType === PaintType.Outline
    || paintType === PaintType.DataOutline
    ? gl.TRIANGLE_STRIP
    : paintType === PaintType.CenterPoint
      ? gl.POINTS
      : gl.TRIANGLES;

  gl.uniform1i(paintLocation, paintType);
  gl.uniform1fv(weightsLocation, vertices);
  if (dashCountLocation && dashCount) gl.uniform1i(dashCountLocation, dashCount);
  gl.drawArrays(contextBase, 0, points * (dashCount ?? 1));
};

export const render = (gl: WebGL2RenderingContext, data: Float32Array, vertices: number, chartStyle: RadarChartStyle, rotation?: number, breathe?: number) => {
  const {
    backgroundColor = [0.9, 0.9, 0.9, 1],
    lineColor = [0.55, 0.55, 0.55, 1],
    outlineColor = [0.6, 0.6, 0.6, 1],
    dataColor = [0.4, 0.8, 0.4, 0.75],
    dataOutlineColor = [0.4, 0.8, 0.4, 0.95],
    centerPointColor = [0.55, 0.55, 0.55, 1],
  } = chartStyle;

  const dashCount = 5; // 각 선의 대시 개수
  const fullVertices = new Float32Array(new Array(vertices).fill(0.95));

  const uniformVertexCountLocation = gl.getUniformLocation(gl.getParameter(gl.CURRENT_PROGRAM), 'vertexCount');
  const uniformWeightsLocation = gl.getUniformLocation(gl.getParameter(gl.CURRENT_PROGRAM), 'weights');
  const uniformTypeLocation = gl.getUniformLocation(gl.getParameter(gl.CURRENT_PROGRAM), 'type');
  const uniformDashCountLocation = gl.getUniformLocation(gl.getParameter(gl.CURRENT_PROGRAM), 'dashCount');
  const uniformRotationLocation = gl.getUniformLocation(gl.getParameter(gl.CURRENT_PROGRAM), 'rotation');
  const uniformBreatheLocation = gl.getUniformLocation(gl.getParameter(gl.CURRENT_PROGRAM), 'breathe');

  const uniformBackgroundColorLocation = gl.getUniformLocation(gl.getParameter(gl.CURRENT_PROGRAM), 'backgroundColor');
  const uniformLineColorLocation = gl.getUniformLocation(gl.getParameter(gl.CURRENT_PROGRAM), 'lineColor');
  const uniformOutlineColorLocation = gl.getUniformLocation(gl.getParameter(gl.CURRENT_PROGRAM), 'outlineColor');
  const uniformDataColorLocation = gl.getUniformLocation(gl.getParameter(gl.CURRENT_PROGRAM), 'dataColor');
  const uniformDataOutlineColorLocation = gl.getUniformLocation(gl.getParameter(gl.CURRENT_PROGRAM), 'dataOutlineColor');
  const uniformCenterPointColorLocation = gl.getUniformLocation(gl.getParameter(gl.CURRENT_PROGRAM), 'centerPointColor');

  gl.uniform1i(uniformVertexCountLocation, vertices);
  gl.uniform1f(uniformRotationLocation, rotation ?? 0);
  gl.uniform1f(uniformBreatheLocation, breathe ?? 0);

  gl.uniform4fv(uniformBackgroundColorLocation, backgroundColor);
  gl.uniform4fv(uniformLineColorLocation, lineColor);
  gl.uniform4fv(uniformOutlineColorLocation, outlineColor);
  gl.uniform4fv(uniformDataColorLocation, dataColor);
  gl.uniform4fv(uniformDataOutlineColorLocation, dataOutlineColor);
  gl.uniform4fv(uniformCenterPointColorLocation, centerPointColor);

  // Background
  paintGL(gl, PaintType.Background, uniformTypeLocation, uniformWeightsLocation, fullVertices, vertices * 3);

  // Center point
  paintGL(gl, PaintType.CenterPoint, uniformTypeLocation, uniformWeightsLocation, new Float32Array([0, 0]), 1);

  // Radial dashed lines - 각 꼭지점으로 향하는 3개의 선
  paintGL(gl, PaintType.DashedLines, uniformTypeLocation, uniformWeightsLocation, fullVertices, vertices * 6 * dashCount * 3, uniformDashCountLocation, dashCount);

  // Outline
  paintGL(gl, PaintType.Outline, uniformTypeLocation, uniformWeightsLocation, fullVertices, vertices * 4);

  // Data polygon
  paintGL(gl, PaintType.Data, uniformTypeLocation, uniformWeightsLocation, data, vertices * 3);

  // Data outline
  paintGL(gl, PaintType.DataOutline, uniformTypeLocation, uniformWeightsLocation, data, vertices * 4);
};

export const createClipPathCSS = (vertices: number, radius = 0.95) => {
  const angle = 360 / vertices;

  return `polygon(
    ${ Array.from({ length: vertices }, (_, i) => {
      const x = Math.sin(((angle * i) + 180) * Math.PI / 180) * radius;
      const y = Math.cos(((angle * i) + 180) * Math.PI / 180) * radius;
      return `${ ((x + 1) * 50).toFixed(2) }% ${ ((y + 1) * 50).toFixed(2) }%`;
    }).join(', ') })`;
};
export const createAbsoluteLabelsCSS = (vertices: number, labelWidth: number, labelHeight: number, radius = 0.95) => {
  const angle = 360 / vertices;

  return Array.from({ length: vertices }, (_, i) => {
    const x = -Math.sin(((angle * i) + 180) * Math.PI / 180) * radius * 1.1;
    const y = Math.cos(((angle * i) + 180) * Math.PI / 180) * radius * 0.9;
    return [`calc(${ (x + 1) * 50 }% - ${ labelWidth / 2 }rem)`, `calc(${ (y + 1) * 50 }% - ${ labelHeight / 2 }rem)`];
  });
};