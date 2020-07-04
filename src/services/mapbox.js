import geocoding from '@mapbox/mapbox-sdk/services/geocoding';


const geocodingClient = geocoding({ accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN });

export async function autocomplete(search, country) {
  try {
    if (search === '') return [];

    let countryCode;

    switch (country) {
      case 'FRANCE':
        countryCode = 'FR';
        break;
      case 'BENIN':
        countryCode = 'BJ';
        break;
      default:
        break;
    }

    const response = await geocodingClient.forwardGeocode({
      query: search,
      countries: [countryCode],
      types: ['address'],
      limit: 5,
    }).send();

    const locations = response.body.features.map(({ place_name: placeName, geometry }) => {
      if (countryCode === 'FR') {
        const [address, postalCodeAndCity] = placeName.split(',');
        const [postalCode, city] = postalCodeAndCity.trim().split(' ');
        const { coordinates: [longitude, latitude] } = geometry;

        return {
          address: address.trim(),
          postalCode: postalCode.trim(),
          city: city.trim(),
          latitude,
          longitude,
          fullAddress: placeName,
        };
      }

      return null;
    });

    return locations;
  } catch (err) {
    return [];
  }
}

export default null;
