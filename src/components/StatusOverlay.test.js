import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import StatusOverlay from './StatusOverlay';
import { shallow } from 'enzyme';

describe('StatusOverlay component', () => {
  it('renders without crashing', () => {
    const statusOverlay = shallow(<StatusOverlay />);
  });
  it('renders a span if isLoading and error props are not set', () => {
    const statusOverlay = shallow(<StatusOverlay />);
    expect(statusOverlay.find('span')).to.have.length(1);
  });
  it('renders a loading overlay with the text set as \'loadingText\' prop if isLoading is true', () => {
    const statusOverlay = shallow(<StatusOverlay isLoading={true} />);
    expect(statusOverlay.find('.text-container')).to.have.length(1);
    expect(statusOverlay.find('.text-container').text()).to.equal('LOADING');
  });
  it('renders an error overlay if there is an error and isLoading is false', () => {
    const status = '404';
    const statusText = 'NOT FOUND';
    const mockError = {
      response: {
        status,
        statusText
      }
    }
    const statusOverlay = shallow(<StatusOverlay isLoading={false} error={mockError} />);
    expect(statusOverlay.find('.text-container')).to.have.length(1);
    const errorText = statusOverlay.find('.text-container').text();
    expect(errorText.includes(status)).to.equal(true);
    expect(errorText.includes(statusText)).to.equal(true);
  });
});