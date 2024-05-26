"use strict";

var gl;
var theta = [0, 0, 0];
var translateVector = [0, 0, 0];
var scaleVector = [1, 1, 1];
var lightposVector = [0.0, 0, 8.0];
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var speed = 0.01;
var direction = true;
var isrotate = true;
var modelViewMatrixLoc, projectionMatrixLoc;
var modelViewMatrix, projectionMatrix;

var vertices = [
    //P
    vec4(-0.7, -0.25, 0, 1.0),
    vec4(-0.8, 0.25, 0, 1.0),
    vec4(-0.8, -0.25, 0, 1.0),

    vec4(-0.7, -0.25, 0, 1.0),
    vec4(-0.7, 0.25, 0, 1.0),
    vec4(-0.8, 0.25, 0, 1.0),

    vec4(-0.8, 0.25, 0, 1.0),
    vec4(-0.5, 0.15, 0, 1.0),
    vec4(-0.6, 0.25, 0, 1.0),

    vec4(-0.8, 0.25, 0, 1.0),
    vec4(-0.8, 0.15, 0, 1.0),
    vec4(-0.5, 0.15, 0, 1.0),

    vec4(-0.6, 0.25, 0, 1.0),
    vec4(-0.5, 0.05, 0, 1.0),
    vec4(-0.5, 0.15, 0, 1.0),

    vec4(-0.6, 0.25, 0, 1.0),
    vec4(-0.6, -0.05, 0, 1.0),
    vec4(-0.5, 0.05, 0, 1.0),

    vec4(-0.5, 0.05, 0, 1.0),
    vec4(-0.8, 0.05, 0, 1.0),
    vec4(-0.8, -0.05, 0, 1.0),

    vec4(-0.5, 0.05, 0, 1.0),
    vec4(-0.8, -0.05, 0, 1.0),
    vec4(-0.6, -0.05, 0, 1.0),

    vec4(-0.8, 0.25, 0, 1.0),
    vec4(-0.8, 0.25, -0.1, 1.0),
    vec4(-0.8, -0.25, 0, 1.0),

    vec4(-0.8, 0.25, -0.1, 1.0),
    vec4(-0.8, -0.25, -0.1, 1.0),
    vec4(-0.8, -0.25, 0, 1.0),

    vec4(-0.8, 0.25, 0, 1.0),
    vec4(-0.6, 0.25, -0.1, 1.0),
    vec4(-0.8, 0.25, -0.1, 1.0),

    vec4(-0.8, 0.25, 0, 1.0),
    vec4(-0.6, 0.25, 0, 1.0),
    vec4(-0.6, 0.25, -0.1, 1.0),

    vec4(-0.6, 0.25, 0, 1.0),
    vec4(-0.5, 0.15, -0.1, 1.0),
    vec4(-0.6, 0.25, -0.1, 1.0),

    vec4(-0.6, 0.25, 0, 1.0),
    vec4(-0.5, 0.15, 0, 1.0),
    vec4(-0.5, 0.15, -0.1, 1.0),

    vec4(-0.5, 0.15, 0, 1.0),
    vec4(-0.5, 0.05, -0.1, 1.0),
    vec4(-0.5, 0.15, -0.1, 1.0),

    vec4(-0.5, 0.15, 0, 1.0),
    vec4(-0.5, 0.05, 0, 1.0),
    vec4(-0.5, 0.05, -0.1, 1.0),

    vec4(-0.5, 0.05, 0, 1.0),
    vec4(-0.6, -0.05, -0.1, 1.0),
    vec4(-0.5, 0.05, -0.1, 1.0),

    vec4(-0.5, 0.05, 0, 1.0),
    vec4(-0.6, -0.05, 0, 1.0),
    vec4(-0.6, -0.05, -0.1, 1.0),

    vec4(-0.6, -0.05, 0, 1.0),
    vec4(-0.7, -0.05, -0.1, 1.0),
    vec4(-0.6, -0.05, -0.1, 1.0),

    vec4(-0.6, -0.05, 0, 1.0),
    vec4(-0.7, -0.05, 0, 1.0),
    vec4(-0.7, -0.05, -0.1, 1.0),

    vec4(-0.7, -0.05, 0, 1.0),
    vec4(-0.7, -0.25, -0.1, 1.0),
    vec4(-0.7, -0.05, -0.1, 1.0),

    vec4(-0.7, -0.05, 0, 1.0),
    vec4(-0.7, -0.25, 0, 1.0),
    vec4(-0.7, -0.25, -0.1, 1.0),

    vec4(-0.7, -0.25, 0, 1.0),
    vec4(-0.8, -0.25, -0.1, 1.0),
    vec4(-0.7, -0.25, -0.1, 1.0),

    vec4(-0.7, -0.25, 0, 1.0),
    vec4(-0.8, -0.25, 0, 1.0),
    vec4(-0.8, -0.25, -0.1, 1.0),

    vec4(-0.7, 0.15, 0, 1.0),
    vec4(-0.7, 0.05, -0.1, 1.0),
    vec4(-0.7, 0.15, -0.1, 1.0),

    vec4(-0.7, 0.15, 0, 1.0),
    vec4(-0.7, 0.05, 0, 1.0),
    vec4(-0.7, 0.05, -0.1, 1.0),

    vec4(-0.7, 0.15, 0, 1.0),
    vec4(-0.7, 0.15, -0.1, 1.0),
    vec4(-0.6, 0.15, -0.1, 1.0),

    vec4(-0.7, 0.15, 0, 1.0),
    vec4(-0.6, 0.15, -0.1, 1.0),
    vec4(-0.6, 0.15, 0, 1.0),

    vec4(-0.6, 0.15, 0, 1.0),
    vec4(-0.6, 0.15, -0.1, 1.0),
    vec4(-0.6, 0.05, -0.1, 1.0),

    vec4(-0.6, 0.15, 0, 1.0),
    vec4(-0.6, 0.05, -0.1, 1.0),
    vec4(-0.6, 0.05, 0, 1.0),

    vec4(-0.6, 0.05, 0, 1.0),
    vec4(-0.6, 0.05, -0.1, 1.0),
    vec4(-0.7, 0.05, -0.1, 1.0),

    vec4(-0.6, 0.05, 0, 1.0),
    vec4(-0.7, 0.05, -0.1, 1.0),
    vec4(-0.7, 0.05, 0, 1.0),

    vec4(-0.7, -0.25, -0.1, 1.0),
    vec4(-0.8, -0.25, -0.1, 1.0),
    vec4(-0.8, 0.25, -0.1, 1.0),
    
    vec4(-0.7, -0.25, -0.1, 1.0),
    vec4(-0.8, 0.25, -0.1, 1.0),
    vec4(-0.7, 0.25, -0.1, 1.0),

    vec4(-0.8, 0.25, -0.1, 1.0),
    vec4(-0.6, 0.25, -0.1, 1.0),
    vec4(-0.5, 0.15, -0.1, 1.0),

    vec4(-0.8, 0.25, -0.1, 1.0),
    vec4(-0.5, 0.15, -0.1, 1.0),
    vec4(-0.8, 0.15, -0.1, 1.0),

    vec4(-0.6, 0.25, -0.1, 1.0),
    vec4(-0.5, 0.15, -0.1, 1.0),
    vec4(-0.5, 0.05, -0.1, 1.0),

    vec4(-0.6, 0.25, -0.1, 1.0),
    vec4(-0.5, 0.05, -0.1, 1.0),
    vec4(-0.6, -0.05, -0.1, 1.0),

    vec4(-0.5, 0.05, -0.1, 1.0),
    vec4(-0.8, -0.05, -0.1, 1.0),
    vec4(-0.8, 0.05, -0.1, 1.0),

    vec4(-0.5, 0.05, -0.1, 1.0),
    vec4(-0.6, -0.05, -0.1, 1.0),
    vec4(-0.8, -0.05, -0.1, 1.0),
    
    //Y
    vec4(-0.2, 0.25, 0, 1.0),
    vec4(0.0, 0.05, 0, 1.0),
    vec4(-0.1, 0.25, 0, 1.0),

    vec4(-0.2, 0.25, 0, 1.0),
    vec4(-0.05, -0.05, 0, 1.0),
    vec4(0.0, 0.05, 0, 1.0),

    vec4(0.2, 0.25, 0, 1.0),
    vec4(0.1, 0.25, 0, 1.0),
    vec4(0.0, 0.05, 0, 1.0),

    vec4(0.2, 0.25, 0, 1.0),
    vec4(0.0, 0.05, 0, 1.0),
    vec4(0.05, -0.05, 0, 1.0),

    vec4(0.0, 0.05, 0, 1.0),
    vec4(-0.05, -0.05, 0, 1.0),
    vec4(-0.05, -0.25, 0, 1.0),

    vec4(0.0, 0.05, 0, 1.0),
    vec4(0.05, -0.25, 0, 1.0),
    vec4(0.05, -0.05, 0, 1.0),

    vec4(0.0, 0.05, 0, 1.0),
    vec4(-0.05, -0.25, 0, 1.0),
    vec4(0.05, -0.25, 0, 1.0),

    vec4(-0.2, 0.25, -0.1, 1.0),
    vec4(-0.1, 0.25, -0.1, 1.0),
    vec4(0.0, 0.05, -0.1, 1.0),

    vec4(-0.2, 0.25, -0.1, 1.0),
    vec4(0.0, 0.05, -0.1, 1.0),
    vec4(-0.05, -0.05, -0.1, 1.0),

    vec4(0.2, 0.25, -0.1, 1.0),
    vec4(0.0, 0.05, -0.1, 1.0),
    vec4(0.1, 0.25, -0.1, 1.0),

    vec4(0.2, 0.25, -0.1, 1.0),
    vec4(0.05, -0.05, -0.1, 1.0),
    vec4(0.0, 0.05, -0.1, 1.0),

    vec4(0.0, 0.05, -0.1, 1.0),
    vec4(-0.05, -0.25, -0.1, 1.0),
    vec4(-0.05, -0.05, -0.1, 1.0),

    vec4(0.0, 0.05, -0.1, 1.0),
    vec4(0.05, -0.05, -0.1, 1.0),
    vec4(0.05, -0.25, -0.1, 1.0),

    vec4(0.0, 0.05, -0.1, 1.0),
    vec4(0.05, -0.25, -0.1, 1.0),
    vec4(-0.05, -0.25, -0.1, 1.0),

    vec4(-0.2, 0.25, 0, 1.0),
    vec4(-0.1, 0.25, -0.1, 1.0),
    vec4(-0.2, 0.25, -0.1, 1.0),

    vec4(-0.2, 0.25, 0, 1.0),
    vec4(-0.1, 0.25, 0, 1.0),
    vec4(-0.1, 0.25, -0.1, 1.0),

    vec4(-0.1, 0.25, 0, 1.0),
    vec4(0, 0.05, -0.1, 1.0),
    vec4(-0.1, 0.25, -0.1, 1.0),

    vec4(-0.1, 0.25, 0, 1.0),
    vec4(0, 0.05, 0, 1.0),
    vec4(0, 0.05, -0.1, 1.0),

    vec4(0, 0.05, 0, 1.0),
    vec4(0.1, 0.25, -0.1, 1.0),
    vec4(0, 0.05, -0.1, 1.0),

    vec4(0, 0.05, 0, 1.0),
    vec4(0.1, 0.25, 0, 1.0),
    vec4(0.1, 0.25, -0.1, 1.0),

    vec4(0.2, 0.25, 0, 1.0),
    vec4(0.2, 0.25, -0.1, 1.0),
    vec4(0.1, 0.25, -0.1, 1.0),

    vec4(0.2, 0.25, 0, 1.0),
    vec4(0.1, 0.25, -0.1, 1.0),
    vec4(0.1, 0.25, 0, 1.0),

    vec4(0.2, 0.25, 0, 1.0),
    vec4(0.05, -0.05, -0.1, 1.0),
    vec4(0.2, 0.25, -0.1, 1.0),

    vec4(0.2, 0.25, 0, 1.0),
    vec4(0.05, -0.05, 0, 1.0),
    vec4(0.05, -0.05, -0.1, 1.0),

    vec4(-0.2, 0.25, 0, 1.0),
    vec4(-0.2, 0.25, -0.1, 1.0),
    vec4(-0.05, -0.05, -0.1, 1.0),

    vec4(-0.2, 0.25, 0, 1.0),
    vec4(-0.05, -0.05, -0.1, 1.0),
    vec4(-0.05, -0.05, 0, 1.0),

    vec4(0.05, -0.05, 0, 1.0),
    vec4(0.05, -0.25, -0.1, 1.0),
    vec4(0.05, -0.05, -0.1, 1.0),

    vec4(0.05, -0.05, 0, 1.0),
    vec4(0.05, -0.25, 0, 1.0),
    vec4(0.05, -0.25, -0.1, 1.0),

    vec4(-0.05, -0.05, 0, 1.0),
    vec4(-0.05, -0.05, -0.1, 1.0),
    vec4(-0.05, -0.25, -0.1, 1.0),

    vec4(-0.05, -0.05, 0, 1.0),
    vec4(-0.05, -0.25, -0.1, 1.0),
    vec4(-0.05, -0.25, 0, 1.0),

    vec4(0.05, -0.25, 0, 1.0),
    vec4(-0.05, -0.25, -0.1, 1.0),
    vec4(0.05, -0.25, -0.1, 1.0),

    vec4(0.05, -0.25, 0, 1.0),
    vec4(-0.05, -0.25, 0, 1.0),
    vec4(-0.05, -0.25, -0.1, 1.0),

    //J
    vec4(0.5, 0.25, 0, 1.0),
    vec4(0.9, 0.15, 0, 1.0),
    vec4(0.9, 0.25, 0, 1.0),

    vec4(0.5, 0.25, 0, 1.0),
    vec4(0.5, 0.15, 0, 1.0),
    vec4(0.9, 0.15, 0, 1.0),

    vec4(0.775, 0.15, 0, 1.0),
    vec4(0.675, -0.15, 0, 1.0),
    vec4(0.775, -0.15, 0, 1.0),

    vec4(0.775, 0.15, 0, 1.0),
    vec4(0.675, 0.15, 0, 1.0),
    vec4(0.675, -0.15, 0, 1.0),

    vec4(0.775, -0.15, 0, 1.0),
    vec4(0.6, -0.25, 0, 1.0),
    vec4(0.7, -0.25, 0, 1.0),

    vec4(0.775, -0.15, 0, 1.0),
    vec4(0.675, -0.15, 0, 1.0),
    vec4(0.6, -0.25, 0, 1.0),

    vec4(0.6, -0.25, 0, 1.0),
    vec4(0.5, -0.05, 0, 1.0),
    vec4(0.5, -0.15, 0, 1.0),

    vec4(0.6, -0.05, 0, 1.0),
    vec4(0.5, -0.05, 0, 1.0),
    vec4(0.6, -0.25, 0, 1.0),

    vec4(0.6, -0.25, 0, 1.0),
    vec4(0.675, -0.15, 0, 1.0),
    vec4(0.6, -0.15, 0, 1.0),

    vec4(0.5, 0.25, 0, 1.0),
    vec4(0.9, 0.25, 0, 1.0),
    vec4(0.9, 0.25, -0.1, 1.0),

    vec4(0.5, 0.25, 0, 1.0),
    vec4(0.9, 0.25, -0.1, 1.0),
    vec4(0.5, 0.25, -0.1, 1.0),

    vec4(0.9, 0.25, 0, 1.0),
    vec4(0.9, 0.15, -0.1, 1.0),
    vec4(0.9, 0.25, -0.1, 1.0),

    vec4(0.9, 0.25, 0, 1.0),
    vec4(0.9, 0.15, 0, 1.0),
    vec4(0.9, 0.15, -0.1, 1.0),

    vec4(0.9, 0.15, 0, 1.0),
    vec4(0.775, 0.15, -0.1, 1.0),
    vec4(0.9, 0.15, -0.1, 1.0),

    vec4(0.9, 0.15, 0, 1.0),
    vec4(0.775, 0.15, 0, 1.0),
    vec4(0.775, 0.15, -0.1, 1.0),

    vec4(0.775, 0.15, 0, 1.0),
    vec4(0.775, -0.15, -0.1, 1.0),
    vec4(0.775, 0.15, -0.1, 1.0),

    vec4(0.775, 0.15, 0, 1.0),
    vec4(0.775, -0.15, 0, 1.0),
    vec4(0.775, -0.15, -0.1, 1.0),

    vec4(0.775, -0.15, 0, 1.0),
    vec4(0.7, -0.25, 0, 1.0),
    vec4(0.7, -0.25, -0.1, 1.0),

    vec4(0.775, -0.15, 0, 1.0),
    vec4(0.7, -0.25, -0.1, 1.0),
    vec4(0.775, -0.15, -0.1, 1.0),

    vec4(0.7, -0.25, 0, 1.0),
    vec4(0.6, -0.25, 0, 1.0),
    vec4(0.6, -0.25, -0.1, 1.0),

    vec4(0.7, -0.25, 0, 1.0),
    vec4(0.6, -0.25, -0.1, 1.0),
    vec4(0.7, -0.25, -0.1, 1.0),

    vec4(0.6, -0.25, 0, 1.0),
    vec4(0.5, -0.15, -0.1, 1.0),
    vec4(0.6, -0.25, -0.1, 1.0),

    vec4(0.6, -0.25, 0, 1.0),
    vec4(0.5, -0.15, 0, 1.0),
    vec4(0.5, -0.15, -0.1, 1.0),

    vec4(0.5, -0.15, 0, 1.0),
    vec4(0.5, -0.05, -0.1, 1.0),
    vec4(0.5, -0.15, -0.1, 1.0),

    vec4(0.5, -0.15, 0, 1.0),
    vec4(0.5, -0.05, 0, 1.0),
    vec4(0.5, -0.05, -0.1, 1.0),

    vec4(0.5, -0.05, 0, 1.0),
    vec4(0.6, -0.05, -0.1, 1.0),
    vec4(0.5, -0.05, -0.1, 1.0),
    
    vec4(0.5, -0.05, 0, 1.0),
    vec4(0.6, -0.05, 0, 1.0),
    vec4(0.6, -0.05, -0.1, 1.0),
    
    vec4(0.6, -0.05, 0, 1.0),
    vec4(0.6, -0.15, -0.1, 1.0),
    vec4(0.6, -0.05, -0.1, 1.0),
    
    vec4(0.6, -0.05, 0, 1.0),
    vec4(0.6, -0.15, 0, 1.0),
    vec4(0.6, -0.15, -0.1, 1.0),
    
    vec4(0.6, -0.15, 0, 1.0),
    vec4(0.675, -0.15, -0.1, 1.0),
    vec4(0.6, -0.15, -0.1, 1.0),
    
    vec4(0.6, -0.15, 0, 1.0),
    vec4(0.675, -0.15, 0, 1.0),
    vec4(0.675, -0.15, -0.1, 1.0),
    
    vec4(0.675, -0.15, 0, 1.0),
    vec4(0.675, 0.15, -0.1, 1.0),
    vec4(0.675, -0.15, -0.1, 1.0),
    
    vec4(0.675, -0.15, 0, 1.0),
    vec4(0.675, 0.15, 0, 1.0),
    vec4(0.675, 0.15, -0.1, 1.0),
    
    vec4(0.675, 0.15, 0, 1.0),
    vec4(0.5, 0.15, -0.1, 1.0),
    vec4(0.675, 0.15, -0.1, 1.0),
    
    vec4(0.675, 0.15, 0, 1.0),
    vec4(0.5, 0.15, 0, 1.0),
    vec4(0.5, 0.15, -0.1, 1.0),
    
    vec4(0.5, 0.15, 0, 1.0),
    vec4(0.5, 0.25, -0.1, 1.0),
    vec4(0.5, 0.15, -0.1, 1.0),
    
    vec4(0.5, 0.15, 0, 1.0),
    vec4(0.5, 0.25, 0, 1.0),
    vec4(0.5, 0.25, -0.1, 1.0),
    
    vec4(0.5, 0.25, -0.1, 1.0),
    vec4(0.9, 0.25, -0.1, 1.0),
    vec4(0.9, 0.15, -0.1, 1.0),
    
    vec4(0.5, 0.25, -0.1, 1.0),
    vec4(0.9, 0.15, -0.1, 1.0),
    vec4(0.5, 0.15, -0.1, 1.0),
    
    vec4(0.775, 0.15, -0.1, 1.0),
    vec4(0.775, -0.15, -0.1, 1.0),
    vec4(0.675, -0.15, -0.1, 1.0),
    
    vec4(0.775, 0.15, -0.1, 1.0),
    vec4(0.675, -0.15, -0.1, 1.0),
    vec4(0.675, 0.15, -0.1, 1.0),
    
    vec4(0.775, -0.15, -0.1, 1.0),
    vec4(0.7, -0.25, -0.1, 1.0),
    vec4(0.6, -0.25, -0.1, 1.0),
    
    vec4(0.775, -0.15, -0.1, 1.0),
    vec4(0.6, -0.25, -0.1, 1.0),
    vec4(0.675, -0.15, -0.1, 1.0),
    
    vec4(0.6, -0.25, -0.1, 1.0),
    vec4(0.5, -0.15, -0.1, 1.0),
    vec4(0.5, -0.05, -0.1, 1.0),
    
    vec4(0.6, -0.05, -0.1, 1.0),
    vec4(0.6, -0.25, -0.1, 1.0),
    vec4(0.5, -0.05, -0.1, 1.0),
    
    vec4(0.6, -0.25, -0.1, 1.0),
    vec4(0.6, -0.15, -0.1, 1.0),
    vec4(0.675, -0.15, -0.1, 1.0),
]

