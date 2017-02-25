# TerraNova

[![codecov](https://codecov.io/gh/zrosenbauer/terranova/branch/master/graph/badge.svg?token=RcFCm9gczi)](https://codecov.io/gh/zrosenbauer/terranova)


## The Data Flow

### Initial
- Data comes in from the API from an areas or communities request
- We transform it in the reducer into the correct format, based on the type of request received
- We connect our Composed Map (e.g AreasMap) to the store
- We add the GoogleMaps Component to our Component
- Pass all data to the GoogleMaps Component
- GoogleMaps Component uses utils to create the map and add all features.
- GoogleMaps publishes events using our namespaced events
- Composed Map listens to events and updates store as need be

Only interaction between store and the GoogleMaps component is recieving new data sets (filtered or new from API) not changes to that set (active to inactive). Any changes should be updated using the google.maps API in our Composed Map. 

---

## Composed Maps
Our Composed Maps are where we include our GoogleMaps component. This is where we also subscribe to events published by our GoogleMaps Component that we can use to interact with our Store and keep it in-sync with our API changes.

## GoogleMaps Component
Our GoogleMaps Component handles:
- Centering
- Height & Width (need to allow resizing w/wrapper component so we can rerender or remove completely)
- Marker additions (no removals ..yet)
- Polygon additions (no removals ..yet)

## Features
Everything on the map is considered a feature. Each feature is assigned to a feature type.

### ~Types~ Categories

#### Marker
Our markers are instances of `google.maps.Data.Point`. They are added to the map via whatever is in the store. We will only update those that need to be added and those that needed to be removed. The markers that are unchanged will be left as is on the map (performance boost).

#### Polygons
Our polygons are instances of `google.maps.Data.Polygon`. They are added to the map via whatever is in the store. We will only update those that need to be added and those that needed to be removed. The polygons that are unchanged will be left as is on the map (performance boost).

#### Richmarker
todo

## Events
Our googlemaps component provides events associated to each feature and the map itself. This allows us to
subscribe to these events in our Composed Map(s) components. These event listeners is where we should update our store based
on changes from the map (user interaction). This is also how/where we should create custom logic for the maps or feature types etc.

---

## Todos
- [ ] Update DataLayer Event handling
- [ ] Filtering Polygons & Markers (_.unionBy(markers, nextMarkers, 'id'))
- [ ] Update/Add Types for Communities & Regions
- [ ] Figure out best way to handle type states (active, idle)
- [ ] Richmarker (in later PR)
  - currently just supporting (active/hover, idle/not-hovered, clicked) anything else will be need to be updated via the Pub/Sub systems
