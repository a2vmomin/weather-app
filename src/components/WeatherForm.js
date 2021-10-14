import React from 'react';

class WeatherForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.ismounted = true;
  }

  componentWillUnmount() {
    this.ismounted = false;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { weather } = this.props;
    const { city } = this.state;
    if (this.ismounted) weather(city);
  }

  render() {
    const { city } = this.state;
    return (
      <form
        onSubmit={this.handleSubmit}
        className="flex flex-col justify-center px-8 py-8 bg-white shadow-lg sm:flex-row sm:justify-between rounded-2xl"
      >
        <label htmlFor="city" className="flex-1 mb-4 sm:mb-0">
          <input
            className="w-full px-2 py-2 border-2 border-gray-600 rounded-lg"
            id="city"
            name="city"
            placeholder="City"
            // autoComplete="off"
            value={city}
            onChange={(e) => this.setState({ city: e.target.value })}
            onBlur={(e) => this.setState({ city: e.target.value })}
          />
        </label>
        <button type="submit" className="px-2 py-2 font-bold bg-yellow-500 rounded-lg sm:ml-8">
          Get Weather
        </button>
      </form>
    );
  }
}

export default WeatherForm;