var pointsArray = []
var normalsArray = []

window.onload = function init()
{

    cal_pointsArray_normalsArray();
    // 캔버스 생성 - 이거 HTML에서 가져오네. <canvas id="gl-canvas" width="512" height="512">
    if(canvas){
        canvas.addEventListener("mousedown", changeeye)
    }
    document.getElementById("DirectionX").onclick = function(){
        if(theta[xAxis] == 0){
            theta[xAxis] += 1;
        }
        else{
            theta[xAxis] = 0;
        }
    }
    document.getElementById("DirectionY").onclick = function(){
        if(theta[yAxis] == 0){
            theta[yAxis] += 1;
        }
        else{
            theta[yAxis] = 0;
        }

    }
    document.getElementById("DirectionZ").onclick = function(){
        if(theta[zAxis] == 0){
            theta[zAxis] += 1;
        }
        else{
            theta[zAxis] = 0;
        }

    }
    var canvas = document.getElementById( "gl-canvas" );
    // 캔버스 붙이기
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    var isMove = 0;

    function mouseDown(evnet){
        if(isMove==0)
            isMove=1;
        else
            isMove=0;
    }

    function mouseMove(event){
        if(isMove){
            const x = event.clientX;
            const y = event.clientY;
            eye = vec3(- (x-canvas.width/2)/canvas.width*10, (y-canvas.height/2)/canvas.height*10, 5)
            console.log(eye);
            modelViewMatrix = loc_scale(eye, at, up);
        }
    }

    if(canvas){
        canvas.addEventListener("mousemove", mouseMove);
        canvas.addEventListener("mousedown", mouseDown);
    }

    
    //  Configure WebGL
    // 캔버스 크기 설정
    gl.viewport( 0, 0, canvas.width, canvas.height );
    // 백그라운드 설정
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );
    // z-buffer
    gl.enable(gl.DEPTH_TEST);

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var u_FragColor = gl.getUniformLocation(program, 'u_FragColor');
    gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0 );

    // ProjectionMatrix
    var fovy = 60.0;
    var aspect = canvas.width / canvas.height;
    var near = 0.1;
    var far = 10.0;
    projectionMatrix = perspective(fovy, aspect, near, far);

    // ModelViewMatrix 1
    var eye = vec3(0, 0, 5);
    var at = vec3(0, 0, 0);
    var up = vec3(0, 1, 0);
    modelViewMatrix = lookAt(eye, at, up);

    // // ModelViewMatrix 2
    // var eye = vec3(0, 2, 0);
    // var at = vec3(0, 0, 0);
    // var up = vec3(-1, 0, 0);
    // modelViewMatrix = lookAt(eye, at, up);

    // // ModelViewMatrix 3
    // var eye = vec3(2, 0, 0);
    // var at = vec3(0, 0, 0);
    // var up = vec3(0, 1, 0);
    // modelViewMatrix = lookAt(eye, at, up);

    // // ModelViewMatrix 4 대각선뷰
    // var eye = vec3(-2, 1, 2);
    // var at = vec3(0, 0, 0);
    // var up = vec3(1, 1, -1);
    // modelViewMatrix = lookAt(eye, at, up);

    // lightSource

    var lightPosition = vec4(lightposVector[xAxis], lightposVector[yAxis], lightposVector[zAxis], 0.0);
    var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0);
    var lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
    var lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);

    var materialAmbient = vec4(1.0, 0.0, 1.0, 1.0);
    var materialDiffuse = vec4(1.0, 0.8, 0.0, 1.0);
    var materialSpecular = vec4(1.0, 0.8, 0.0, 1.0);
    var materialShininess = 100.0;

    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);

    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"), flatten(specularProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition));

    gl.uniform1f(gl.getUniformLocation(program, "shininess"),materialShininess);

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

    // Load the data into the GPU
    // GPU 버퍼에 데이터를 보내야 한다..!
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);

    var vNormal = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);


    const sliderSX = document.getElementById('ScaleX');
    const outputSX = document.getElementById('SX');
    outputSX.innerHTML = sliderSX.value; // 초기 값 설정

    sliderSX.oninput = function() {
        outputSX.innerHTML = this.value;
        scaleVector[xAxis] = this.value;
        modelViewMatrix = loc_scale(eye, at, up);
    }

    const sliderSY = document.getElementById('ScaleY');
    const outputSY = document.getElementById('SY');
    outputSY.innerHTML = sliderSY.value; // 초기 값 설정

    sliderSY.oninput = function() {
        outputSY.innerHTML = this.value;
        scaleVector[yAxis] = this.value;
        modelViewMatrix = loc_scale(eye, at, up);
    }


    const sliderSZ = document.getElementById('ScaleZ');
    const outputSZ = document.getElementById('SZ');
    outputSZ.innerHTML = sliderSZ.value; // 초기 값 설정

    sliderSZ.oninput = function() {
        outputSZ.innerHTML = this.value;
        scaleVector[zAxis] = this.value;
        modelViewMatrix = loc_scale(eye, at, up);
    }

    const sliderLX = document.getElementById('LocationX');
    const outputLX = document.getElementById('LX');
    outputLX.innerHTML = sliderLX.value; // 초기 값 설정

    sliderLX.oninput = function() {
        outputLX.innerHTML = this.value;
        translateVector[xAxis] = this.value;
        modelViewMatrix = loc_scale(eye, at, up);
    }

    const sliderLY = document.getElementById('LocationY');
    const outputLY = document.getElementById('LY');
    outputLY.innerHTML = sliderLY.value; // 초기 값 설정

    sliderLY.oninput = function() {
        outputLY.innerHTML = this.value;
        translateVector[yAxis] = this.value;
        modelViewMatrix = loc_scale(eye, at, up);
    }

    const sliderLZ = document.getElementById('LocationZ');
    const outputLZ = document.getElementById('LZ');
    outputLZ.innerHTML = sliderLZ.value; // 초기 값 설정

    sliderLZ.oninput = function() {
        outputLZ.innerHTML = this.value;
        translateVector[zAxis] = this.value;
        modelViewMatrix = loc_scale(eye, at, up); 
    }

    
    const sliderLiX = document.getElementById('LightX');
    const outputLiX = document.getElementById('LiX');
    outputLiX.innerHTML = sliderLiX.value; // 초기 값 설정

    sliderLiX.oninput = function() {
        outputLiX.innerHTML = this.value;
        lightposVector[xAxis] = this.value;
        lightPosition = vec4(lightposVector[xAxis], lightposVector[yAxis], lightposVector[zAxis], 0.0);
        gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition));

    }

    const sliderLiY = document.getElementById('LightY');
    const outputLiY = document.getElementById('LiY');
    outputLiY.innerHTML = sliderLiY.value; // 초기 값 설정

    sliderLiY.oninput = function() {
        outputLiY.innerHTML = this.value;
        lightposVector[yAxis] = this.value;
        lightPosition = vec4(lightposVector[xAxis], lightposVector[yAxis], lightposVector[zAxis], 0.0);
        gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition));

    }

    const sliderLiZ = document.getElementById('LightZ');
    const outputLiZ = document.getElementById('LiZ');
    outputLiZ.innerHTML = sliderLiZ.value; // 초기 값 설정

    sliderLiZ.oninput = function() {
        outputLiZ.innerHTML = this.value;
        lightposVector[zAxis] = this.value;
        lightPosition = vec4(lightposVector[xAxis], lightposVector[yAxis], lightposVector[zAxis], 0.0);
        gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition));
    }

    document.getElementById("Reset").onclick = function(){
        lightposVector = [0.0, 0.0, 8.0];
        theta = [0, 0, 0];
        translateVector = [0, 0, 0];
        scaleVector = [1, 1, 1];
        sliderLX.value = 0;
        outputLX.innerHTML = 0;
        sliderLY.value = 0;
        outputLY.innerHTML = 0;
        sliderLZ.value = 0;
        outputLZ.innerHTML = 0;
        sliderSX.value = 1;
        outputSX.innerHTML = 1;
        sliderSY.value = 1;
        outputSY.innerHTML = 1;
        sliderSZ.value = 1;
        outputSZ.innerHTML = 1;
        sliderLiX.value = lightposVector[xAxis];
        outputLiX.innerHTML = lightposVector[xAxis];
        sliderLiY.value = lightposVector[yAxis];
        outputLiY.innerHTML = lightposVector[yAxis];
        sliderLiZ.value = lightposVector[zAxis];
        outputLiZ.innerHTML = lightposVector[zAxis];
        eye = vec3(0, 0, 5);
        at = vec3(0, 0, 0);
        up = vec3(0, 1, 0);
        modelViewMatrix = loc_scale(eye, at, up);
        render();
    }

    render();
};

