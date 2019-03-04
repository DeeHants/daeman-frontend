'use strict';

// Main domain editor form
class Domain extends React.Component {
  constructor(props) {
    super(props);
    // Take the domain and save it in the state
    this.state = {
      domain: props.domain,
      modified: false,
    };
  }

  // Domain form
  render() {
    return (
      <div>
        <h2>Hosted domain: {this.state.domain.domain_name}</h2>
        <table>
          <tbody>
            {this.renderRow('Domain name', 'domain_name', 'input')}
            {this.renderRow('Enabled', 'domain_enabled', 'checkbox')}
            {this.renderRow('Registrar', 'domain_registrar', 'input')}
            {this.renderRow('Expiry', 'domain_expiry', 'input')}
          </tbody>
        </table>

        <button onClick={() => this.saveDomain()} disabled={this.state.modified ? '' : 'disabled'}>Save</button>
      </div>
    );
  }

  // Renders a single field row
  renderRow(label, field_name, type, args) {
    var content = '';
    switch(type) {
    case 'static':
      content = this.state.domain[field_name];
      break;
    case 'input':
      content = (<input
        type="text"
        name={field_name}
        value={this.state.domain[field_name]}
        onChange={e => this.updateDomainValue(e)}
      />);
      break;
    case 'checkbox':
      content = (<input
        type="checkbox"
        name={field_name}
        value="1"
        checked={this.state.domain[field_name] == 1 ? 'checked' : ''}
        onChange={e => this.updateDomainValue(e)}
      />);
      break;
    case 'select':
      content = (<select
        name={field_name}
        value={this.state.domain[field_name]}
        onChange={e => this.updateDomainValue(e)}
      >
        {args.map((item, index) => (
          <option
            key={item.value}
            value={item.value}
          >{item.label}</option>
        ))}
      </select>);
      break;
    }

    // Return the full row
    return (
      <tr>
        <td>{label}</td>
        <td>{content}</td>
      </tr>
    );
  }

  // Handles a form input, updates the domain state and re-renders the form
  updateDomainValue(e) {
    var target = e.target;
    var field_name = target.name;
    var value = target.value;
    if (target.type == 'checkbox') { value = target.checked ? 1 : 0; }

    this.state.domain[field_name] = value;
    this.state.domain.aliases.length--;
    this.state.modified = true;
    this.setState(this.state);
  }

  // Saves the updated domain info back to the server
  saveDomain() {
    alert(JSON.stringify(this.state.domain, undefined, 2));
  }
}

const container = document.querySelector('.react-container-domain');
ReactDOM.render(
  React.createElement(Domain, {
    domain: page_data,
  }),
  container
);
