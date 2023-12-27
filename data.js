// https://array-ipsum.com/

const colors = ['red', 'green', 'blue'];
const titles =  [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
    'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];
const content = [
    'Hydrogen', 'Helium', 'Lithium', 'Beryllium', 'Boron', 'Carbon', 'Nitrogen',
    'Oxygen', 'Fluorine', 'Neon', 'Sodium', 'Magnesium', 'Aluminum', 'Silicon',
    'Phosphorus', 'Sulfur', 'Chlorine', 'Argon', 'Potassium', 'Calcium',
    'Scandium', 'Titanium', 'Vanadium', 'Chromium', 'Manganese', 'Iron',
    'Cobalt', 'Nickel', 'Copper', 'Zinc', 'Gallium', 'Germanium', 'Arsenic',
    'Selenium', 'Bromine', 'Krypton', 'Rubidium', 'Strontium', 'Yttrium',
    'Zirconium', 'Niobium', 'Molybdenum', 'Technetium', 'Ruthenium', 'Rhodium',
    'Palladium', 'Silver', 'Cadmium', 'Indium', 'Tin', 'Antimony', 'Tellurium',
    'Iodine', 'Xenon', 'Cesium', 'Barium', 'Lanthanum', 'Cerium',
    'Praseodymium', 'Neodymium', 'Promethium', 'Samarium', 'Europium',
    'Gadolinium', 'Terbium', 'Dysprosium', 'Holmium', 'Erbium', 'Thulium',
    'Ytterbium','Lutetium', 'Hafnium', 'Tantalum', 'Tungsten', 'Rhenium',
    'Osmium', 'Iridium', 'Platinum', 'Gold','Mercury','Thallium', 'Lead',
    'Bismuth', 'Polonium', 'Astatine', 'Radon', 'Francium', 'Radium',
    'Actinium', 'Thorium', 'Protactinium', 'Uranium', 'Neptunium', 'Plutonium',
    'Americium', 'Curium', 'Berkelium', 'Californium', 'Einsteinium', 'Fermium',
    'Mendelevium', 'Nobelium', 'Lawrencium', 'Rutherfordium', 'Dubnium',
    'Seaborgium', 'Bohrium', 'Hassium', 'Meitnerium', 'Darmstadtium',
    'Roentgenium', 'Ununbium', 'Ununtrium', 'Ununquadium', 'Ununpentium',
    'Ununhexium', 'Ununseptium', 'Ununoctium'
];
const footer = [
    'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus',
    'Neptune', 'Pluto'
];
const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];
const days =  [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];
const planets = [
    'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus',
    'Neptune', 'Pluto'
];
const continents = [
    'Asia', 'Africa', 'North America', 'South America', 'Antarctica',
    'Europe', 'Australia'
];

const len_colors = colors.length;
const len_titles = titles.length;
const len_content = content.length;
const len_footer = footer.length;
const len_months = months.length;
const len_days = days.length;
const len_planets = planets.length;
const len_continents = continents.length;

export function generate(count){

    const data = [];

    for(let i = 0; i < count; i++){

        data[i] = {

            "id": (random_string(4) + "-" + random_string(8) + "-" + random_string(4)).toUpperCase(),
            "date": new Date(Math.random() * 999999999999).toISOString(),
            "index": i,
            "classname": colors[random(len_colors)],
            "title": titles[random(len_titles)],
            "content": content[random(len_content)],
            "footer": footer[random(len_footer)],
            // unused fields:
            "months": months[random(len_months)],
            "days": days[random(len_days)],
            "planets": planets[random(len_planets)],
            "continents": continents[random(len_continents)],
            "flag": Math.random() > 0.5
        };
    }

    return data;
}


function random_string(length, charset) {

    charset || (charset = "0123456789abcdef");
    let s = "";

    for(let i = 0; i < length; i++){

        s += charset[random(length)];
    }

    return s;
}

function random(max){

    return (Math.random() * max) | 0;
}