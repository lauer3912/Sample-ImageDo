// "use strict";
/**
 * Created by jackytse on 2016/12/02.
 */

(function () {
  JXG.Options.grid.gridOpacity = '70';
  JXG.Options.grid.gridDash = false;
  JXG.Options.precision.hasPoint = 1;

  var global = this;
  var board = JXG.JSXGraph.initBoard('jxgbox', {
    boundingbox: [- 10.9, 8.55, 10.9, -8.55],
    showCopyright: false,
    grid: true,
    snapToGrid: true,
    keepaspectratio: false
  });
  var grnaxisO = board.create('point', [0, 0], {
    fixed: true,
    visible: false
  });
  var grnXaxis = board.create('line', [grnaxisO, [5, 0]], {
    strokeWidth: 1,
    strokeColor: '#5b8a9b',
    strokeOpacity: 0.8,
    lastArrow: true
  });
  var grnYaxis = board.create('line', [grnaxisO, [0, 5]], {
    strokeWidth: 1,
    strokeColor: '#5b8a9b',
    strokeOpacity: 0.8,
    lastArrow: true
  });
  var pX0 = board.create('point', [0,
    function () {
      var bb = board.getBoundingBox();
      return bb[3] + (bb[1] - bb[3]) * 0.07;
    }], {
      visible: false,
      withLabel: false
    });
  var pX1 = board.create('point', [1,
    function () {
      var bb = board.getBoundingBox();
      return bb[3] + (bb[1] - bb[3]) * 0.07;
    }], {
      visible: false,
      withLabel: false
    });
  var xaxis = board.create('axis', [pX0, pX1], {
    strokeWidth: 1,
    strokeColor: '#bfbfbf',
    lastArrow: false
  });
  pX0.type = JXG.OBJECT_TYPE_CAS;
  pX1.type = JXG.OBJECT_TYPE_CAS;
  var pX2 = board.create('point', [function () {
    var bb = board.getBoundingBox();
    return bb[0];
  },
    0], {
      visible: false,
      withLabel: false
    });
  var pX3 = board.create('point', [function () {
    var bb = board.getBoundingBox();
    return bb[0];
  },
    1], {
      visible: false,
      withLabel: false
    });
  var yaxis = board.create('axis', [pX2, pX3], {
    lastArrow: false
  });
  pX2.type = JXG.OBJECT_TYPE_CAS;
  pX3.type = JXG.OBJECT_TYPE_CAS;
  var xaxisLabel = board.create('glider', [function () {
    var bb = board.getBoundingBox();
    return bb[2] - (bb[2] - bb[0]) * 0.04;
  },
    0, grnXaxis], {
      strokeOpacity: 0,
      fillOpacity: 0,
      name: '<i>x</i>'
    });
  xaxisLabel.type = JXG.OBJECT_TYPE_CAS;
  var yaxisLabel = board.create('glider', [0,
    function () {
      var bb = board.getBoundingBox();
      return bb[1] - (bb[1] - bb[3]) * 0.05;
    },
    grnYaxis], {
      strokeOpacity: 0,
      fillOpacity: 0,
      name: '<i>y</i>'
    });
  yaxisLabel.type = JXG.OBJECT_TYPE_CAS;
  var qr = [];
  var Dline = board.create('line', [[- 8, -5], [- 8, 5]], {
    visible: false
  });
  var dirPt = board.create('glider', [- 8, -3, Dline], {
    style: 3,
    strokeColor: '#ff00ff',
    fillColor: '#ff00ff',
    name: 'D'
  });
  qr[0] = board.create('point', [function () {
    var bb = board.getBoundingBox();
    return bb[0] + 0.3;
  },
  function () {
    return dirPt.Y();
  }], {
      size: 0.01,
      strokeOpacity: 0,
      name: '<p>Directrix</p>'
    });
  qr[1] = board.create('point', [2, -3], {
    visible: false
  });
  qr[2] = board.create('glider', [0, 3, grnYaxis], {
    fixed: false,
    style: 3,
    strokeColor: '#ff00ff',
    fillColor: '#ff00ff',
    name: 'F'
  });
  var dir = board.create('line', [qr[0], dirPt], {
    strokeColor: '#ff00ff',
    dash: 2
  });
  var parab = board.create('parabola', [qr[2], dir]);
  glid = board.create('glider', [- 4, 1, parab], {
    fixed: false,
    style: 3,
    strokeColor: '#ff00ff',
    fillColor: '#ff00ff',
    name: 'P'
  });
  qr[3] = board.create('point', [function () {
    return glid.X();
  },
  function () {
    return qr[0].Y();
  }], {
      size: 0.01,
      strokeOpacity: 0,
      name: 'Q'
    });
  var seg1 = board.create('segment', [qr[2], glid], {
    strokeWidth: 2,
    strokeColor: '#2222ff',
    dash: 2
  });
  var seg2 = board.create('segment', [glid, qr[3]], {
    strokeWidth: 2,
    strokeColor: '#2222ff',
    dash: 2
  });
  midP1 = board.create('midpoint', [qr[2], glid], {
    visible: false
  });
  dtxt1 = board.create('text', [function (x) {
    return midP1.X();
  },
  function (x) {
    return midP1.Y();
  },
  function (x) {
    dist1 = qr[2].Dist(glid);
    return "<p><i>d</i> =  " + dist1.toFixed(2) + "</p>";
  }], {
      fontSize: 10 + 'px'
    });
  midP2 = board.create('midpoint', [qr[3], glid], {
    visible: false
  });
  dtxt2 = board.create('text', [function (x) {
    return midP2.X() + 0.1;
  },
  function (x) {
    return midP2.Y();
  },
  function (x) {
    dist2 = qr[2].Dist(glid);
    return "<p><i>d</i> =  " + dist2.toFixed(2) + "</p>";
  }], {
      fontSize: 10 + 'px'
    });

  window.onresize = function () {
    board.resizeContainer(board.containerObj.clientWidth, board.containerObj.clientHeight, true);
    board.fullUpdate();
  };
})();
