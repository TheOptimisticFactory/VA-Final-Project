/*==========================================================================================*/
/*                                          D3 FORCE                                        */
/*==========================================================================================*/

function tick() {
    path
        .attr("d", function (d) {
            var dx = d.target.x - d.source.x, dy = d.target.y - d.source.y, dr = Math.sqrt(dx * dx + dy * dy);
            return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
        });

    node
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
}

/*==========================================================================================*/
/*                                          D3 BRUSH                                        */
/*                                                                                          */
/*                                     MOUSEDOWN & MOUSEUP                                  */
/*==========================================================================================*/

function brushStartFunction() {
    node.each(function (d) {
        d.previouslySelected = shiftKey && d.selected;
    });
}

function brushFunction() {
    var extent = d3.event.target.extent();
    node.classed("selected", function (d) {
        return d.selected = d.previouslySelected ^
            (extent[0][0] <= d.x && d.x < extent[1][0]
            && extent[0][1] <= d.y && d.y < extent[1][1]);
    });
}

function brushEndFunction() {
    d3.event.target.clear();
    d3.select(this).call(d3.event.target);
}

function mouseDownFunction(d) {
    if (!d.selected) { // Don't deselect on shift-drag.
        if (!shiftKey) node.classed("selected", function (p) {
            return p.selected = d === p;
        });
        else d3.select(this).classed("selected", d.selected = true);
    }
}

function mouseUpFunction(d) {
    if (d.selected && shiftKey) d3.select(this).classed("selected", d.selected = false);
}

/*==========================================================================================*/
/*                                         HIGHLIGHTING                                     */
/*                                                                                          */
/*                                     MOUSEOVER & MOUSEOUT                                 */
/*==========================================================================================*/

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

function mouseOverFunction (d) {
    var circle = d3.select(this);
    var labels = d3.selectAll("text");

    node
        .transition(500)
        .style("opacity", function(o) {
            return isConnected(o, d) ? 1.0 : 0.2;
        })
        .style("fill", function(o) {
            return generateFillColorForNodes(o, d);
        });

    path
        .transition(500)
        .style("stroke-opacity", function(o) {
            return o.source === d || o.target === d ? 1 : 0.2;
        })
        .attr("marker-end", function(o) {
            return o.source === d || o.target === d ? "url(#end)" : "url()";
        });

    circle
        .transition(500)
        .attr("r", function() {
            return 1.5 * node_radius(d)
        });

    labels
        .transition(500)
        .style("fill", function(o) {
            return generateFillColorForLabels(o, d);
        });
}

function mouseOutFunction (d) {
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

    path
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
}

/*==========================================================================================*/
/*                                            D3 DRAG                                       */
/*==========================================================================================*/

function dragStartFunction() {
    node.filter(function (d) {
        return d.selected;
    }).each(function (d) {
        d.fixed |= 2;
    })
}

function dragFunction() {
    node.filter(function (d) {
        return d.selected;
    }).each(function (d) {
        d.x += d3.event.dx;
        d.y += d3.event.dy;

        d.px += d3.event.dx;
        d.py += d3.event.dy;
    });

    force.resume();
}

function dragEndFunction() {
    node.filter(function (d) {
        return d.selected;
    }).each(function (d) {
        d.fixed &= ~6;
    })
}

/*==========================================================================================*/
/*                                            UTILITY                                       */
/*==========================================================================================*/

function node_radius(d) {
    if(d.size === undefined) { return 7 * radiusMultiplier; }
    return Math.pow(40.0 * d.size, 1 / 3) * radiusMultiplier;
}

function keydown() {
    shiftKey = d3.event.shiftKey || d3.event.metaKey;
}

function keyup() {
    shiftKey = d3.event.shiftKey || d3.event.metaKey;
}

function findNode(nodeCollection, id) {
    var node = [];

    for (var i in nodeCollection) {
        if(nodeCollection[i]["name"] == id || nodeCollection[i]["id"] == id) {
            node["index"] = i;
            node["object"] = nodeCollection[i];
            return node;
        }
    }
    return null;
}

function inArray(value, array) {
    return array.indexOf(value) > -1;
}