import React, { Component } from 'react';
import $ from 'jquery';
import logo from '../logo.svg';
import '../App.css';

class Content extends Component {
  constructor(){
   super();
   this.state = {
     lang: '',
     languages:[],
     content:''
   }
   this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({lang: event.target.value}, this.getLanguageData);
    this.props.history.push('/'+event.target.value,this.state.lang);
  }

  getLanguageData(){
    var lang = this.state.lang ? this.state.lang : 'en';
    $.ajax({
      url:'http://localhost:3000/testFile.json',
      dataType:'json',
      cache: false,
      success: function(data){
       this.setState({languages: data.language});
       this.setState({content: data.data[lang]});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
      }
    });
  }

  componentDidMount() {
    this.setState( {lang: this.props.match.params.locale}, this.getLanguageData );
  }

  render(){

      var lang = this.state.lang;
      var languagesSelect = this.state.languages.map((lng) =>
          <option key={lng.slug} value={lng.slug}>{lng.name}</option>
      );
      if( this.state.content  ) {
        var message =  this.state.content;
      }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {message}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <br />
          <select onChange={this.handleChange} value={lang}>
              {languagesSelect}
          </select>
        </header>
      </div>
    );
  };
}

export default Content;
