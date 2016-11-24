var radialLayout = function () {

    var gmap = d3.map();

    var maxRange = 20;

    //layout algorithm
    var layout = function (data) {
        var range = d3.range(0, maxRange);
        var grouped = [];

        //transform and returns the grouped data

        range.forEach(function (r) {
            gmap.set(r, {startAngle: 0, endAngle: 0, count: data[r]});
        });


        grouped = gmap.values();
        grouped.forEach(function (r, i) {
            var itemAngle = Math.PI * 2 / maxRange;
            r.startAngle = itemAngle * i;
            r.endAngle = itemAngle * (i + 1);
        });
        

        return grouped;
    };

    return layout;

};