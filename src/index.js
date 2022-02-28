import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import './index.css'
import axios from 'axios';


class NavigationLinks extends React.Component{
    render(){
        return(
            <div>
                <h1>Navigation links to other pages</h1>
            </div>
        )
    }
}    

class NavigationBox extends React.Component{
    render(){
        return(
            <div>
                <h1>Box to hold links</h1>
            </div>
        )
    }
}

class FilmList extends React.Component{
    render(){
        const film = this.props.film;
        return(
            <div>{film.title}</div>
        )
    }
}

class FilmTableDropdown extends React.Component{
    render(){
        const list = [];
        const MenuSelect = this.props.MenuSelect;

        this.props.films.forEach((film)=>
        list.push(<FilmList film={film} key={film.film_id}/>))
        
        return(
            <div>
            <DropdownButton id="dropdown-basic-button" title="Select a film">
            {list.map((film)=>(
                <Dropdown.Item>
                {film}
            </Dropdown.Item>))}
            </DropdownButton>
            </div>
            )
    }
}    

class ActorSearchBar extends React.Component{ 
    render(){
        const filterText=this.props.filterText
        return(
            <form>
            <input type="text" placeholder="Search by actor last name....." value={filterText}
            onChange={(e)=>this.props.onFilterTextChange(e.target.value)}/> 
            </form>

        )
    }
}    

class FilmRow extends React.Component{
    render(){
        const film = this.props.film;
        return(
            <div>
            <h2>
                {film.title}
            </h2>
            <h3>Description:</h3>
            <p>{film.description}</p>
            <tr>

                <th>Rating</th>
                <td>{film.rating}</td>
                <th>Length</th>
                <td>{film.length}</td>
                <th>Release Year</th>
                <td>{film.release_year}</td>
                <th>Special Features</th>
                <td>{film.special_features}</td>
            </tr>
            </div>
        );
    }
}

class FilmTable extends React.Component{
    render(){
        const rows = [];

        this.props.films.forEach((film)=>
        rows.push(<FilmRow film={film} key={film.film_id}/>))

        return(
            <table class='center'>
            <tbody>
                {rows}
            </tbody>
        </table>
        )
    }
}    


class ActorRow extends React.Component{
    render(){
        const actorData = this.props.actorInfo;
        return(
            <tr>
            <td>{actorData.first_name}</td>
            <td>{actorData.last_name}</td>
            </tr>
        )
    }
}

class ActorTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {filmPackages: []};
    }  
    
    
    componentDidMount(){
        fetch('http://localhost:8080/homepage/Actors')
        .then(response => response.json())
        .then(data => this.setState({filmPackages: data}))
        }
    
    render(){
        const filterText=this.props.filterText.toLowerCase();

        const rows = [];

        this.state.filmPackages.forEach((actor)=>
        {if (actor.last_name.toLowerCase().indexOf(filterText) === -1){
            return;
        }
        rows.push(<ActorRow actorInfo={actor} key={actor.actor_id}/>)})       

        return(
           <table class='center'>
            <thead>
            <tr>
            <th>First Name</th>
            <th>Last Name</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
        )
    }
}

class UpdateLanguagesButton extends React.Component{
    render(){
        return(
            <div>
                <h1>Button to update languages</h1>
            </div>
        )
    }
}    

class FilterableActorTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            filterText:"",
        };
        this.handleFilterTextChange=this.handleFilterTextChange.bind(this);
    }
    
    
    
    handleFilterTextChange(fText){
        this.setState(
            {filterText:fText}
        )
    }
    render(){
            return(
                <div id='mainBody'>
                    <h1>Where have I seen them?</h1>
                    <ActorSearchBar
                        filterText={this.state.filterText}
                        onFilterTextChange={this.handleFilterTextChange}
                    />
                    <ActorTable actors={this.props.actors}
                        filterText={this.state.filterText}
                    />
                    <FilmTableDropdown films={this.props.films}/>
                    <FilmTable films={this.props.films}/>
                </div>
            )
        }
    }

  const Categories = [
      {category_id: '1', name: 'Action'},
      {category_id: '2', name: 'Comedy'}, 
      {category_id: '3', name: 'Romance'},
      {category_id: '4', name: 'Children'}, 
      {category_id: '5', name: 'Documentary'}, 
      {category_id: '6', name: 'Drama'}   
  ]

  const Languages = [
    {language_id: '1', name: 'English'},
    {language_id: '2', name: 'Italian'}, 
    {language_id: '3', name: 'Spanish'},
    {language_id: '4', name: 'French'}, 
    {language_id: '5', name: 'Arabic'}, 
    {language_id: '6', name: 'Polish'}   
]

