import React from "react";
import Header from "./Header";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom"; // The header component expects to be run as a
// child of React Router, so expects to receive the router's props

// Now how with shallow render, you search for the React component tag
it("contains 3 NavLinks via shallow", () => {
  const numLinks = shallow(<Header />).find("NavLink").length;
  expect(numLinks).toEqual(3);
});

// Note how with mount you search for the final rendered HTML since it generates the final DOM.
// We also need to pull in React ROuter's memoryRouter for testing since the Header expects
// to have React ROuter's props passed in
it("contains 3 anchos via mount", () => {
  const numAnchors = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find("a").length;
  
  expect(numAnchors).toEqual(3);
});