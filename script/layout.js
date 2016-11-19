var radialLayout = function () {

    var minRange = 0;
    var maxRange = 24;
    var gmap = d3.map();
    var label ;
    var labelHasSet = false;

    var value = function (d) {
        return d;
    };

    //layout algorithm
    var layout = function (data) {
        var range = d3.range(minRange, maxRange);
        if(!labelHasSet){
            label = range;
        }
        var grouped = [];

        //transform and returns the grouped data

        range.forEach(function (r) {
            gmap.set(r, {range: label[r], startAngle: 0, endAngle: 0, count: data[r]});
        });


        grouped = gmap.values();
        grouped.forEach(function (d, i) {
            var itemAngle = Math.PI * 2 / maxRange;
            d.startAngle = itemAngle * i;
            d.endAngle = itemAngle * (i + 1);
        });
        

        return grouped;
    };

    layout.value = function (accessorfunction) {
        if(!arguments.length) return value;

        value = accessorfunction;
        return layout;
    };

    layout.setLabel = function(l){
        if(!arguments.length) return label;
        label = l;
        return layout;
    };

    return layout;

};