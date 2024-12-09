import React, { useState } from 'react';
import CheckboxGroup from '../Form/Checkbox/CheckboxGroup';
import Dropdown from '../Form/Dropdown/Dropdown';
import RadioToggle from '../Form/RadioToggle/RadioToggle';
import RangeSelect from '../Form/RangeSelect/RangeSelect';
import cx from 'classnames';
import {
  DEFAULT_FILTERS,
  RATE_FILTER_META,
  STAR_FILTER_META,
} from "../../lib/filterUtil";
import "./PropertyFilters.scss";

const LOCATION_OPTIONS = [
  { label: "Canada", value: "CA" },
  { label: "Costa Rica", value: "CR" },
  { label: "United States", value: "US" },
];

const PLACE_TYPE_OPTIONS = [
  "Entire place",
  "Private room",
  "Hotel room",
  "Shared room",
];
const HOUSE_TYPE_OPTIONS = [
  "House",
  "Apartment",
  "Bed and breakfast",
  "Boutique hotel",
];

const PropertyFilters = ({ filters, setFilters }) => {
  const onFilterChange = (partialFilters) => {
    const updatedFilters = { ...filters, ...partialFilters };
    setFilters(updatedFilters);
  };

  return (
    <div className={cx("property-filters")}>
      <Dropdown
        name="locationFilter"
        title="Location"
        options={LOCATION_OPTIONS}
        value={filters.locationFilter}
        onChange={(location) => onFilterChange({ locationFilter: location })}
      />
      <RangeSelect
        title="Rate"
        min={RATE_FILTER_META.MIN}
        max={RATE_FILTER_META.MAX}
        step={10}
        isCurrency
        value={filters.rateFilter}
        onChange={(rateFilter) => onFilterChange({ rateFilter })}
      />
      <RangeSelect
        title="Stars"
        min={STAR_FILTER_META.MIN}
        max={STAR_FILTER_META.MAX}
        step={0.5}
        value={filters.starsFilter}
        onChange={(starsFilter) => onFilterChange({ starsFilter })}
      />
      <CheckboxGroup
        id="form-property-type"
        title="Property Type"
        options={HOUSE_TYPE_OPTIONS}
        value={filters.houseTypeFilter}
        onChange={(checkedOptions) =>
          onFilterChange({ houseTypeFilter: checkedOptions })
        }
      />
      <CheckboxGroup
        id="form-place-type"
        title="Type of Place"
        options={PLACE_TYPE_OPTIONS}
        value={filters.placeTypeFilter}
        onChange={(checkedOptions) =>
          onFilterChange({ placeTypeFilter: checkedOptions })
        }
      />
      <RadioToggle
        name="superHostFilter"
        title="Super Host"
        value={filters.superHostFilter}
        onChange={(checked) => onFilterChange({ superHostFilter: checked })}
      />
    </div>
  );
};

export default PropertyFilters;