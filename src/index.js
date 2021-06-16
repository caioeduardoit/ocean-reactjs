import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';

function CardItem(props) {
  return (
    <Route render={({ history }) => (
      <div
        className="card_item"
        onClick={() => {
          history.push("/show/" + props.item._id);
        }}
      >
        <h2>{props.item.nome}</h2>
        <img
          src={props.item.imagem}
          alt={props.item.nome}
          width="300"
        />
      </div>
    )}
    />
  );
}

class ListItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }

  async componentDidMount() {
    console.log('Componente ListItems construído');

    const request = await fetch("https://backend-flexivel.herokuapp.com/", {
      headers: new Headers({
        Authorization: "caioeduardoit"
      })
    });
    
    const json = await request.json();

    this.setState({
      items: json
    });
  }

  render() {
    return (
      <div className="lista_itens">
        {this.state.items.map((item, index) => (
          <CardItem item={item} key={index} />
        ))}
      </div>
    );
  }
}

class ShowItem extends React.Component {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.state = {
      item: {}
    }
  }

  async componentDidMount() {
    const request = await fetch("https://backend-flexivel.herokuapp.com/" + this.id, {
      headers: new Headers({
        Authorization: "caioeduardoit"
      })
    });

    const json = await request.json();

    this.setState({
      item: json
    });
  }

  render() {
    return (
      <div className="card_item">
        <h2>{this.state.item.nome}</h2>
        <img
          src={this.state.item.imagem}
          alt={this.state.item.nome}
          width="300"
        />
        <div>{this.state.item.description}</div>
      </div>
    );
  }
}

function App() {
  return (
    <Switch>
      <Route path="/" exact={true} component={ListItems} />

      <Route path="/show/:id" component={ShowItem} />
    </Switch>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);