import { Dispatcher } from 'flux'

const flightDispatcher = new Dispatcher()

const ContryStore = {country: null}
const CityStore = {city: null}
const FlightPriceStore = {price: null}

flightDispatcher.dispatch({
  actionType: 'city-update',
  selectedCity: 'Amoy',
})

flightDispatcher.register(function(payload){
  if (payload.actionType === 'city-update') {
    CityStore.city = payload.selectedCity
  }
})

flightDispatcher.dispatch({
  actionType: 'country-update',
  selectedCountry: 'australia',
})

CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
  if (payload.actionType === 'country-update') {
    CountryStore.country = payload.selectedCountry
  }
})

function getDefaultCityForCountry() { return '' }

CityStore.dispatchToken = flightDispatcher.register(function(payload) {
  if (payload.actionType === 'country-update') {
    // `CountryStore.country` may not be updated.
    flightDispatcher.waitFor([CountryStore.dispatchToken])
    // `CountryStore.country` is now guaranteed to be updated.

    // Select the default city for the new country
    CityStore.city = getDefaultCityForCountry(CountryStore.country)
  }
})

function getFlightPriceStore(country, city) { return '' }

FlightPriceStore.dispatchToken =
  flightDispatcher.register(function(payload) {
    switch (payload.actionType) {
      case 'country-update':
      case 'city-update':
        flightDispatcher.waitFor([CityStore.dispatchToken])
        FlightPriceStore.price = getFlightPriceStore(CountryStore.country, CityStore.city)
        break;
    }
})
