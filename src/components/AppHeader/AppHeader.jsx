import * as PropTypes from 'prop-types';
import './AppHeader.scss';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import React, { useRef, useState } from "react";
import Select from "react-select";

/**
 * Get the node in propertyLookupTree that corresponds to searchText
 * @param {object} propertyLookupTree - A tree containing each property grouped by the letters in it's name.
 * @param {string} searchText - Text to look for in propertyLookupTree
 * @returns {object | undefined} The node in propertyLookupTree that corresponds to searchText or undefined if no
 * corresponding node can be found.
 */
function goToNode(propertyLookupTree, searchText) {
  let currentNode = propertyLookupTree;

  // Traverse the tree character by character
  for (const char of searchText.toLowerCase()) {
    if (!currentNode[char]) {
      return undefined; // No matching node found
    }
    currentNode = currentNode[char];
  }

  return currentNode;
}

/**
 * Get an array of all of the matches in node and the nodes below it in the tree
 * @param {object} node - a node of the propertyLookupTree. Note: the entire tree can also be thought of as the root node.
 * @return An array of all matches under node
 */
function collectAllMatches(node) {
  const matches = [];

  // Recursive helper function to collect matches
  function traverse(currentNode) {
    // If the current node has a match, add it to the matches array
    if (currentNode.match) {
      matches.push(currentNode.match);
    }

    // Recursively search through all child nodes
    for (const key in currentNode) {
      if (key !== "match" && typeof currentNode[key] === "object") {
        traverse(currentNode[key]);
      }
    }
  }

  traverse(node);
  return matches;
}

/**
 * Find all properties in propertyLookupTree where the name starts with searchText
 * @param {object} propertyLookupTree - A tree containing each property grouped by the letters in it's name.
 * @param {string} searchText - lowercase text to be used to find matching properties
 * @return A list of match objects (with name and id properties) for properties that match searchText
 */
export function findMatches(propertyLookupTree, searchText) {
  // If search text is empty, return an empty array
  if (!searchText) return [];

  // Find the node corresponding to the search text
  const matchNode = goToNode(propertyLookupTree, searchText);

  // If no matching node is found, return an empty array
  if (!matchNode) return [];

  // Collect all matches under this node
  return collectAllMatches(matchNode);
}

function AppHeader({ propertyLookupTree }) {
  const [searchOptions, setSearchOptions] = useState([]);
  const history = useHistory();
  const searchSelectRef = useRef(null);

  function onSearchChange(searchText) {
    if (searchText.length > 0) {
      let matches = findMatches(propertyLookupTree, searchText.toLowerCase());
      let options = matches.map((match) => ({
        value: match.id,
        label: match.name,
      }));
      setSearchOptions(options);
    } else {
      setSearchOptions([]);
    }
  }

  function onSearchSelect(selectedItem, { action }) {
    setSearchOptions([]);
    if (action === "select-option") {
      setTimeout(() => searchSelectRef.current.select.clearValue(), 0);
      history.push("/property/" + selectedItem.value);
    }
  }

  return (
    <div className="app-header">
      <Link to="/" className="logo-wrapper">
        <Logo className="logo" />
        Kbnb
      </Link>
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        options={searchOptions}
        onInputChange={onSearchChange}
        onChange={onSearchSelect}
        placeholder="Search"
        noOptionsMessage={() => "Enter a property name..."}
        ref={searchSelectRef}
      />
    </div>
  );
}

AppHeader.propTypes = {
  propertyLookupTree: PropTypes.object,
};

export default AppHeader;