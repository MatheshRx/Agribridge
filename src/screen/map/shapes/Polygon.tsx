import {useEffect, useMemo} from 'react';
import {FeatureCollection, Point} from 'geojson';
import {Position} from '@rnmapbox/maps/lib/typescript/src/types/Position';
import {LineLayer, ShapeSource} from '@rnmapbox/maps';

const lineLayerStyle = {
  lineColor: '#ff0000',
};

const Polygon = ({
  coordinates,
  saveCoords,
}: {
  coordinates: Position[];
  saveCoords: (c: FeatureCollection) => void;
}) => {
  const featureCollection: GeoJSON.FeatureCollection = useMemo(() => {
    const geoJson: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          id: 'a-feature',
          geometry: {
            type: 'LineString',
            coordinates,
          },
          properties: {},
        } as const,
      ],
    };

    return geoJson;
  }, [coordinates]);

  useEffect(() => {
    const geoPointJson = {
      ...featureCollection,
      features: [
        {
          ...featureCollection.features[0],
          geometry: {
            coordinates: (featureCollection.features[0].geometry as Point)
              .coordinates[0],
            type: 'Point',
          },
        },
      ],
    };
    console.log('USE EFFECT debug', JSON.stringify(geoPointJson));
    saveCoords(geoPointJson as any);
  }, []);

  //   console.log(JSON.stringify(featureCollection));

  return (
    <ShapeSource id={'shape-source-id-0'} shape={featureCollection}>
      <LineLayer id={'line-layer'} style={lineLayerStyle} />
    </ShapeSource>
  );
};

export default Polygon;
