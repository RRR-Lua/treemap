/**
This test check single questions of componente such as objects created.
*/
describe("TreeMap tests", function () {
    //var chart;
    /**
Tengo que revisar
- los textos que están visibles
- que no se le agreguen propiedades al grupo
*/

    var voidSelectorEquality = function (selector, result) {
        return selector.length === result || selector[0].length === result ? true : false;
    };

    //    function getContainer(id) {
    //        var $child = $("<div id=\"" + id + "\"></div>");
    //        $child.css("height", 300);
    //        $child.css("width", 600);
    //        $child.css("border", "1px gray solid");
    //        $child.css("border-radius", "5px");
    //        $("body").append($child);
    //        return $child[0];
    //    }


    beforeEach(function () {
        jasmine.addCustomEqualityTester(voidSelectorEquality);
    });

    afterEach(function () {

    });

    it("flare node test", function () {
        var container = $("body").container("flare");
        var chart = new TreeMap({
            id: "flare",
            container: container,
            sizeById: "size",
            colorById: "perc",
            groupById: "all",
            data: {
                tooltip: {
                    template: "<b>{name}</b><br>Size: {size}<br>{perc}%"
                }
            }
        });
        chart.data([{
                "name": "flare",
                "size": 20020,
                "perc": 60,
                "children": []
		},
            {
                "name": "flare",
                "size": 20200,
                "perc": 30,
                "children": []
		}, {
                "name": "flare2",
                "size": 33200,
                "perc": 10,
                "children": []
		}
		]);
        expect(chart).not.toBe(null);
        expect(chart.data).not.toBeNull();
        expect(chart.container).not.toBeNull();
    });

    it("check builded layers", function () {
        var container = $("body").container("flare1")
        chart = new TreeMap({
            id: "flare1",
            sizeById: "size",
            colorById: "perc",
            groupById: "all",
            width: 300,
            height: 200,
            data: {
                tooltip: {
                    template: "<b>{name}</b><br>Size: {size}<br>{perc}%"
                }
            }
        });
        chart.data([{
                "name": "flare",
                "size": 2020200,
                "perc": 100,
                "children": []
		},
            {
                "name": "flare",
                "size": 20200,
                "perc": 10,
                "children": []
		}
		]);
        expect(chart.container).toBeDefined();

        var svg = chart.container.select("svg");
        expect(svg).toBeDefined();

        var groups_layer = svg.selectAll("#groups_layer");
        expect(groups_layer).toBeDefined();
        expect(groups_layer).toEqual(1);
        //dump(groups_layer);

        //expect(groups_layer.selectAll("rect")).toEqual(1);

        var bubbles_layer = svg.selectAll("#bubbles_layer");
        expect(bubbles_layer).toBeDefined();
        //it doesn't have bubbles
        //expect(bubbles_layer.selectAll(".circles")).toEqual(0);

        var legend_layer = svg.selectAll("#legend_layer");
        expect(legend_layer).toBeDefined();
        //expect(legend_layer.selectAll(".legend-circle")).toEqual(0);

        var groups_title_layer = svg.selectAll("#groups_title_layer");
        expect(groups_title_layer).toBeDefined();
        //expect(groups_title_layer.selectAll(".group_text")).toEqual(0);
    });

    it("check used classes", function () {
        var _cont = $("body").container("check-classes");
        chart = new TreeMap({
            container: _cont,
            sizeById: "size",
            colorById: "perc",
            groupById: "country",
            data: {
                tooltip: {
                    template: "<b>{name}</b><br>Size: {size}<br>{perc}%"
                },
                label: {
                    template: "{name}\nSize: {size}\n{perc}%",
                    autofit: true
                }
            }
        });
        chart.data([{
                "name": "flare1",
                "size": 2020200,
                "perc": 100,
                "category": "small",
                "country": "AR - Argentina",
                "children": []
		},
            {
                "name": "flare2",
                "size": 20200,
                "perc": 10,
                "category": "medium",
                "country": "BR - Brazil",
                "children": []
		},
            {
                "name": "flare3",
                "size": 20020,
                "perc": 10,
                "category": "large",
                "country": "UY - Uruguay",
                "children": []
		}
		]);
        //chart.groupById("category");
        expect(chart.container).toBeDefined();
        var svg = chart.container.select("svg");
        expect(svg).toBeDefined();
        //expect(svg.attr("class")).toBe("gravity-container");
        //Selected groups that ends with layer
        var layers = svg.selectAll("g[id$=layer]");
        //        expect(d3.select(layers[0][0]).attr("id")).toBe("groups_layer");
        //        expect(d3.select(layers[0][1]).attr("id")).toBe("bubbles_layer");
        //        expect(d3.select(layers[0][2]).attr("id")).toBe("legend_layer");
        //        expect(d3.select(layers[0][3]).attr("id")).toBe("groups_title_layer");
        //
        //        //check that rect class of group is group
        //        var _rect = d3.select(layers[0][0]).select("rect");
        //        expect(d3.select(_rect[0][0]).classed("group")).toBe(true);
        //
        //        var circles = d3.select(layers[0][1]).selectAll("circle");
        //        var circles_texts = d3.select(layers[0][1]).selectAll("text");
        //
        //        var circles = d3.select(layers[0][1]).selectAll("circle");
        //        var circles_texts = d3.select(layers[0][1]).selectAll("text");
        //
        //        var legend_circles = d3.select(layers[0][2]).selectAll("circle");
        //        var legend_texts = d3.select(layers[0][2]).selectAll("text");

        //I don't know why jasmine catch an error of d3, when I try to inspect attr class
        //Maybe is that svg nodes has not same attributes that DOM
        //According documentation attr must to return result from first node that matches
        //https://github.com/mbostock/d3/wiki/Selections#attr
        //TODO: Received error is:
        // TypeError: 'null' is not an object (evaluating 'node.classList')
        //at C:/downloads/looking_forward/gravity-bubbles/tests/libs/d3.js:685
        //
        try {
            //            expect(circles.classed("bubble")).toBe(true);
            //            expect(circles_texts.classed("label")).toBe(true);
            //            expect(legend_circles.classed("legend-circle")).toBe(true);
            //            expect(legend_texts.classed("legend-text")).toBe(true);
            //
            //            expect(_rect.classed("group")).toBe(true);
        } catch (e) {

        }

        it("issue#1", function () {
            var _cont = $("body").container("check-classes");
            chart = new TreeMap({
                container: _cont,
                width: 300,
                height: 200,
                sizeById: "size",
                colorById: "perc",
                data: {
                    tooltip: function (d) {
                        return "<b>Name:</b>{name}<br><b>Size:</b> {size}<br><b>Size of Total:</b> {perc}%";
                    },
                    label: {
                        template: "{name}\n{perc}%",
                        autofit: true
                    },
                }
            });
            rollup(flareData);
            totalLines = flareData.size;
            perc(flareData);

            var obj = {};
            removeChildren(obj, flareData);
            chart.data(obj);
            chart.refresh();
            expect(chart).not.toBe(null);
            expect(chart.data).not.toBeNull();
            expect(_cont).not.toBeNull();
            var _rect = $.fn.getRectangle("util");
            //        setTimeout(function (_this) {
            //            //$(_this).css("width");
            //            expect($(_this).css("width")).toBe(184);
            //            expect($(_this).css("height")).toBe(54);
            //            //done(); // call this to finish off the it block
            //        }(_rect), 2000);
        })
    });
});
