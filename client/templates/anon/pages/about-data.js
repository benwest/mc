demoUniverse = function demoUniverse(){
	
	var img1 = LookImages.findOne({url:"/img/looks/2/img0.jpg"});
	var img2 = LookImages.findOne({url:"/img/looks/1/img2.jpg"});
	
	if(!img1 || !img2) return {shapes: []};
	
	return {"shapes":[{"color":"#000000","points":[0.832,0.262,0.83,0.262,0.805,0.262,0.774,0.262,0.757,0.262,0.742,0.262,0.728,0.262,0.716,0.263,0.705,0.268,0.696,0.27,0.688,0.274,0.679,0.276,0.674,0.28,0.671,0.284,0.669,0.29,0.666,0.295,0.664,0.3,0.664,0.301,0.664,0.302,0.664,0.305,0.664,0.31,0.671,0.317,0.681,0.328,0.691,0.334,0.703,0.341,0.711,0.346,0.72,0.348,0.73,0.35,0.738,0.352,0.75,0.352,0.762,0.352,0.772,0.352,0.783,0.352,0.789,0.352,0.794,0.352,0.796,0.352,0.8,0.352,0.803,0.352,0.806,0.352,0.811,0.352,0.815,0.352,0.82,0.353,0.827,0.354,0.832,0.355,0.837,0.356,0.842,0.359,0.845,0.36,0.847,0.361,0.849,0.362,0.849,0.364,0.849,0.365,0.849,0.368,0.849,0.371,0.844,0.376,0.832,0.382,0.813,0.387,0.791,0.391,0.771,0.395,0.749,0.399,0.727,0.399,0.711,0.399,0.694,0.399,0.679,0.399,0.664,0.399,0.65,0.399,0.64,0.399,0.627,0.399,0.615,0.399,0.606,0.4,0.6,0.4,0.593,0.401,0.589,0.401,0.586,0.401,0.583,0.401,0.574,0.401,0.566,0.401,0.554,0.402,0.544,0.403,0.533,0.405,0.527,0.407,0.52,0.409,0.513,0.413,0.51,0.418,0.505,0.42,0.501,0.424,0.5,0.426,0.498,0.429,0.498,0.431,0.498,0.435,0.498,0.442,0.498,0.451,0.508,0.462,0.52,0.472,0.533,0.481,0.55,0.487,0.566,0.49,0.583,0.492,0.593,0.492,0.61,0.493,0.625,0.493,0.635,0.493,0.647,0.493,0.657,0.493,0.669,0.493,0.679,0.495,0.689,0.5,0.698,0.502,0.706,0.506,0.71,0.509,0.713,0.512,0.715,0.513,0.715,0.514,0.715,0.515,0.715,0.52,0.711,0.525,0.703,0.53,0.691,0.536,0.671,0.543,0.649,0.549,0.62,0.554,0.586,0.556,0.554,0.557,0.522,0.557,0.498,0.557,0.476,0.557,0.457,0.557,0.44,0.557,0.428,0.557,0.415,0.557,0.406,0.558,0.398,0.561,0.389,0.564,0.383,0.567,0.377,0.57,0.372,0.574,0.371,0.576,0.369,0.578,0.369,0.58,0.369,0.581,0.369,0.588,0.369,0.596,0.372,0.604,0.381,0.615,0.393,0.626,0.405,0.633,0.422,0.638,0.44,0.64,0.462,0.64,0.479,0.64,0.493,0.64,0.51,0.64,0.518,0.64,0.528,0.64,0.533,0.64,0.537,0.64,0.538,0.641,0.54,0.645,0.54,0.653,0.54,0.662,0.533,0.673,0.516,0.688,0.491,0.701,0.455,0.713,0.415,0.723,0.374,0.731,0.332,0.736,0.296,0.742,0.262,0.75,0.237,0.756,0.223,0.759,0.206,0.766,0.196,0.77,0.188,0.775,0.179,0.778,0.174,0.783,0.172,0.787,0.171,0.79,0.171,0.793,0.171,0.796,0.171,0.796,0.171,0.798,0.172,0.8,0.177,0.802,0.191,0.808,0.206,0.814,0.228,0.819,0.252,0.824,0.281,0.828,0.305,0.829,0.33,0.829,0.35,0.829,0.362,0.829,0.374,0.829,0.379,0.83,0.383,0.831,0.384,0.832,0.386,0.836,0.386,0.842,0.377,0.85,0.364,0.86,0.342,0.87,0.296,0.882,0.262,0.888,0.225,0.893,0.198,0.9,0.172,0.905,0.161,0.907,0.145,0.912,0.137,0.917,0.132,0.919,0.128,0.923,0.125,0.926,0.125,0.929,0.123,0.931,0.123,0.933,0.123,0.935,0.123,0.936,0.123,0.937,0.123,0.938,0.125,0.939,0.128,0.941,0.132,0.943,0.135,0.947,0.14,0.949,0.147,0.951,0.154,0.953,0.162,0.954,0.172,0.954,0.184,0.954,0.2,0.954,0.213,0.951,0.232,0.947,0.242,0.943,0.257,0.938,0.266,0.936,0.277,0.932,0.286,0.929,0.293,0.926,0.3,0.923,0.306,0.919,0.316,0.914,0.323,0.909,0.332,0.905,0.344,0.9,0.35,0.897,0.359,0.894,0.367,0.891,0.374,0.888,0.381,0.887,0.386,0.884,0.391,0.882,0.398,0.879,0.401,0.877,0.405,0.873,0.41,0.871,0.413,0.867,0.418,0.861,0.423,0.856,0.428,0.85,0.43,0.844,0.433,0.837,0.435,0.83,0.437,0.825,0.437,0.819,0.437,0.812,0.43,0.807,0.423,0.804,0.415,0.8,0.405,0.799,0.391,0.798,0.381,0.798,0.361,0.798,0.344,0.798,0.328,0.798,0.313,0.798,0.301,0.798,0.291,0.798,0.284,0.796,0.279,0.796,0.277,0.794,0.277,0.793,0.277,0.793,0.279,0.792,0.288,0.788,0.3,0.782,0.316,0.777,0.33,0.771,0.349,0.766,0.369,0.762,0.396,0.757,0.422,0.753,0.437,0.751,0.455,0.748,0.467,0.747,0.476,0.746,0.483,0.745,0.491,0.741,0.503,0.737,0.518,0.731,0.535,0.724,0.549,0.719,0.566,0.712,0.577,0.707,0.584,0.704,0.589,0.701,0.596,0.698,0.6,0.695,0.601,0.694,0.603,0.692,0.605,0.689,0.606,0.688,0.606,0.686,0.606,0.682,0.606,0.679,0.606,0.675,0.601,0.667,0.596,0.663,0.588,0.658,0.581,0.652,0.574,0.65,0.569,0.647,0.564,0.646,0.559,0.644,0.552,0.641,0.545,0.64,0.538,0.639,0.533,0.638,0.528,0.635,0.52,0.634,0.515,0.633,0.508,0.632,0.503,0.629,0.496,0.628,0.489,0.626,0.483,0.623,0.477,0.621,0.474,0.62,0.471,0.618,0.469,0.617,0.467,0.617,0.467,0.616,0.464,0.615,0.462,0.615,0.462,0.614,0.461,0.612,0.461,0.611,0.461,0.61,0.461,0.61,0.462,0.61,0.467,0.61,0.474,0.609,0.483,0.608,0.491,0.606,0.5,0.605,0.51,0.603,0.522,0.602,0.533,0.599,0.554,0.596,0.571,0.593,0.594,0.59,0.613,0.587,0.627,0.586,0.644,0.582,0.654,0.581,0.666,0.58,0.674,0.58,0.683,0.58,0.688,0.579,0.696,0.578,0.701,0.578,0.706,0.576,0.713,0.574,0.72,0.572,0.725,0.569,0.732,0.566,0.737,0.562,0.742,0.558,0.75,0.551,0.754,0.543,0.762,0.534,0.767,0.524,0.772,0.513,0.776,0.504,0.777,0.495,0.779,0.486,0.781,0.479,0.781,0.475,0.777,0.472,0.771,0.469,0.762,0.467,0.754,0.466,0.745,0.465,0.737,0.463,0.73,0.463,0.723,0.462,0.715,0.462,0.708,0.461,0.701,0.46,0.693,0.459,0.684,0.459,0.676,0.456,0.667,0.456,0.657,0.455,0.65,0.454,0.642,0.451,0.642,0.45,0.642,0.449,0.642,0.448,0.642,0.447,0.642,0.445,0.644,0.443,0.645,0.441,0.647,0.439,0.649,0.437,0.65,0.436,0.652,0.435,0.654,0.432,0.655,0.432,0.657,0.431,0.659,0.43,0.661,0.43,0.664,0.43,0.666,0.429,0.669,0.427,0.672,0.427,0.676,0.426,0.681,0.425,0.686,0.425,0.693,0.423,0.698,0.423,0.701,0.421,0.706,0.421,0.711,0.42,0.716,0.42,0.722,0.419,0.725,0.418,0.728,0.417,0.732,0.415,0.74,0.413,0.747,0.411,0.757,0.408,0.769,0.406,0.776,0.402,0.783,0.4,0.788,0.4,0.793,0.399,0.798,0.396,0.803,0.395,0.81,0.391,0.816,0.389,0.827,0.385,0.835,0.382,0.844,0.378,0.852,0.375,0.859,0.37,0.866,0.367,0.869,0.365,0.874,0.362,0.877,0.36,0.881,0.358,0.884,0.354,0.889,0.35,0.891,0.348,0.893,0.344,0.894,0.34,0.894,0.336,0.894,0.33,0.886,0.324,0.872,0.319,0.864,0.318,0.852,0.316,0.838,0.314,0.83,0.313,0.823,0.313,0.815,0.313,0.806,0.313,0.796,0.313,0.788,0.313,0.779,0.313,0.776,0.313,0.771,0.313,0.769,0.313,0.767,0.313,0.764,0.313,0.764,0.312,0.764,0.308,0.762,0.306,0.762,0.301,0.762,0.299,0.762,0.296,0.762,0.295,0.762,0.294,0.762,0.294,0.762,0.293,0.762,0.292,0.764,0.29,0.766,0.289,0.767,0.289,0.769,0.288,0.771,0.288,0.774,0.287,0.776,0.287,0.779,0.286,0.783,0.284,0.784,0.284,0.788,0.284,0.791,0.282,0.794,0.281,0.798,0.281,0.803,0.281,0.81,0.28,0.816,0.278,0.822,0.278,0.825,0.278,0.827,0.278,0.828,0.278,0.83,0.278,0.832,0.277,0.835,0.277,0.838,0.277,0.842,0.276,0.845,0.275,0.85,0.274,0.852,0.274,0.855,0.272,0.857,0.272,0.859,0.271,0.861,0.271,0.861,0.27,0.861,0.269,0.861,0.268,0.862,0.268],"center":{"x":0.509,"y":0.608},"bounds":{"top":0.262,"left":0.123,"bottom":0.954,"right":0.894,"width":0.771,"height":0.692}},{"points":[0.374,0.542,0.399,0.549,0.418,0.559,0.435,0.574,0.453,0.586,0.455,0.607,0.441,0.623,0.439,0.644,0.449,0.663,0.464,0.681,0.476,0.698,0.488,0.717,0.501,0.733,0.509,0.754,0.526,0.769,0.536,0.789,0.555,0.802,0.569,0.818,0.58,0.837,0.596,0.849,0.615,0.866,0.625,0.889,0.605,0.901,0.584,0.905,0.561,0.907,0.54,0.912,0.52,0.914,0.495,0.905,0.474,0.895,0.453,0.905,0.43,0.92,0.41,0.926,0.389,0.928,0.368,0.932,0.345,0.936,0.325,0.941,0.304,0.945,0.283,0.951,0.262,0.961,0.24,0.966,0.219,0.974,0.198,0.984,0.177,0.986,0.173,0.966,0.177,0.945,0.177,0.924,0.177,0.903,0.167,0.883,0.167,0.862,0.173,0.841,0.173,0.818,0.173,0.798,0.155,0.781,0.144,0.76,0.144,0.739,0.148,0.719,0.153,0.698,0.163,0.679,0.163,0.657,0.163,0.634,0.163,0.607,0.169,0.586,0.194,0.584,0.219,0.584,0.24,0.584,0.262,0.594,0.283,0.598,0.3,0.586],"center":{"x":0.385,"y":0.764},"bounds":{"top":0.542,"left":0.144,"bottom":0.986,"right":0.625,"width":0.481,"height":0.443},"image": img1._id,"scale":2.0736,"offset":{"x":0.941,"y":0.2}},{"color":"#009051","points":[0.189,0.283,0.189,0.282,0.189,0.277,0.186,0.27,0.179,0.258,0.167,0.241,0.15,0.218,0.135,0.198,0.12,0.177,0.113,0.169,0.106,0.164,0.105,0.162,0.101,0.161,0.1,0.159,0.098,0.159,0.094,0.159,0.089,0.159,0.084,0.159,0.077,0.162,0.072,0.164,0.067,0.167,0.064,0.169,0.062,0.171,0.059,0.174,0.057,0.176,0.054,0.18,0.049,0.182,0.045,0.186,0.042,0.189,0.04,0.191,0.04,0.194,0.037,0.198,0.037,0.201,0.037,0.206,0.037,0.211,0.037,0.215,0.037,0.224,0.04,0.231,0.045,0.237,0.049,0.245,0.055,0.252,0.061,0.257,0.066,0.26,0.071,0.264,0.074,0.265,0.077,0.268,0.086,0.269,0.093,0.27,0.103,0.27,0.11,0.27,0.116,0.27,0.125,0.27,0.13,0.27,0.133,0.27,0.14,0.27,0.144,0.271,0.147,0.272,0.154,0.274,0.159,0.274,0.164,0.275,0.167,0.276,0.171,0.276,0.172,0.276,0.172,0.277,0.174,0.277],"center":{"x":0.113,"y":0.221},"bounds":{"top":0.159,"left":0.037,"bottom":0.283,"right":0.189,"width":0.152,"height":0.123}},{"color":"#009051","points":[0.744,0.254,0.744,0.253,0.742,0.248,0.737,0.24,0.732,0.227,0.727,0.211,0.725,0.192,0.723,0.174,0.723,0.156,0.723,0.138,0.723,0.122,0.723,0.112,0.723,0.1,0.73,0.093,0.737,0.081,0.747,0.074,0.755,0.068,0.767,0.063,0.776,0.058,0.793,0.054,0.806,0.05,0.823,0.046,0.833,0.046,0.852,0.045,0.871,0.045,0.886,0.045,0.896,0.045,0.911,0.051,0.925,0.056,0.935,0.062,0.949,0.068,0.957,0.076,0.962,0.084,0.966,0.088,0.967,0.094,0.967,0.104,0.967,0.112,0.967,0.126,0.967,0.137,0.967,0.149,0.966,0.159,0.964,0.165,0.961,0.17,0.955,0.175,0.949,0.179,0.94,0.182,0.927,0.188,0.916,0.191,0.908,0.193,0.896,0.195,0.889,0.199,0.883,0.201,0.874,0.204,0.866,0.206,0.855,0.209,0.847,0.211,0.835,0.212,0.828,0.213,0.822,0.215,0.816,0.216,0.811,0.218,0.806,0.218,0.803,0.219,0.8,0.221,0.796,0.221,0.793,0.222,0.788,0.223,0.786,0.224,0.781,0.227,0.779,0.228,0.777,0.229,0.776,0.23,0.774,0.231,0.771,0.233,0.767,0.235,0.764,0.236,0.761,0.237,0.757,0.24,0.755,0.24,0.754,0.241,0.754,0.242],"center":{"x":0.845,"y":0.15},"bounds":{"top":0.045,"left":0.723,"bottom":0.254,"right":0.967,"width":0.244,"height":0.209}},{"color":"#009051","points":[0.41,0.252,0.408,0.252,0.403,0.248,0.394,0.243,0.386,0.24,0.381,0.235,0.372,0.228,0.364,0.222,0.355,0.213,0.35,0.207,0.345,0.201,0.34,0.195,0.333,0.191,0.33,0.187,0.327,0.182,0.32,0.174,0.315,0.165,0.31,0.159,0.306,0.152,0.301,0.144,0.296,0.137,0.291,0.127,0.286,0.118,0.283,0.11,0.276,0.102,0.274,0.096,0.272,0.088,0.271,0.084,0.271,0.078,0.271,0.074,0.271,0.069,0.271,0.066,0.271,0.064,0.271,0.062,0.271,0.06,0.271,0.058,0.272,0.057,0.274,0.056,0.276,0.055,0.277,0.051,0.281,0.049,0.283,0.048,0.286,0.045,0.289,0.044,0.293,0.043,0.298,0.04,0.303,0.039,0.311,0.038,0.316,0.037,0.322,0.036,0.325,0.034,0.33,0.034,0.337,0.033,0.342,0.032,0.349,0.03,0.355,0.03,0.366,0.028,0.374,0.027,0.384,0.027,0.393,0.027,0.401,0.027,0.408,0.026,0.415,0.026,0.422,0.026,0.428,0.026,0.435,0.026,0.444,0.026,0.454,0.026,0.461,0.026,0.467,0.026,0.474,0.026,0.481,0.026,0.488,0.027,0.494,0.028,0.5,0.03,0.503,0.031,0.506,0.032,0.508,0.033,0.511,0.036,0.513,0.038,0.516,0.04,0.518,0.045,0.523,0.049,0.527,0.054,0.528,0.057,0.53,0.06,0.532,0.063,0.533,0.067,0.535,0.069,0.535,0.074,0.535,0.078,0.535,0.08,0.535,0.082,0.535,0.086,0.535,0.09,0.535,0.094,0.535,0.098,0.533,0.104,0.532,0.108,0.53,0.112,0.527,0.116,0.525,0.12,0.522,0.125,0.518,0.128,0.515,0.133,0.511,0.135,0.508,0.139,0.503,0.143,0.5,0.146,0.494,0.151,0.489,0.157,0.486,0.163,0.481,0.167,0.477,0.17,0.474,0.174,0.471,0.177,0.467,0.18,0.466,0.182,0.462,0.185,0.461,0.187,0.459,0.188,0.457,0.192,0.455,0.194,0.452,0.195,0.45,0.198,0.447,0.2,0.445,0.203,0.442,0.206,0.438,0.209,0.435,0.212,0.432,0.215,0.43,0.216,0.428,0.217,0.427,0.218,0.425,0.219,0.425,0.221,0.423,0.222,0.423,0.223,0.423,0.223,0.423,0.224,0.423,0.225,0.422,0.225,0.422,0.227,0.418,0.227,0.416,0.228,0.416,0.229],"center":{"x":0.403,"y":0.139},"bounds":{"top":0.026,"left":0.271,"bottom":0.252,"right":0.535,"width":0.264,"height":0.225}},{"points":[0.536,0.236,0.524,0.237,0.513,0.237,0.5,0.237,0.485,0.238,0.474,0.238,0.462,0.24,0.45,0.242,0.439,0.242,0.423,0.242,0.411,0.247,0.396,0.249,0.385,0.253,0.373,0.26,0.361,0.264,0.349,0.274,0.346,0.286,0.338,0.295,0.332,0.306,0.325,0.316,0.313,0.325,0.304,0.333,0.296,0.343,0.289,0.353,0.279,0.359,0.274,0.372,0.268,0.382,0.264,0.394,0.257,0.408,0.249,0.417,0.238,0.429,0.228,0.438,0.227,0.449,0.227,0.461,0.225,0.472,0.218,0.483,0.213,0.494,0.21,0.506,0.206,0.517,0.202,0.531,0.2,0.543,0.213,0.546,0.225,0.55,0.236,0.552,0.248,0.555,0.264,0.556,0.278,0.556,0.295,0.558,0.305,0.552,0.305,0.54,0.304,0.528,0.302,0.512,0.304,0.498,0.311,0.488,0.323,0.485,0.335,0.476,0.343,0.467,0.346,0.455,0.349,0.444,0.355,0.433,0.364,0.426,0.376,0.425,0.385,0.432,0.394,0.441,0.406,0.447,0.415,0.454,0.426,0.467,0.433,0.477,0.444,0.483,0.439,0.495,0.441,0.508,0.45,0.517,0.456,0.53,0.462,0.54,0.469,0.55,0.477,0.56,0.483,0.571,0.49,0.582,0.5,0.59,0.506,0.6,0.515,0.607,0.526,0.616,0.548,0.624,0.56,0.627,0.567,0.616,0.578,0.609,0.588,0.6,0.598,0.593,0.607,0.584,0.616,0.577,0.628,0.571,0.637,0.565,0.649,0.556,0.66,0.551,0.67,0.543,0.682,0.538,0.699,0.535,0.714,0.529,0.727,0.524,0.738,0.522,0.752,0.521,0.765,0.516,0.776,0.514,0.791,0.513,0.803,0.508,0.814,0.506,0.827,0.498,0.818,0.491,0.806,0.485,0.804,0.472,0.803,0.459,0.794,0.452,0.78,0.445,0.768,0.438,0.757,0.429,0.75,0.418,0.741,0.408,0.732,0.401,0.718,0.393,0.705,0.386,0.696,0.378,0.684,0.37,0.675,0.363,0.661,0.356,0.65,0.346,0.639,0.338,0.634,0.326,0.628,0.313,0.619,0.301,0.607,0.296,0.598,0.289,0.588,0.278,0.575,0.272,0.563,0.27,0.552,0.263,0.543,0.252,0.539,0.24,0.536,0.228],"center":{"x":0.514,"y":0.427},"bounds":{"top":0.228,"left":0.2,"bottom":0.627,"right":0.827,"width":0.626,"height":0.398},"image":img2._id,"scale":1.152,"offset":{"x":0.072,"y":0.211}},{"color":"#73fcd6","points":[0.057,0.064,0.057,0.067,0.057,0.072,0.057,0.084,0.057,0.098,0.057,0.134,0.057,0.168,0.057,0.209,0.057,0.256,0.057,0.307,0.057,0.364,0.057,0.419,0.057,0.456,0.057,0.492,0.057,0.514,0.057,0.532,0.057,0.544,0.057,0.545,0.057,0.556,0.057,0.579,0.057,0.605,0.062,0.628,0.064,0.667,0.066,0.7,0.071,0.743,0.076,0.781,0.079,0.824,0.084,0.855,0.088,0.871,0.089,0.885,0.091,0.895,0.091,0.901,0.093,0.907,0.093,0.913,0.093,0.918,0.094,0.923,0.096,0.926,0.096,0.93,0.098,0.932,0.1,0.935,0.1,0.937,0.105,0.941,0.106,0.944,0.11,0.947,0.111,0.95,0.115,0.954,0.116,0.956,0.12,0.96,0.123,0.962,0.125,0.966,0.13,0.968,0.132,0.968,0.14,0.968,0.159,0.972,0.171,0.974,0.184,0.978,0.194,0.979,0.203,0.98,0.211,0.983,0.218,0.983,0.225,0.984,0.23,0.985,0.235,0.985,0.24,0.985,0.244,0.985,0.25,0.985,0.259,0.985,0.267,0.985,0.284,0.985,0.298,0.985,0.316,0.985,0.335,0.985,0.35,0.985,0.374,0.985,0.396,0.985,0.42,0.984,0.452,0.984,0.486,0.984,0.518,0.984,0.549,0.984,0.574,0.984,0.601,0.984,0.622,0.984,0.64,0.984,0.657,0.984,0.679,0.984,0.694,0.984,0.705,0.984,0.718,0.983,0.732,0.98,0.744,0.979,0.757,0.977,0.766,0.977,0.781,0.974,0.789,0.973,0.803,0.971,0.81,0.968,0.82,0.965,0.828,0.961,0.844,0.956,0.852,0.954,0.861,0.949,0.871,0.947,0.877,0.945,0.886,0.941,0.894,0.937,0.901,0.932,0.911,0.924,0.92,0.915,0.923,0.907,0.93,0.894,0.937,0.883,0.942,0.871,0.944,0.858,0.947,0.841,0.947,0.826,0.947,0.812,0.947,0.798,0.947,0.788,0.945,0.776,0.944,0.769,0.94,0.76,0.937,0.752,0.932,0.745,0.93,0.736,0.927,0.73,0.923,0.724,0.92,0.717,0.915,0.707,0.913,0.701,0.911,0.694,0.91,0.689,0.91,0.686,0.91,0.681,0.908,0.679,0.908,0.675,0.906,0.671,0.906,0.668,0.905,0.665,0.905,0.661,0.903,0.657,0.903,0.656,0.903,0.652,0.901,0.644,0.9,0.637,0.896,0.631,0.893,0.625,0.889,0.62,0.888,0.615,0.884,0.611,0.883,0.608,0.881,0.605,0.877,0.603,0.877,0.599,0.874,0.597,0.872,0.594,0.867,0.592,0.862,0.59,0.857,0.588,0.852,0.588,0.847,0.588,0.842,0.588,0.837,0.597,0.832,0.618,0.832,0.64,0.83,0.674,0.83,0.7,0.83,0.723,0.83,0.735,0.83,0.747,0.83,0.754,0.827,0.759,0.825,0.765,0.823,0.769,0.822,0.774,0.816,0.78,0.813,0.784,0.808,0.793,0.801,0.799,0.796,0.804,0.791,0.808,0.784,0.813,0.779,0.818,0.772,0.822,0.766,0.825,0.762,0.828,0.759,0.829,0.755,0.83,0.754,0.83,0.752,0.83,0.75,0.826,0.749,0.813,0.749,0.789,0.749,0.76,0.749,0.735,0.749,0.709,0.749,0.686,0.749,0.665,0.749,0.644,0.75,0.622,0.752,0.602,0.752,0.582,0.752,0.561,0.754,0.542,0.755,0.518,0.755,0.495,0.755,0.478,0.755,0.462,0.755,0.449,0.755,0.431,0.755,0.418,0.755,0.407,0.755,0.4,0.755,0.393,0.755,0.391,0.755,0.379,0.755,0.364,0.752,0.348,0.745,0.334,0.738,0.306,0.732,0.286,0.727,0.275,0.722,0.265,0.718,0.259,0.713,0.254,0.71,0.25,0.705,0.246,0.703,0.243,0.7,0.242,0.696,0.241,0.691,0.241,0.688,0.241,0.681,0.241,0.672,0.246,0.664,0.253,0.659,0.266,0.655,0.284,0.655,0.316,0.655,0.368,0.655,0.399,0.659,0.436,0.661,0.465,0.661,0.486,0.661,0.497,0.661,0.506,0.661,0.51,0.657,0.513,0.655,0.515,0.654,0.515,0.649,0.516,0.642,0.516,0.633,0.512,0.616,0.497,0.603,0.478,0.593,0.456,0.588,0.435,0.586,0.412,0.586,0.388,0.586,0.365,0.586,0.344,0.586,0.331,0.586,0.319,0.586,0.304,0.586,0.292,0.586,0.278,0.584,0.264,0.584,0.248,0.581,0.234,0.577,0.222,0.572,0.21,0.569,0.2,0.566,0.195,0.566,0.193,0.566,0.192,0.564,0.192,0.564,0.191,0.562,0.191,0.561,0.191,0.559,0.191,0.555,0.193,0.552,0.195,0.549,0.198,0.542,0.207,0.533,0.219,0.523,0.239,0.515,0.258,0.51,0.284,0.505,0.308,0.501,0.332,0.5,0.358,0.498,0.378,0.498,0.396,0.498,0.413,0.498,0.43,0.498,0.444,0.498,0.463,0.498,0.486,0.498,0.513,0.5,0.539,0.5,0.563,0.501,0.586,0.501,0.605,0.501,0.621,0.501,0.637,0.501,0.649,0.498,0.667,0.494,0.682,0.489,0.695,0.486,0.705,0.481,0.715,0.477,0.725,0.474,0.733,0.471,0.74,0.466,0.748,0.462,0.756,0.459,0.763,0.454,0.768,0.447,0.772,0.438,0.776,0.423,0.776,0.406,0.776,0.386,0.766,0.367,0.752,0.354,0.736,0.34,0.719,0.333,0.701,0.33,0.68,0.33,0.658,0.33,0.647,0.33,0.637,0.33,0.628,0.33,0.625,0.33,0.622,0.33,0.621,0.33,0.62,0.33,0.617,0.33,0.61,0.33,0.602,0.33,0.586,0.33,0.567,0.328,0.551,0.327,0.537,0.325,0.526,0.323,0.514,0.322,0.507,0.32,0.497,0.318,0.491,0.315,0.486,0.311,0.483,0.306,0.479,0.301,0.477,0.298,0.477,0.293,0.477,0.289,0.477,0.284,0.478,0.281,0.485,0.272,0.502,0.266,0.524,0.261,0.546,0.259,0.558,0.254,0.573,0.252,0.582,0.252,0.596,0.25,0.603,0.247,0.615,0.242,0.623,0.238,0.629,0.235,0.633,0.233,0.635,0.233,0.635,0.232,0.635,0.227,0.635,0.22,0.631,0.213,0.62,0.206,0.602,0.2,0.578,0.196,0.549,0.194,0.521,0.193,0.493,0.193,0.465,0.193,0.439,0.193,0.414,0.193,0.395,0.193,0.372,0.193,0.353,0.196,0.335,0.198,0.316,0.201,0.298,0.201,0.28,0.203,0.268,0.203,0.257,0.203,0.251,0.203,0.248,0.205,0.245,0.205,0.241,0.205,0.236,0.205,0.223,0.205,0.21,0.205,0.198,0.205,0.177,0.205,0.163,0.205,0.152,0.201,0.141,0.201,0.132,0.201,0.122,0.201,0.112,0.201,0.106,0.201,0.099,0.2,0.092,0.198,0.087,0.196,0.08,0.194,0.076,0.191,0.073,0.189,0.07,0.188,0.067,0.184,0.062,0.181,0.06,0.177,0.057,0.176,0.055,0.171,0.052,0.167,0.05,0.164,0.049,0.161,0.046,0.157,0.045,0.154,0.044,0.15,0.044,0.147,0.043,0.144,0.042,0.14,0.042,0.137,0.04,0.135,0.04,0.132,0.04,0.127,0.04,0.123,0.04,0.118,0.04,0.115,0.04,0.113,0.04,0.108,0.04,0.105,0.04,0.101,0.043,0.098,0.044,0.094,0.045,0.093,0.046,0.091,0.046,0.091,0.048,0.089,0.049,0.089,0.05,0.086,0.052,0.084,0.054,0.083,0.056,0.081,0.057,0.079,0.06,0.076,0.062,0.074,0.064,0.072,0.067,0.071,0.068,0.069,0.069,0.069,0.069,0.069,0.073],"center":{"x":0.502,"y":0.513},"bounds":{"top":0.04,"left":0.057,"bottom":0.985,"right":0.947,"width":0.889,"height":0.944}}]}
}
