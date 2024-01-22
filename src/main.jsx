import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/index.css'
import {meteoDAO,FuelDAO} from './DAO'
import {Metéo,Metéo2} from './meteo'
import {Fuel} from './fuel'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      citypop:[],
      city: null,
      meteodays: null,
      meteohours: null,
      stations: null,
      isSearch: false,
      userLat:null,
      userLgt:null,
      fill:[],
      nightmode:false
    };
    this.handleSelect=this.handleSelect.bind(this)
    this.handleInput = this.handleInput.bind(this);
    this.doUpdate = this.doUpdate.bind(this);
    this.handleLoc = this.handleLoc.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.doUpdate(this.state.query);
  }

  async doUpdateLoc(lat, long) {
    try {
      const data = await meteoDAO.cityfindByCoord(lat, long);
      this.setState({ isSearch: true, userLat: lat, userLgt: long, city: data[0] });
      //await meteoDAO.searched(data[0].name);
      const data2 = await meteoDAO.daysmeteo(data[0].insee);
      this.setState({ meteodays: data2 });
      const data3 = await meteoDAO.hoursmeteo(data[0].insee);
      this.setState({ meteohours: data3 });
      let station=[]
      for(const d of data){
        const data4 = await FuelDAO.stationfind(d.name);
        if (data4.message != "not found") {
          for(const push of data4)station.push(push)
        }
      }
      this.setState({ stations: station });
    } catch (error) {
      console.log(error);
    }
  }
  handleLoc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.doUpdateLoc(position.coords.latitude, position.coords.longitude);
        },
        (error) => console.error(error)
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
  async doUpdate(query) {
    if (query == "" || query == undefined) {
      return;
    } else {
      try {
        this.setState({ isSearch: true, userLat: null, userLgt: null });
        const data = await meteoDAO.cityfind(query);
        if (data.message != "not found") {
          this.setState({ city: data[0] });
          //await meteoDAO.searched(data[0].name);
          const data2 = await meteoDAO.daysmeteo(data[0].insee);
          this.setState({ meteodays: data2 });
          const data3 = await meteoDAO.hoursmeteo(data[0].insee);
          this.setState({ meteohours: data3 });
          let station=[]
          for(const d of data){
            const data4 = await FuelDAO.stationfind(d.name);
            if (data4.message != "not found") {
              for(const push of data4)station.push(push)
            }
          }
          this.setState({ stations: station });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  handleInput(e) {
    if(e._reactName=="onChange"){
      meteoDAO.cityfill(e.target.value).then((data) => {
        if(data.message!="Not Found"){
          this.setState({ fill: data});
        }
      });

    }
    if (e.key === "Enter") {
      this.setState({ query: e.target.value });
      this.doUpdate(e.target.value);
    }
  }
  handleSelect(e){
    if(e.target.value!=null){
      this.setState({fuel_type:e.target.value})
    }
  }
  async componentDidMount(){
    if(this.state.citypop.length<1){
      const data = await meteoDAO.cityfindPop()
      this.setState({citypop:data})
    }
  }

  handleClick(e) {
    this.doUpdate(e.target.value)
  }

  render() {
    let meteotoday;
    let meteotoday2;
    let fuel;
    let pop;
    if (
      this.state.city != null &&
      this.state.meteodays != null &&
      this.state.meteohours != null &&
      this.state.stations != null
    ) {
      // console.log("VILLE : ", this.state.city.name,this.state.city.insee);
      // console.log("meteodays : ", this.state.meteodays);
      // console.log("meteohours : ", this.state.meteohours);
      // console.log("GPS : ", this.state.userLat,this.state.userLgt);
      // console.log("Stations : ", this.state.stations);
      fuel = (
        <Fuel 
          stations={this.state.stations} city = {this.state.city} userLat={this.state.userLat} userLgt={this.state.userLgt}
        />
      );
      meteotoday = (
        <Metéo city={this.state.city} meteohours={this.state.meteohours} />
      );
      meteotoday2 = (
        <Metéo2
          meteohours={this.state.meteohours}
          meteodays={this.state.meteodays}
        />
      );
    }else{
      pop = (
        <div className="popular" style={{color: this.state.nightmode ? "white" : "rgb(200,200,200)"}}>
        <h1>Ville populaire: </h1>
        {this.state.citypop.map(city=>
            <button key={city.name} value={city.name} onClick={this.handleClick} style={{color: this.state.nightmode ? "white" : "rgb(200,200,200)"}}>{city.name}</button>
        )}
        </div>
      )
    }

    return (
      <div className="container">
        <nav style={{height: this.state.isSearch ? "200px" : "500px", position: this.state.isSearch ? "fixed" : ""}}>
          <img
            className="iconMeteoTurbo"
            src="src/assets/images/iconMETEOTURBO.png"
            alt="iconMeteoturbo"
            style={{opacity: this.state.isSearch? "0" : "1"}}
          />
          <h1 className="label" style={{opacity: this.state.isSearch? "0" : "1"}}>Entrer le nom de la ville...</h1>
          <div className="localisation" style={{ position: this.state.isSearch? "fixed" : "", top: this.state.isSearch ? "50px" : "475px"}}>
            <img
            className="smallIconMeteoTurbo"
            src="src/assets/images/iconMETEOTURBO.png"
            alt="iconMeteoturbo"
            style={{opacity: this.state.isSearch? "1" : "0", width: this.state.isSearch? "130px" : "0px", height: this.state.isSearch? "130px" : "0px"}}
            />
            <input
              id="search"
              placeholder="Paris, Rennes, Nice..."
              onKeyUp={this.handleInput}
              onChange={this.handleInput}
              list = "searchList"
            />
            <datalist id="searchList">
              {this.state.fill.map(city=>
                <option key={city.insee} value={city.name}>{city.name}</option>
              )}
            </datalist>
            <div onClick={this.handleLoc}>
              <img src="src/assets/images/pin.png" /> 
            </div>
          </div>
          {this.state.isSearch ? "" : pop}
        </nav>

        
        <section className="content" 
          style={{
            top: this.state.isSearch ? "300px" : "1000px ",
            transform: this.state.isSearch ? "" : "translateX(-50%)",
            left: this.state.isSearch ? "" : "50%",
            position: this.state.isSearch? "relative" : "absolute"
            }}>
          {meteotoday}
          {meteotoday2}
          {fuel}
        </section>
        <div  onClick={() => {
          const body = document.querySelector('body');
          if(!this.state.nightmode){
            body.dataset.theme="dark"
            document.querySelector('.moon').style.opacity=1
            document.querySelector('.sun').style.opacity=0
          }else{
            body.dataset.theme="light"
            document.querySelector('.moon').style.opacity=0
            document.querySelector('.sun').style.opacity=1
          }
          this.setState({ nightmode: !this.state.nightmode });
        }}>
          <img className="nightswitch moon" src="src/assets/images/lune.png" width="50px"/>
          <img className="nightswitch sun" src="src/assets/images/soleil.png" width="50px"/>
        </div>
          
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
