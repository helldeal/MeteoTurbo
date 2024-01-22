import React from 'react'
import {iconWeather} from './fonc'
import './assets/css/index.css'
export class Metéo extends React.Component {
    render() {
      return (
        <div className="meteo2widget">
          <div className="widget img">
            <img
              src={
                "https://source.unsplash.com/1600x900/?" + this.props.city.name
              }
            />
            <h1>{this.props.city.name}</h1>
          </div>
          <div className="meteo widget">
            <div className="today">
              <div>
                <img src={"src/assets/images/"+iconWeather(this.props.meteohours[0],true)} alt="meteoimg" />
                <p>Météo - {this.props.city.name}</p>
              </div>
              <h1>{this.props.meteohours[0].temp2m}°</h1>
            </div>
            <section className="nowdata">
              <article>
                <img src="src/assets/images/humide.png" alt="meteoimg"/>
                <p>{this.props.meteohours[0].rh2m}%</p>
              </article>
              <article>
                <img src="src/assets/images/pluie.png" alt="meteoimg" />
                <p>{this.props.meteohours[0].probarain}%</p>
              </article>
              <article>
                <img src="src/assets/images/wind.png" alt="meteoimg" />
                <p>{this.props.meteohours[0].wind10m}km/h</p>
              </article>
            </section>
          </div>
        </div>
      );
    }
  }
  
  export class Metéo2 extends React.Component {
    render() {
      return (
        <div className="meteo2widget meteo widget">
            <section className="meteohourslist">
              {this.props.meteohours.map(data =>
                <article key={data.datetime}>
                  <p>{data.datetime.split("T")[1].split("+")[0].split(":").slice(0,1)}:00</p>
                  <img src={"src/assets/images/"+iconWeather(data,true)}  width="70px"/>
                  <p>{data.temp2m}°</p>
                </article>
                )}
            </section>
            <section className="meteodaylist">
              {this.props.meteodays.slice(1,13).map(data =>
                  <article key={data.datetime}>
                  <p>{data.datetime.split("T")[0].split("-")[2]}/{data.datetime.split("T")[0].split("-")[1]}</p>
                  <img src={"src/assets/images/"+iconWeather(data)}  width="70px"/>
                  <p>{data.tmax}° <span>{data.tmin}°</span></p>
                </article>
                )}
            </section>
        </div>
      );
    }
  }