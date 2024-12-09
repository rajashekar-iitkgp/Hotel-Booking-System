/**
 * @param {Array} properties 
 * @return {Map<number, boolean>} 
 */
function computeSuperHostMap(properties) {
  const hostRatings = new Map();
 
  for (const property of properties) {
    const { hostId, stars } = property;
    if (!hostRatings.has(hostId)) {
      hostRatings.set(hostId, { totalStars: 0, propertyCount: 0 });
    }
    const stats = hostRatings.get(hostId);
    stats.totalStars += stars;
    stats.propertyCount += 1;
  }

  const superHostMap = new Map();
  for (const [hostId, { totalStars, propertyCount }] of hostRatings.entries()) {
    const averageRating = totalStars / propertyCount;
    superHostMap.set(hostId, averageRating >= 4);
  }

  return superHostMap;
}

/**
 * Determine if the host of the specified property is a "Super Host".
 * @param {Object} property - The property currently being checked for "Super Host" status
 * @param {Map<number, boolean>} superHostMap - Map of hostId to super host status
 * @return {Boolean} - true if the host of property is a "Super Host". Otherwise false.


/**
 * Filter properties based on filter criteria
 * @param  {Array} properties - Array of all properties
 * @param  {Object} filters - The filters being applied to the properties
 * @return {Array} - Array of properties that match the given filters
 */
export const filterProperties = (properties, filters) => {
  if (!properties || !properties.length) {
    return [];
  }

  const {
    locationFilter,
    rateFilter,
    starsFilter,
    houseTypeFilter,
    placeTypeFilter,
    superHostFilter,
  } = filters;
  const houseTypeSet = new Set(houseTypeFilter);
  const placeTypeSet = new Set(placeTypeFilter);

  const failsRangeCheck = (range, field) => range && (range[0] > field || range[1] < field);
  const failsSetCheck = (set, field) => set.size > 0 && !set.has(field);


  const superHostMap = superHostFilter ? computeSuperHostMap(properties) : null;

  return properties.filter((property) => {
    if (locationFilter && locationFilter !== property.country) {
      return false;
    }

    if (superHostFilter && !isSuperHost(property, superHostMap)) {
      return false;
    }

    if (
      failsRangeCheck(rateFilter, property.rate) ||
      failsRangeCheck(starsFilter, property.stars)
    ) {
      return false;
    }

    if (
      failsSetCheck(houseTypeSet, property.houseType) ||
      failsSetCheck(placeTypeSet, property.placeType)
    ) {
      return false;
    }

    return true;
  });
};

/**
 * Determine if the host of the specified `property` is a "Super Host". A Super Host is a host with an average start
 * rating of 4 or more across all of their properties.
 * @param {Object} property - The property currently being checked for "Super Host" status
 * @param {Array} allProperties - Array of all properties
 * @return {Boolean} - true if the host of `property` is a "Super Host". Otherwise false.
 */
function isSuperHost(property, superHostMap) {
  return superHostMap.get(property.hostId) || false;
}

export const RATE_FILTER_META = {
  MIN: 0,
  MAX: 2000,
};

export const STAR_FILTER_META = {
  MIN: 0,
  MAX: 5,
};

export const DEFAULT_FILTERS = {
  locationFilter: null,
  placeTypeFilter: [],
  houseTypeFilter: [],
  superHostFilter: false,
  rateFilter: [RATE_FILTER_META.MIN, RATE_FILTER_META.MAX],
  starsFilter: [STAR_FILTER_META.MIN, STAR_FILTER_META.MAX],
};