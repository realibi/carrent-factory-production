let carsPositions = [];

ymaps.ready(async function(){
    await $.ajax({
        url: "https://carrent-backend.herokuapp.com/cars",
        type: "get",
        success: function(result){
            
            for(let i = 0; i < result.length; i++){
                console.log(result[i].latitude + " " + result[i].longitude);
                carsPositions.push(
                    new ymaps.GeoObject({
                        geometry: {
                            type: "Point",
                            coordinates: [result[i].latitude, result[i].longitude]
                        },
                        properties: {
                            iconContent: result[i].model,
                            hintContent: result[i].status ? 'Free' : 'Not free'
                        }
                    }, {
                        preset: 'islands#blackStretchyIcon',
                        draggable: true
                    })
                );
            }
            console.log(carsPositions);
        },
        error: function(){
          console.log("error while fetching cars");
        }
    });

    init();
});

function init() {
    var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        });

    for(let i = 0; i < carsPositions.length; i++){
        myMap.geoObjects.add(carsPositions[i]);
    }
}