const Films = [
    {film_id: '1', title: 'Jurrasic Space', description: 'We thought we were safe in space, but one day the humans see a sight that terrifies them. A t-rex and a velociraptor flying a spaceship TOGETHER, and they look hungry.', release_year:'1992', length:'95',rating:'15',special_features:'Commentary ft. the dinosaurs', category_id:'6'},
    {film_id: '2', title: 'Hole in the wall', description: 'A documentary exploring the glory hole scene', release_year:'2015', length:'78',rating:'18',special_features:'3D scenes, out-takes', category_id:'5'},
    {film_id: '3', title: 'The last dance of the wolves', description: 'A wolf turns into a human boy, and learns how to communicate through the power of dance.', release_year:'2011', length:'102',rating:'U',special_features:'Karaoke with the film songs',category_id:'4'},
    {film_id: '4', title: 'City of the demi-gods', description: 'A bunch of half gods go on spring break together, chaos follows both figuratively and literally', release_year:'1955', length:'98',rating:'12',special_features:'out-takes, directors commentary',category_id:'2'},
    {film_id: '5', title: 'Heros never win', description: 'James Bond is back, and now hes 105 years old and better than ever', release_year:'2016', length:'111',rating:'15',special_features:'History of James Bond, Interview with the actors', category_id:'1'},
    {film_id: '6', title: '100,000,000 B.C', description: 'A re-imagining of the first fish to waddle onto land', release_year:'2008', length:'101',rating:'PG',special_features:'N/A', category_id:'6'},
  ];

  const Actor_Film = [
    {actor_id:'1', film_id:'2'},
    {actor_id:'1', film_id:'6'}, 
    {actor_id:'2', film_id:'1'}, 
    {actor_id:'2', film_id:'3'}, 
    {actor_id:'3', film_id:'3'}, 
    {actor_id:'3', film_id:'4'}, 
    {actor_id:'4', film_id:'5'}, 
    {actor_id:'4', film_id:'6'}, 
    {actor_id:'5', film_id:'1'}, 
    {actor_id:'5', film_id:'2'}, 
    {actor_id:'6', film_id:'4'}, 
    {actor_id:'6', film_id:'5'},   
  ]

  const Actor_Language = [
    {actor_id:'1', language_id:'1'},
    {actor_id:'1', language_id:'6'}, 
    {actor_id:'2', language_id:'1'}, 
    {actor_id:'2', language_id:'3'}, 
    {actor_id:'3', language_id:'1'}, 
    {actor_id:'3', language_id:'4'}, 
    {actor_id:'4', language_id:'1'}, 
    {actor_id:'4', language_id:'6'}, 
    {actor_id:'5', language_id:'1'}, 
    {actor_id:'5', language_id:'2'}, 
    {actor_id:'6', language_id:'1'}, 
    {actor_id:'6', language_id:'5'},   
  ]

  /*const Actors = [
    {actor_id:'1', first_name:'Mary', last_name:'Moes'},
    {actor_id:'2', first_name:'John',last_name:'Wick'}, 
    {actor_id:'3', first_name:'Man',last_name:'Hooper'}, 
    {actor_id:'4', first_name:'Lucy',last_name:'Diamonds'}, 
    {actor_id:'5', first_name:'Harry',last_name:'Boat'}, 
    {actor_id:'6', first_name:'Peter',last_name:'Tall'},
    {
        actor_id: 7,
        first_name: "Kile",
        last_name: "Corsar"
      }, {
        actor_id: 8,
        first_name: "Gwendolin",
        last_name: "Gilson"
      }, {
        actor_id: 9,
        first_name: "Orion",
        last_name: "Inchan"
      }, {
        actor_id: 10,
        first_name: "Carola",
        last_name: "Matokhnin"
      }, {
        actor_id: 11,
        first_name: "Leesa",
        last_name: "Oakton"
      },
  ]*/

ReactDOM.render(<FilterableActorTable films = {Films} />,document.getElementById('root'));