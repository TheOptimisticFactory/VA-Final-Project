var mouseOverFunction = function(d) {
    var circle = d3.select(this);
    var labels = d3.selectAll("text");

    node
        .transition(500)
        .style("opacity", function(o) {
            return isConnected(o, d) ? 1.0 : 0.2;
        })
        .style("fill", function(o) {
            return generateFillColorForNodes(o,d);
        });

    link
        .transition(500)
        .style("stroke-opacity", function(o) {
            return o.source === d || o.target === d ? 1 : 0.2;
        })
        .attr("marker-end", function(o) {
            return o.source === d || o.target === d ? "url(#arrowhead)" : "url()";
        });

    circle
        .transition(500)
        .attr("r", function() {
            return 1.5 * node_radius(d)
        });

    labels
        .transition(500)
        .style("fill", function(o) {
            return generateFillColorForLabels(o,d);
        });
};

var mouseOutFunction = function(d) {
    var circle = d3.select(this);
    var labels = d3.selectAll("text");

    node
        .transition(500)
        .style("opacity", function(o) {
            return 1.0;
        })
        .style("fill", function(o) {
            return '#aaa';
        });

    link
        .transition(500)
        .style("stroke-opacity", function(o) {
            return 1.0;
        })
        .attr("marker-end", function(o) {
            return "url()";
        });

    circle
        .transition(500)
        .attr("r", function() {
            return node_radius(d)
        });

    labels
        .transition(500)
        .style("fill", function(o) {
            return 'black';
        });
};

function isConnected(a, b) {
    return isConnectedAsTarget(a, b) || isConnectedAsSource(a, b) || a.index == b.index;
}

function isConnectedAsSource(a, b) {
    return linkedByIndex[a.index + "," + b.index];
}

function isConnectedAsTarget(a, b) {
    return linkedByIndex[b.index + "," + a.index];
}

function isEqual(a, b) {
    return a.index == b.index;
}

function tick() {
    link
        .attr("x1", function(d) {
            return d.source.x;
        })
        .attr("y1", function(d) {
            return d.source.y;
        })
        .attr("x2", function(d) {
            return d.target.x;
        })
        .attr("y2", function(d) {
            return d.target.y;
        });

    node
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
}

function node_radius(d) {
    return Math.pow(40.0 * d.size, 1 / 3);
}

function generateFillColorForNodes(o, d) {
    if (isConnectedAsTarget(o, d) && isConnectedAsSource(o, d)) {
        fillcolor = 'green';
    } else if (isConnectedAsSource(o, d)) {
        fillcolor = 'red';
    } else if (isConnectedAsTarget(o, d)) {
        fillcolor = 'blue';
    } else if (isEqual(o, d)) {
        fillcolor = "orange";
    } else {
        fillcolor = '#aaa';
    }
    return fillcolor;
}

function generateFillColorForLabels(o, d) {
    if (isConnectedAsTarget(o, d) && isConnectedAsSource(o, d)) {
        fillcolor = 'green';
    } else if (isConnectedAsSource(o, d)) {
        fillcolor = 'red';
    } else if (isConnectedAsTarget(o, d)) {
        fillcolor = 'blue';
    } else if (isEqual(o, d)) {
        fillcolor = "orange";
    } else {
        fillcolor = 'black';
    }
    return fillcolor;
}