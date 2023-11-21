const wifi = require('node-wifi');
const ipinfo = require('ipinfo');

// Inicializa o módulo wifi
wifi.init({
  iface: null // interface de rede, escolha uma interface wifi aleatória se for nula
});

// Função para obter a geolocalização atual usando ipinfo
function getGeolocation() {
  return new Promise((resolve, reject) => {
    ipinfo((err, cLoc) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          latitude: cLoc.loc.split(',')[0],
          longitude: cLoc.loc.split(',')[1]
        });
      }
    });
  });
}

// Escaneia as redes WiFi
wifi.scan(async function (err, networks) {
  if (err) {
    console.error(err);
  } else {
    try {
      // Obtém a geolocalização atual
      const geolocation = await getGeolocation();
      console.log('Latitude:', geolocation.latitude);
      console.log('Longitude:', geolocation.longitude);

      // Exibe apenas SSID e nível de sinal das redes WiFi
      const simplifiedNetworks = networks.map(network => ({
        ssid: network.ssid,
        signalLevel: network.signal_level
      }));

      console.log('Redes WiFi:', simplifiedNetworks);
    } catch (error) {
      console.error('Erro ao obter geolocalização:', error);
    }
  }
});
