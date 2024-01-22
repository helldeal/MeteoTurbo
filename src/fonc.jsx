export function iconWeather(data,hourly=false){
    const heure=parseInt(data.datetime.split("T")[1].split("+")[0].split(":").slice(0,1))
    if(data.weather==0){
      if(hourly&&heure<7||heure==23)return "lune.png"
      return "soleil.png"
    }
    else if(data.weather==1){
      if(hourly&&heure<7||heure==23)return "nuagelune.png"
      return "soleilpeunuage.png"
    }
    else if(data.weather==2){
      if(hourly&&heure<7||heure==23)return "nuagelune.png"
      return "nuage.png"
    }
    else if(data.weather>=3&&data.weather<=7){
      return "nuageux.png"
    }
    else if(data.weather>=10&&data.weather<=12||data.weather>=210&&data.weather<=212){
      if(hourly&&heure<7||heure==23)return "pluvieuxnuit.png"
      return "pluvieux.png"
    }
    else if(data.weather>=40&&data.weather<=48){
      return "averses.png"
    }
    else if(data.weather>=60&&data.weather<=68||data.weather>=220&&data.weather<=222||data.weather>=20&&data.weather<=22){
      return "neige.png"
    }
    else if(data.weather>=230&&data.weather<=235||data.weather>=13&&data.weather<=15||data.weather>=30&&data.weather<=32||data.weather>=70&&data.weather<=78){
      return "neige-fondue.png"
    }
    else if(data.weather>=100&&data.weather<=142){
      if(hourly&&heure<7||heure==23)return "tempetelune.png"
      return "tempete.png"
    }
  }
  
  // Permet de calculer la distance entre 2 coordonnées gps
  export function distance(lat1, lon1, lat2, lon2) {
    const r = 6371; // rayon de la Terre en kilomètres
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = r * c;
    return d;
  }
function toRadians(degrees) {
    return degrees * Math.PI / 180;
  }