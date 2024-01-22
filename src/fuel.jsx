import React from 'react'
import {distance} from './fonc'
import './assets/css/index.css'


class Modal extends React.Component{
    constructor(props){
      super(props)
    }  
  
    render(){
      return(
        <div  className={this.props.affichage}>
          {this.props.data.map(data=> 
          <div key={data.adresse} className="modalContent" >
            <div className="modalLeftSide">
              <div className="modalTitle">
                <div className="modalCity">{data.ville} - {data.cp}</div>
                <a  className="modalAddress">{data.adresse}</a>
              </div>
              <div className="modalFuelBoard">
                <div className="modalFuelLabel">
                  <a>Type :</a><a> Prix au Litre</a>
                </div>
                {this.props.FuelBoard.sort().map(fuel=>
                  <div key={fuel} className="modalFuelBoardContent">
                    <div className={fuel+" modalFuel"}>{fuel}</div>
                    <div className="modalFuel">{data.prix.find(obj => obj.nom == fuel).valeur}€/Litre</div>
                  </div>
                )}
              </div>
  
            </div>
            <div className="modalRightSide">
              <div className="modalClose">
                <div className="modalClose" onClick={this.props.close}>&times;</div>
              </div>
              <div>
                <div className="modalDistance">{distance(data.latitude, data.longitude, this.props.userLat!=null ? this.props.userLat : this.props.city.latitude,this.props.userLgt!=null ? this.props.userLgt : this.props.city.longitude).toFixed(3)}km</div>
                <div className="modalLocalisation"><a href={`https://www.google.es/maps?q=${data.latitude},${data.longitude}`}target="_blank">Localiser</a> </div>
              </div>
            </div>
          </div>
          )}
        </div>
      )
    }
  
  }
  
  
 export class Fuel extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedOptions: "Gazole",
        index: 0,
        currentClass: "modal displayNone",
        dataStationModal:[],
        FuelBoard:[]
      };
      this.handleSelectChange = this.handleSelectChange.bind(this);
    }
  
    handleSelectChange(event) {
      const options = event.target.value;
      this.setState({ selectedOptions : options})
    }
  
  
    render() {
      return (
        <div className="fuel widget">
          <div className="titleFuel">
            <div className="titleFuelCity">
              <div className="logoFuel">
                <img alt="logo" src="src/assets/images/fuel.png"/>
              </div>
              <a>
                Stations de carburants -{" "}
                {this.props.city.name}
              </a>
            </div>
            <div className="typeFuel">
              <div className="dropDownMenu">
                <select name="type" className="dropDown-content" onChange={this.handleSelectChange}>
                  <option value="Gazole">Gazole</option>
                  <option value="SP98">SP98</option>
                  <option value="SP95">SP95</option>
                  <option value="E85">E85</option>
                  <option value="E10">E10</option>
                  <option value="GPLc">GPLc</option>
                </select>
              </div>
            </div>
          </div>
          <section className="fuelList">
            {this.props.stations
              .filter(data => data.carburants_disponibles != "")
              .filter(data => data.carburants_disponibles.includes(this.state.selectedOptions))
              .sort((a,b)=>a.prix.find(obj => obj.nom == this.state.selectedOptions).valeur-b.prix.find(obj => obj.nom == this.state.selectedOptions).valeur)
              .filter((a)=>distance(a.latitude, a.longitude, this.props.userLat!=null ? this.props.userLat : this.props.city.latitude,this.props.userLgt!=null ? this.props.userLgt : this.props.city.longitude).toFixed(3)<20)
              .map((data, index) => {
                if(data.carburants_disponibles.includes(this.state.selectedOptions)) {
                return (
                  <article key={data.adresse} className="station"  onClick={()=>{this.setState({dataStationModal:[data],currentClass:"modal displayBlock",FuelBoard:data.carburants_disponibles.split(";")}); document.body.classList.add('overflowHidden');}}>
  
                    <div className='typeFuelContener'>
                      <div className={this.state.selectedOptions}>{this.state.selectedOptions}</div>
                    </div>
                    <div className="price">{data.prix.find(obj => obj.nom == this.state.selectedOptions).valeur}€/Litre</div>
                    <a className="type" >{data.ville}</a>
                    <div className="dist">{distance(data.latitude, data.longitude, this.props.userLat!=null ? this.props.userLat : this.props.city.latitude,this.props.userLgt!=null ? this.props.userLgt : this.props.city.longitude).toFixed(3)}km</div>
                  </article>
                );
              }
              this.index = index
              console.log(data)
              console.log("station loc =",data.fields.latitude, data.fields.longitude)
              console.log("loc = ", this.props.userLat!=null ? this.props.userLat : this.props.city.latitude,this.props.userLgt!=null ? this.props.userLgt : this.props.city.longitude)
              console.log(distance(data.fields.latitude, data.fields.longitude, this.props.userLat!=null ? this.props.userLat : this.props.city.latitude,this.props.userLgt!=null ? this.props.userLgt : this.props.city.longitude).toFixed(3),"km")
            })}
          </section>
          
            <Modal 
              close={() => {
                document.body.classList.remove('overflowHidden');
                this.setState({currentClass:"modal displayNone",dataStationModal:[]});
                this.setState({FuelBoard:[]})
              }} 
              city = {this.props.city}
              data={this.state.dataStationModal}
              affichage={this.state.currentClass}
              userLat={this.props.userLat} userLgt={this.props.userLgt}
              FuelBoard={this.state.FuelBoard}
            />
        </div>
    
      );
    }
  }