/* eslint-disable no-lone-blocks */
import React, { Component } from 'react';
import './App.css';
import moment from 'moment-js';
var listOfImages = [];

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: {},
      isLoaded: false
    }
  }

  importAll(r) {
    return r.keys().map(r);
  }


  componentDidMount() {
    try {
      fetch('https://api.npoint.io/d6bd0efc05639084eb17/')
        .then(res => res.json())
        .then(json => {
          this.setState({
            isLoaded: true,
            players: json.playerList || {},
            search: '',
          })
          console.log('players', json.playerList[0].UpComingMatchesList);
        });
      listOfImages = this.importAll(require.context('./asset/', false, /\.(jpg)$/));
      console.log('img', listOfImages[0].default);
    } catch (error) {
      console.log(error.message);
    }
  }

  // searchSpace = (event) => {
  //   let keyword = event.target.value;
  //   this.setState({ search: keyword })
  // }

  render() {
    const { isLoaded, players } = this.state;

    return (
      (!isLoaded) ?
        <h1>Loading....</h1>
        : <div>
          <h2>Player's Name:</h2>
          {/* <input type="text" placeholder="Enter item to be searched" onChange={(e) => this.searchSpace(e)} /> */}
          <ul className="galleryContainer">
            {players.map(player => (
              <li key={player.Id} className="galleryItem">
                {
                  listOfImages.map(
                    (image, index) =>
                      <div>
                        {image.default.includes(player.Id) &&
                          <img key={index} src={image.default} alt="info" />
                        }
                      </div>
                  )
                }
                <p>{player.PFName}</p>
                <p>{player.SkillDesc}</p>
                <p>{player.Value}</p>
                <p>{player.UpComingMatchesList[0].CCode} vs {player.UpComingMatchesList[0].VsCCode} </p>
                <p>{moment(player.UpComingMatchesList[0].MDate).format('DD-MM-YYYY h:mm:ss a')}</p>
              </li>
            ))}
          </ul>
        </div>
    );

  }
}

export default App
