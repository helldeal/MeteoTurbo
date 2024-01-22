const ServerAPIURL="http://localhost:3000/";

export const meteoDAO = {
  cityfindPop: async () => {
    const suffix = `city`;
    const res = await fetch(ServerAPIURL + suffix,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    });
    const data = await res.json();
    return data;
  },
  searched: async (name) => {
    const suffix = `city`;
    const res = await fetch(ServerAPIURL + suffix,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(name)
    });
  },
  cityfind: async (term) => {
    const suffix = `city/${term}`;
    const res = await fetch(ServerAPIURL + suffix);
    const data = await res.json();
    return data;
  },
  cityfindByCoord: async (lat, lng) => {
    const suffix = `city/gps/${lat}/${lng}`;
    const res = await fetch(ServerAPIURL + suffix);
    const data = await res.json();
    return data;
  },
  cityfill: async (query) => {
    const suffix = `fill/${query}`;
    const res = await fetch(ServerAPIURL + suffix);
    const data = await res.json();
    return data;
  },
  daysmeteo: async (term) => {
    const suffix = `meteodays/${term}`;
    const res = await fetch(ServerAPIURL + suffix);
    const data = await res.json();
    return data;
  },
  hoursmeteo: async (term) => {
    const suffix = `meteohours/${term}`;
    const res = await fetch(ServerAPIURL + suffix);
    const data = await res.json();
    return data;
  },
};
export const FuelDAO = {
  stationfind: async (term) => {
    const suffix = `stations/${term}`;
    const res = await fetch(ServerAPIURL + suffix);
    const data = await res.json();
    return data;
  },
};