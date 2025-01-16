import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import React from 'react';

const YandexMap = () => {
  const center = [56.557896, 37.52152];
  return (
    <YMaps>
      <div style={{ width: '100%', height: '500px' }}>
        <Map defaultState={{ center, zoom: 15 }} style={{ width: '100%', height: '100%' }}>
          <Placemark geometry={center} />
        </Map>
      </div>
    </YMaps>
  );
};

export default YandexMap;
