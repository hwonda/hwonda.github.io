#version 300 es

precision highp float;

in float v_type;

in vec4 v_backgroundColor;
in vec4 v_dataColor;
in vec4 v_lineColor;
in vec4 v_outlineColor;
in vec4 v_dataOutlineColor;

out vec4 fragColor;

void main(){
  if(v_type==0.)fragColor=v_backgroundColor;
  else if(v_type==2.||v_type==4.)fragColor=v_lineColor;
  else if(v_type==3.)fragColor=v_outlineColor;
  else if(v_type==5.)fragColor=v_dataOutlineColor;
  else fragColor=v_dataColor;
}