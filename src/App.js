import React from 'react';
import logo from './logo.svg';
import './App.css';
import dataSource from './data/dataStore.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      district:"",
      pci:"",
      places:[],
      };
  }
  myChangeHandler = () => {
    let filteredArr = [];
    filteredArr = dataSource.filter(a => a.District.toUpperCase() == this.state.district.toUpperCase() && a.physicalCellID == this.state.pci);
    console.log(filteredArr);
    this.setState({places:filteredArr});
  }

  handleDistrict = (e) => {
    this.setState({district:e.target.value});
  }

  handlePCI = (e) => {
    this.setState({pci:e.target.value});
  }

  renderTableData() {
    return this.state.places.map((place, index) => {
       const { localCellIdentity, downlinkEARFCN, cellName, downlinkBandwidth } = place //destructuring
       return (
          <tr key={localCellIdentity}>
             <td><strong>local Cell Identity</strong> : {localCellIdentity}</td>
             <td><strong>Downlink EARFCN</strong> : {downlinkEARFCN}</td>
             <td><strong>Cell Name</strong> : {cellName}</td>
             <td><strong>Downlink bandwidth</strong> : {downlinkBandwidth}</td>
          </tr>
       )
    })
 }

  render() {
    return (
      <div style={{margin:20}}>
      <h1>Search Data</h1>
      <p>Enter District:</p>
      <input
        type='text' value={this.state.district} onChange={this.handleDistrict}
      />
       <p>Enter PCI:</p>
      <input
        type='text' value={this.state.pci} onChange={this.handlePCI}
      />
      <button
      type="button"
      onClick={this.myChangeHandler}>Search</button>
      
      <table id='places'>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>

      </div>
     
    
    );
  }
}

export default App;
