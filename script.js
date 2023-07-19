const astroBlock = document.querySelector('#astronauts')
const coordBlock = document.querySelector('#coordinates')
function update() {
    async function coordinates() {
        coordBlock.innerHTML = `
        <div class="astro_loading">
            <img src="loading.gif" alt="Loading...">
        </div>`;
        const server = 'http://api.open-notify.org/iss-now.json'
        const response = await fetch(server, {
            method: 'GET'
        });

        const responseResult = await response.json();

        if (response.ok) {
            getcoordinates(responseResult);
        } else {
            coordBlock.innerHTML = responseResult.message;
        }
    }

    function getcoordinates(coordinates) {
        const latitude = coordinates.iss_position.latitude;
        const longitude = coordinates.iss_position.longitude;
        console.log(coordinates)

        const tamplate_coordinates = `
            <div class="latitude">
                <span>Latitude:</span>
                <span>${latitude}</span>
            </div>
            <div class="longitude">
                <span>Longitude:</span>
                <span>${longitude}</span>
            </div>`;
        coordBlock.innerHTML = tamplate_coordinates
    }

    async function astronauts() {
        astroBlock.innerHTML = `
        <div class="astro_loading">
            <img src="loading.gif" alt="Loading...">
        </div>`;
        const server = 'http://api.open-notify.org/astros.json'
        const response = await fetch(server, {
            method: 'GET'
        });
        const responseResult = await response.json();

        if (response.ok) {
            getastronauts(responseResult);
        } else {
            astroBlock.innerHTML = responseResult.message;
        }
    }

    function getastronauts(astronaut_names) {
        const number = astronaut_names.number;
        console.log(astronauts)
        const tamplate_astronauts = `
 
 <div class="astronaut">
       <span>Number:</span>
        <span>${number}</span>
        </div>
        
`;
        astroBlock.innerHTML = tamplate_astronauts
    }

    if (astroBlock) {
        astronauts();
    }
    if (coordBlock) {
        coordinates();
    }
}
update()
setInterval(update,5000);