function loc_scale(eye, at, up){
    var modelViewMatrix = mult(lookAt(eye, at, up), scalem(scaleVector[xAxis],
        scaleVector[yAxis],
        scaleVector[zAxis]));
    return mult(modelViewMatrix, translate(translateVector));
}


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // cal_pointsArray_normalsArray();

    //modelViewMatrix = mult(modelViewMatrix, translate(translateVector));
    modelViewMatrix = mult(modelViewMatrix, rotateX(theta[xAxis]));
    modelViewMatrix = mult(modelViewMatrix, rotateY(theta[yAxis]));
    modelViewMatrix = mult(modelViewMatrix, rotateZ(theta[zAxis]));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length);

    requestAnimationFrame(render);
}

function triple(a, b, c){
    
    var t1 = subtract(vertices[b], vertices[a]);
    var t2 = subtract(vertices[c], vertices[b]);
    var normal = cross(t1, t2);

    var normal = vec3(normal);
    if (normal.z > 0){
        normal.z = -normal.z;
    }

    pointsArray.push(vertices[a]);
    normalsArray.push(normal);
    pointsArray.push(vertices[b]);
    normalsArray.push(normal);
    pointsArray.push(vertices[c]);
    normalsArray.push(normal);
}

function cal_pointsArray_normalsArray(){
    for (var i=0; i<vertices.length; i=i+3){
        triple(i,i+1,i+2);
    }
}