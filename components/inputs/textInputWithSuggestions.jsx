import React, {Component, PropTypes} from 'react';
import Autosuggest from 'react-autosuggest';

import './textInputWithSuggestions.less';

const getSuggestions = (termToMatch, listToSearch) => {
  if (termToMatch.trim() === '') {
    return [];
  }
  return listToSearch.filter(item => item.text.match(new RegExp(termToMatch, 'gi')));
};

class FreeTextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      initialSuggestions: props.options.map(item => ({text: item})),
      suggestions: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
  }

  onSuggestionsUpdateRequested({value}) {
    this.setState({suggestions: getSuggestions(value, this.state.initialSuggestions)});
  }

  getSuggestionValue(suggestion) {
    return suggestion.text;
  }

  handleChange(e, {newValue}) {
    this.props.onChange(newValue);
  }

  renderSuggestion(suggestion) {
    return <span>{suggestion.text}</span>;
  }

  render() {
    const inputProps = {
      id: this.props.id,
      value: this.state.value,
      onChange: this.handleChange,
      type: 'search',
      placeholder: this.props.placeholder,
      onBlur: this.props.onBlur,
      onFocus: this.props.onFocus,
      className: `react-autosuggest__input ${this.props.inputClassNames}`,
    };
    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        shouldRenderSuggestions={value => value.trim().length > 1}
        inputProps={inputProps}
      />
    );
  }
}

FreeTextInput.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.array,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  inputClassNames: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default FreeTextInput;
