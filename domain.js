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
        React.createElement(Aliases, { domain: this.state.domain }),
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

var Aliases = function (_React$Component2) {
  _inherits(Aliases, _React$Component2);

  function Aliases(props) {
    _classCallCheck(this, Aliases);

    // Take the domain and save it in the state
    var _this4 = _possibleConstructorReturn(this, (Aliases.__proto__ || Object.getPrototypeOf(Aliases)).call(this, props));

    _this4.state = {
      domain: props.domain,
      aliases: props.domain.aliases
    };
    return _this4;
  }

  _createClass(Aliases, [{
    key: 'render',
    value: function render() {
      var _this5 = this;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'h2',
          null,
          'Email aliases'
        ),
        React.createElement(
          'table',
          null,
          React.createElement(
            'tbody',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement(
                'th',
                null,
                'Actions'
              ),
              React.createElement(
                'th',
                null,
                'Address'
              ),
              React.createElement(
                'th',
                null,
                'Recipients'
              )
            ),
            this.state.aliases.map(function (item, index) {
              return React.createElement(Alias, { key: item.alias_id, domain: _this5.state.domain, alias: item });
            }),
            this.state.aliases.length == 0 && React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                null,
                React.createElement(
                  'div',
                  { className: 'action' },
                  'preconfigured'
                )
              ),
              React.createElement(
                'td',
                null,
                '(Catch all)'
              ),
              React.createElement(
                'td',
                null,
                'Master mailbox'
              )
            )
          )
        )
      );
    }
  }]);

  return Aliases;
}(React.Component);

var Alias = function (_React$Component3) {
  _inherits(Alias, _React$Component3);

  function Alias(props) {
    _classCallCheck(this, Alias);

    // Take the domain, and alias and save it in the state
    var _this6 = _possibleConstructorReturn(this, (Alias.__proto__ || Object.getPrototypeOf(Alias)).call(this, props));

    _this6.state = {
      domain: props.domain,
      aliases: props.domain.aliases,
      alias: props.alias
    };
    return _this6;
  }

  _createClass(Alias, [{
    key: 'render',
    value: function render() {
      var _this7 = this;

      return React.createElement(
        'tr',
        { key: this.state.alias.alias_id },
        React.createElement(
          'td',
          { className: 'action' },
          React.createElement(
            'a',
            { href: '#' },
            'edit'
          ),
          '\xA0',
          React.createElement(
            'a',
            { href: '#' },
            'delete'
          ),
          '\xA0',
          React.createElement(
            'a',
            { href: '#' },
            this.state.alias.alias_enabled ? 'disable' : 'enable'
          )
        ),
        React.createElement(
          'td',
          null,
          this.state.alias.alias_name ? this.state.alias.alias_name : '(Catch all)'
        ),
        React.createElement(
          'td',
          null,
          this.state.alias.recipients.map(function (item, index) {
            return React.createElement(Recipient, { key: item.recipient_id, domain: _this7.state.domain, alias: _this7.state.alias, recipient: item });
          }),
          this.state.alias.recipients.length == 0 ? 'Reject' : ''
        )
      );
    }
  }]);

  return Alias;
}(React.Component);

var Recipient = function (_React$Component4) {
  _inherits(Recipient, _React$Component4);

  function Recipient(props) {
    _classCallCheck(this, Recipient);

    // Take the domain, alias, and recipient and save it in the state
    var _this8 = _possibleConstructorReturn(this, (Recipient.__proto__ || Object.getPrototypeOf(Recipient)).call(this, props));

    _this8.state = {
      domain: props.domain,
      alias: props.domain.alias,
      recipient: props.recipient
    };
    return _this8;
  }

  _createClass(Recipient, [{
    key: 'render',
    value: function render() {
      var type = this.state.recipient.recipient_type;
      var content = this.state.recipient.recipient_content;
      switch (type) {
        case 'mailbox':
          if (content == '') {
            content = 'Master mailbox';
          }
          content = '[' + content + ']';
          break;
        case 'address':
          if (content.indexOf('@') === -1) {
            content += '@' + this.state.domain.domain_name;
          }
          break;
        case 'list':
          content = '{' + content + '}';
          break;
        default:
          content = type + ': ' + content;
      }

      return React.createElement(
        'span',
        { key: this.state.recipient.recipient_id },
        content,
        ',\xA0'
      );
    }
  }]);

  return Recipient;
}(React.Component);

var container = document.querySelector('.react-container-domain');
ReactDOM.render(React.createElement(Domain, {
  domain: page_data
}), container);