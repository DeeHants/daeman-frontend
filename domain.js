'use strict';

// Main domain editor form

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Domain = function (_React$Component) {
  _inherits(Domain, _React$Component);

  function Domain(props) {
    _classCallCheck(this, Domain);

    // Take the domain and save it in the state
    var _this = _possibleConstructorReturn(this, (Domain.__proto__ || Object.getPrototypeOf(Domain)).call(this, props));

    _this.state = {
      domain: props.domain,
      modified: false
    };
    return _this;
  }

  // Domain form


  _createClass(Domain, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'h2',
          null,
          'Hosted domain: ',
          this.state.domain.domain_name
        ),
        React.createElement(
          'table',
          null,
          React.createElement(
            'tbody',
            null,
            this.renderRow('Domain name', 'domain_name', 'input'),
            this.renderRow('Enabled', 'domain_enabled', 'checkbox'),
            this.renderRow('Registrar', 'domain_registrar', 'input'),
            this.renderRow('Expiry', 'domain_expiry', 'input')
          )
        ),
        React.createElement(
          'button',
          { onClick: function onClick() {
              return _this2.saveDomain();
            }, disabled: this.state.modified ? '' : 'disabled' },
          'Save'
        )
      );
    }

    // Renders a single field row

  }, {
    key: 'renderRow',
    value: function renderRow(label, field_name, type, args) {
      var _this3 = this;

      var content = '';
      switch (type) {
        case 'static':
          content = this.state.domain[field_name];
          break;
        case 'input':
          content = React.createElement('input', {
            type: 'text',
            name: field_name,
            value: this.state.domain[field_name],
            onChange: function onChange(e) {
              return _this3.updateDomainValue(e);
            }
          });
          break;
        case 'checkbox':
          content = React.createElement('input', {
            type: 'checkbox',
            name: field_name,
            value: '1',
            checked: this.state.domain[field_name] == 1 ? 'checked' : '',
            onChange: function onChange(e) {
              return _this3.updateDomainValue(e);
            }
          });
          break;
        case 'select':
          content = React.createElement(
            'select',
            {
              name: field_name,
              value: this.state.domain[field_name],
              onChange: function onChange(e) {
                return _this3.updateDomainValue(e);
              }
            },
            args.map(function (item, index) {
              return React.createElement(
                'option',
                {
                  key: item.value,
                  value: item.value
                },
                item.label
              );
            })
          );
          break;
      }

      // Return the full row
      return React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          null,
          label
        ),
        React.createElement(
          'td',
          null,
          content
        )
      );
    }

    // Handles a form input, updates the domain state and re-renders the form

  }, {
    key: 'updateDomainValue',
    value: function updateDomainValue(e) {
      var target = e.target;
      var field_name = target.name;
      var value = target.value;
      if (target.type == 'checkbox') {
        value = target.checked ? 1 : 0;
      }

      this.state.domain[field_name] = value;
      this.state.domain.aliases.length--;
      this.state.modified = true;
      this.setState(this.state);
    }

    // Saves the updated domain info back to the server

  }, {
    key: 'saveDomain',
    value: function saveDomain() {
      alert(JSON.stringify(this.state.domain, undefined, 2));
    }
  }]);

  return Domain;
}(React.Component);

var container = document.querySelector('.react-container-domain');
ReactDOM.render(React.createElement(Domain, {
  domain: page_data
}), container);